import {
  BaseWebSocketClient,
} from "../../websocket/base-websocket-client";

import {
  BinanceWebSocketSubscription,
} from "./binance-websocket-subscription";

export class BinanceWebSocketClient
  extends BaseWebSocketClient {

  private readonly subscription =
    new BinanceWebSocketSubscription();

  public constructor(
    private readonly url: string,
  ) {
    super();
  }

  public getUrl():
    string {

    return this.url;

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
