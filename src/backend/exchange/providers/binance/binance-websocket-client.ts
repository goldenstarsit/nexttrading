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

  public setMessageHandler(
    handler: WebSocketMessageHandler,
  ): void {

    this.messageHandler = handler;

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

    const streams = symbols
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
