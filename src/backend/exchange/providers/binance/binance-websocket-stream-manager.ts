import {
  BinanceWebSocketClient,
} from "./binance-websocket-client";

import {
  WebSocketMessageDispatcher,
} from "../../websocket/websocket-message-dispatcher";

import type {
  WebSocketMessageHandler,
} from "../../contracts/websocket-message-handler";

import type {
  WebSocketEventHandler,
} from "../../contracts/websocket-event-handler";


export class BinanceWebSocketStreamManager {

  private readonly client:
    BinanceWebSocketClient;


  private readonly dispatcher:
    WebSocketMessageDispatcher;


  private lastError:
    Error | null =
    null;


  private monitorHandler:
    ((status: ReturnType<BinanceWebSocketStreamManager["getFullStatus"]>) => void) | null =
    null;


  public constructor(
    url: string,
    handler: WebSocketMessageHandler,
  ) {

    const manager =
      this;


    this.client =
      new BinanceWebSocketClient(
        url,
      );


    this.client.setEventHandler({

      async onConnect() {

        manager.clearError();

        manager.notifyMonitor();

        return;

      },

      async onDisconnect() {

        manager.notifyMonitor();

        return;

      },

      async onError(
        error: Error,
      ) {

        manager.setError(
          error,
        );

      },

    });


    this.dispatcher =
      new WebSocketMessageDispatcher(
        handler,
      );

  }


  public setMonitorHandler(
    handler:
      ((status: ReturnType<BinanceWebSocketStreamManager["getFullStatus"]>) => void) | null,
  ): void {

    this.monitorHandler =
      handler;

  }


  private notifyMonitor():
    void {

    if (this.monitorHandler) {

      this.monitorHandler(
        this.getFullStatus(),
      );

    }

  }


  public setError(
    error: Error,
  ): void {

    this.lastError =
      error;

    this.notifyMonitor();

  }


  public clearError():
    void {

    this.lastError =
      null;

    this.notifyMonitor();

  }


  public setEventHandler(
    handler: WebSocketEventHandler,
  ): void {

    this.client.setEventHandler(
      handler,
    );

  }

  public async connect():
    Promise<void> {

    await this.client.connect();

  }


  public async disconnect():
    Promise<void> {

    await this.client.disconnect();

  }


  public async reconnect():
    Promise<boolean> {

    return await this.client.reconnect();

  }

  public async ensureConnected():
    Promise<boolean> {

    if (this.client.isConnected()) {

      return true;

    }

    return await this.safeReconnect();

  }


  public async safeReconnect():
    Promise<boolean> {

    try {

      const result =
        await this.client.reconnect();

      if (result) {

        this.clearError();

        this.notifyMonitor();

      }

      return result;

    } catch (error) {

      this.setError(
        error as Error,
      );

      return false;

    }

  }

  public subscribe(
    symbols: readonly string[],
  ): void {

    this.client.subscribe(
      symbols,
    );

  }


  public unsubscribe(
    symbols: readonly string[],
  ): void {

    this.client.unsubscribe(
      symbols,
    );

  }


  public async receive(
    message: string,
  ): Promise<void> {

    await this.dispatcher.dispatch(
      message,
    );

  }


  public resetReconnectAttempts():
    void {

    this.client.clearReconnectAttempts();

  }

  public isReconnecting():
    boolean {

    return this.client.isReconnecting();

  }

  public getReconnectAttempts():
    number {

    return this.client.getReconnectAttempts();

  }

  public getReconnectPolicy() {

    return this.client.getReconnectPolicy();

  }

  public getReconnectDelayMs():
    number {

    return this.client.getReconnectPolicy().delayMs;

  }

  public getReconnectStatus() {
    
    return {
      attempts: this.client.getReconnectAttempts(),
      delayMs: this.client.getReconnectPolicy().delayMs,
      reconnecting: this.client.isReconnecting(),
    };

  }

  public isConnected():
    boolean {

    return this.client.isConnected();

  }

  public getConnectionStatus() {

    return {
      connected: this.client.isConnected(),
      reconnecting: this.client.isReconnecting(),
      reconnectAttempts: this.client.getReconnectAttempts(),
    };

  }

  public getLastError():
    Error | null {

    return this.lastError;

  }


  public getStatus() {

    return this.getFullStatus();

  }


  public getFullStatus() {

    return {
      connection:
        this.getConnectionStatus(),

      reconnect:
        this.getReconnectStatus(),

      error:
        this.lastError,

      subscriptions:
        this.client.getSubscriptions(),
    };

  }


  public getHealthSnapshot() {

    return {
      connected:
        this.client.isConnected(),

      reconnecting:
        this.client.isReconnecting(),

      reconnectAttempts:
        this.client.getReconnectAttempts(),

      subscriptions:
        this.client.getSubscriptions(),

      error:
        this.lastError,
    };

  }


  public getDispatcher():
    WebSocketMessageDispatcher {

    return this.dispatcher;

  }

  public getClient():
    BinanceWebSocketClient {

    return this.client;

  }

  public getSubscriptions():
    readonly string[] {

    return this.client.getSubscriptions();

  }

}
