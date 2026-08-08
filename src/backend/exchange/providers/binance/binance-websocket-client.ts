import {
  BaseWebSocketClient,
} from "../../websocket/base-websocket-client";

import {
  BinanceWebSocketSubscription,
} from "./binance-websocket-subscription";

import type {
  WebSocketMessageHandler,
} from "../../contracts/websocket-message-handler";

import {
  WebSocketMessageDispatcher,
} from "../../websocket/websocket-message-dispatcher";

export class BinanceWebSocketClient
  extends BaseWebSocketClient {

  private readonly subscription =
    new BinanceWebSocketSubscription();

  private messageHandler?:
    WebSocketMessageHandler;

  private dispatcher?:
    WebSocketMessageDispatcher;

  private socket:
    WebSocket | null =
    null;

  private reconnecting =
    false;

  private intentionalDisconnect =
    false;

  public setMessageHandler(
    handler: WebSocketMessageHandler,
  ): void {

    this.messageHandler =
      handler;

    this.dispatcher =
      new WebSocketMessageDispatcher(
        handler,
      );

  }

  public async handleMessage(
    message: string,
  ): Promise<void> {

    if (this.dispatcher) {

      await this.dispatcher.dispatch(
        message,
      );

      return;

    }

    if (this.messageHandler) {

      await this.messageHandler.handleMessage(
        message,
      );

    }

  }

  public constructor(
    private readonly url: string,
  ) {

    super();

  }

  public override async connect():
    Promise<void> {

    if (this.socket) {

      return;

    }

    this.intentionalDisconnect =
      false;

    const socket =
      new WebSocket(
        this.getStreamUrl(),
      );

    this.socket =
      socket;

    await new Promise<void>(
      (resolve, reject) => {

        let settled =
          false;

        const settleResolve =
          () => {

            if (settled) {

              return;

            }

            settled =
              true;

            resolve();

          };

        const settleReject =
          (error: Error) => {

            if (settled) {

              return;

            }

            settled =
              true;

            reject(error);

          };

        socket.onopen =
          async () => {

            if (
              this.socket !== socket
            ) {

              socket.close();

              return;

            }

            this.connected =
              true;

            this.reconnecting =
              false;

            try {

              if (this.eventHandler) {

                await this.eventHandler.onConnect();

              }

              settleResolve();

            } catch (error) {

              settleReject(
                error as Error,
              );

            }

          };

        socket.onmessage =
          async (event) => {

            if (
              this.socket !== socket
            ) {

              return;

            }

            try {

              await this.handleMessage(
                String(event.data),
              );

            } catch (error) {

              if (this.eventHandler) {

                await this.eventHandler.onError(
                  error as Error,
                );

              }

            }

          };

        socket.onerror =
          async () => {

            if (
              this.socket !== socket
            ) {

              return;

            }

            const error =
              new Error(
                "Binance WebSocket error",
              );

            try {

              if (this.eventHandler) {

                await this.eventHandler.onError(
                  error,
                );

              }

            } catch {
              // Event-handler errors must not
              // break WebSocket lifecycle.
            }

            settleReject(
              error,
            );

          };

        socket.onclose =
          async () => {

            if (
              this.socket !== socket
            ) {

              return;

            }

            this.socket =
              null;

            this.connected =
              false;

            try {

              if (this.eventHandler) {

                await this.eventHandler.onDisconnect();

              }

            } finally {

              settleResolve();

            }

          };

      },
    );

  }

  public override async disconnect():
    Promise<void> {

    this.intentionalDisconnect =
      true;

    this.reconnecting =
      false;

    const socket =
      this.socket;

    this.socket =
      null;

    this.connected =
      false;

    if (!socket) {

      if (this.eventHandler) {

        await this.eventHandler.onDisconnect();

      }

      return;

    }

    socket.close();

  }

  public async reconnect():
    Promise<boolean> {

    if (this.reconnecting) {

      return false;

    }

    if (this.socket) {

      return true;

    }

    this.reconnecting =
      true;

    try {

      const result =
        await super.reconnect();

      if (!result) {

        this.reconnecting =
          false;

      }

      return result;

    } catch (error) {

      this.reconnecting =
        false;

      if (this.eventHandler) {

        await this.eventHandler.onError(
          error as Error,
        );

      }

      return false;

    }

  }

  public isReconnecting():
    boolean {

    return this.reconnecting;

  }

  public wasIntentionallyDisconnected():
    boolean {

    return this.intentionalDisconnect;

  }

  public getUrl():
    string {

    return this.url;

  }

  public getStreamUrl():
    string {

    const symbols =
      this.subscription.getSymbols();

    if (symbols.length === 0) {

      return this.url;

    }

    const streams =
      symbols
        .map(
          (symbol) =>
            `${symbol.trim().toLowerCase()}@trade`,
        )
        .join("/");

    return `${this.url}?streams=${streams}`;

  }

  public subscribe(
    symbols: readonly string[],
  ): void {

    this.subscription.subscribe(
      symbols,
    );

  }

  public unsubscribe(
    symbols: readonly string[],
  ): void {

    this.subscription.unsubscribe(
      symbols,
    );

  }

  public getSubscriptions():
    readonly string[] {

    return this.subscription.getSymbols();

  }

}
