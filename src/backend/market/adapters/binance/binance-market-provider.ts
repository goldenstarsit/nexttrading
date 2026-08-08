import {
  MarketProviderAdapter,
} from "../market-provider-adapter";

import type {
  MarketSnapshot,
  MarketTick,
} from "../../types";

export class BinanceMarketProvider
  extends MarketProviderAdapter {

  public readonly name =
    "binance";

  public readonly capabilities = {
    streaming: true,
    snapshots: true,
    subscriptions: true,
  };


  private readonly tickCallbacks =
    new Set<(
      tick: MarketTick,
    ) => void>();

  private socket: WebSocket | null = null;

  private reconnectTimer:
    ReturnType<typeof setTimeout> | null = null;

  private reconnectDelay = 1000;

  private heartbeatTimer:
    ReturnType<typeof setInterval> | null = null;

  private lastTickAt = 0;

  private readonly heartbeatIntervalMs =
    10000;

  private readonly staleAfterMs =
    30000;


  public async initialize():
    Promise<void> {

    if (this.isInitialized()) {
      return;
    }

    await super.initialize();

    this.setConnected(false);
    this.setStreaming(false);
    this.setHealthy(
      "Initialized",
    );

  }


  public async configure(
    configuration: import("../../types").MarketConfiguration,
  ): Promise<void> {

    if (!this.isInitialized()) {
      throw new Error(
        `Market provider "${this.name}" must be initialized before configure`,
      );
    }

    if (this.isRunning()) {
      throw new Error(
        `Market provider "${this.name}" must be stopped before configure`,
      );
    }

    await super.configure(
      configuration,
    );

    this.clearSubscriptions();

    for (const symbol of configuration.symbols) {
      const normalizedSymbol =
        symbol.trim().toUpperCase();

      if (normalizedSymbol) {
        this.addSubscription(
          normalizedSymbol,
        );
      }
    }

    this.setHealthy(
      "Configured",
    );

  }


  public async start():
    Promise<void> {

    if (!this.isInitialized()) {
      throw new Error(
        `Market provider "${this.name}" must be initialized before start`,
      );
    }

    if (this.isRunning() && this.socket) {
      return;
    }

    await super.start();

    this.setConnected(false);
    this.setStreaming(false);
    this.setHealthy(
      "Connecting",
    );

    if (this.socket) {
      return;
    }

    const symbols =
      this.getSubscriptions();

    if (symbols.length === 0) {
      this.setConnected(false);
      this.setStreaming(false);
      this.setUnhealthy(
        "No symbols configured",
      );
      return;
    }

    const streams = symbols
      .map(
        (symbol) =>
          `${symbol.trim().toLowerCase()}@trade`,
      )
      .join("/");

    const url =
      `wss://stream.binance.com:9443/stream?streams=${streams}`;

    const socket = new WebSocket(url);

    this.socket = socket;

    const isCurrentSocket = (): boolean =>
      this.socket === socket;

    this.setConnected(false);
    this.setStreaming(false);
    this.setHealthy(
      "Connecting",
    );

    socket.onopen = () => {

      if (!isCurrentSocket()) {
        socket.close();
        return;
      }

      this.setConnected(true);
      this.setStreaming(true);
      this.setHealthy("Streaming");

      this.lastTickAt = Date.now();

      this.startHeartbeat();

      this.reconnectDelay = 1000;

      if (this.reconnectTimer) {
        clearTimeout(
          this.reconnectTimer,
        );

        this.reconnectTimer = null;
      }
    };

    socket.onmessage = (event) => {

      if (!isCurrentSocket()) {
        return;
      }

      try {
        const message =
          JSON.parse(
            String(event.data),
          ) as {
            data?: {
              s?: string;
              p?: string;
              q?: string;
              T?: number;
            };
          };

        const data = message.data;

        if (
          !data?.s ||
          !data.p ||
          !data.q ||
          !data.T
        ) {
          return;
        }

        const price =
          Number(data.p);

        const volume =
          Number(data.q);

        if (
          !Number.isFinite(price) ||
          price <= 0 ||
          !Number.isFinite(volume) ||
          volume < 0
        ) {
          return;
        }

        this.lastTickAt = Date.now();

        this.emitTick({
          symbol: data.s,
          price,
          volume,
          timestamp: data.T,
        });

      } catch {
        return;
      }
    };

    socket.onerror = () => {

      if (!isCurrentSocket()) {
        return;
      }

      this.setConnected(false);
      this.setStreaming(false);
      this.setUnhealthy(
        "WebSocket error",
      );
    };

    socket.onclose = () => {

      if (!isCurrentSocket()) {
        return;
      }

      this.stopHeartbeat();

      this.socket = null;
      this.setConnected(false);
      this.setStreaming(false);

      if (
        this.isRunning() &&
        this.getSubscriptions().length > 0
      ) {
        this.setUnhealthy(
          "Disconnected",
        );

        this.scheduleReconnect();
      }
    };

  }


  private startHeartbeat():
    void {

    this.stopHeartbeat();

    this.heartbeatTimer =
      setInterval(
        () => {

          if (
            !this.socket ||
            !this.isRunning()
          ) {
            return;
          }

          const elapsed =
            Date.now() - this.lastTickAt;

          if (
            elapsed >= this.staleAfterMs
          ) {
            this.setUnhealthy(
              "Stale WebSocket stream",
            );

            this.socket.close();
          }

        },
        this.heartbeatIntervalMs,
      );

  }


  private stopHeartbeat():
    void {

    if (!this.heartbeatTimer) {
      return;
    }

    clearInterval(
      this.heartbeatTimer,
    );

    this.heartbeatTimer = null;

  }


  private scheduleReconnect():
    void {

    if (this.reconnectTimer) {
      return;
    }

    const delay =
      this.reconnectDelay;

    this.reconnectTimer =
      setTimeout(
        async () => {

          this.reconnectTimer = null;

          if (
            !this.isRunning() ||
            this.getSubscriptions().length === 0
          ) {
            return;
          }

          try {
            await this.start();

          } catch {
            this.reconnectDelay =
              Math.min(
                this.reconnectDelay * 2,
                30000,
              );

            this.scheduleReconnect();
          }

        },
        delay,
      );

    this.reconnectDelay =
      Math.min(
        this.reconnectDelay * 2,
        30000,
      );

  }


  public async stop():
    Promise<void> {

    if (!this.isRunning() && !this.socket) {
      return;
    }

    if (this.reconnectTimer) {
      clearTimeout(
        this.reconnectTimer,
      );

      this.reconnectTimer = null;
    }

    this.stopHeartbeat();

    const socket = this.socket;

    this.socket = null;

    if (socket) {
      socket.close();
    }

    await super.stop();

  }


  public async getSnapshot(
    symbol: string,
  ): Promise<MarketSnapshot | null> {

    const normalizedSymbol =
      symbol.trim().toUpperCase();

    if (!normalizedSymbol) {
      return null;
    }

    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${normalizedSymbol}`,
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json() as {
        symbol?: string;
        price?: string;
      };

      const price = Number(
        data.price,
      );

      if (
        !data.symbol ||
        !Number.isFinite(price) ||
        price <= 0
      ) {
        return null;
      }

      return {
        symbol: data.symbol,
        price,
        timestamp: Date.now(),
      };

    } catch {
      return null;
    }

  }


  public async subscribe(
    symbol: string,
  ): Promise<void> {

    const normalizedSymbol =
      symbol.trim().toUpperCase();

    if (!normalizedSymbol) {
      return;
    }

    this.addSubscription(
      normalizedSymbol,
    );

    if (this.isRunning()) {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }

      await this.start();
    }

  }


  public async unsubscribe(
    symbol: string,
  ): Promise<void> {

    const normalizedSymbol =
      symbol.trim().toUpperCase();

    if (!normalizedSymbol) {
      return;
    }

    this.removeSubscription(
      normalizedSymbol,
    );

    if (this.isRunning()) {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }

      if (this.getSubscriptions().length > 0) {
        await this.start();
      }
    }

  }


  public onTick(
    callback: (
      tick: MarketTick,
    ) => void,
  ): void {

    this.tickCallbacks.add(
      callback,
    );

  }


  protected emitTick(
    tick: MarketTick,
  ): void {

    for (const callback of this.tickCallbacks) {

      try {

        callback(
          tick,
        );

      } catch {
        continue;
      }

    }

  }

}
