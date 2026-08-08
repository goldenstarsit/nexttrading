import type {
  WebSocketClient,
} from "../contracts/websocket-client";

import type {
  WebSocketEventHandler,
} from "../contracts/websocket-event-handler";

import {
  DefaultWebSocketReconnectPolicy,
} from "./websocket-reconnect-policy";

export abstract class BaseWebSocketClient
  implements WebSocketClient {

  protected connected =
    false;

  protected eventHandler?:
    WebSocketEventHandler;

  protected readonly reconnectPolicy =
    new DefaultWebSocketReconnectPolicy();

  protected reconnectAttempts =
    0;

  public setEventHandler(
    handler: WebSocketEventHandler,
  ): void {

    this.eventHandler =
      handler;

  }

  public async connect():
    Promise<void> {

    this.connected =
      true;

    this.resetReconnectAttempts();

    if (this.eventHandler) {
      await this.eventHandler.onConnect();
    }

  }

  public async disconnect():
    Promise<void> {

    this.connected =
      false;

    if (this.eventHandler) {
      await this.eventHandler.onDisconnect();
    }

  }

  protected resetReconnectAttempts():
    void {

    this.reconnectAttempts =
      0;

  }

  protected canReconnect():
    boolean {

    return (
      this.reconnectAttempts <
      this.reconnectPolicy.maxAttempts
    );

  }

  protected increaseReconnectAttempts():
    void {

    this.reconnectAttempts++;

  }

  protected async waitReconnectDelay():
    Promise<void> {

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          this.reconnectPolicy.delayMs,
        ),
    );

  }

  protected async attemptReconnect():
    Promise<boolean> {

    if (!this.canReconnect()) {

      return false;

    }

    this.increaseReconnectAttempts();

    await this.waitReconnectDelay();

    await this.connect();

    return true;

  }

  public async reconnect():
    Promise<boolean> {

    return await this.attemptReconnect();

  }

  public clearReconnectAttempts():
    void {

    this.resetReconnectAttempts();

  }

  public getReconnectAttempts():
    number {

    return this.reconnectAttempts;

  }

  public isReconnecting():
    boolean {

    return this.reconnectAttempts > 0;

  }

  public getReconnectPolicy():
    DefaultWebSocketReconnectPolicy {

    return this.reconnectPolicy;

  }

  public isConnected():
    boolean {

    return this.connected;

  }

}
