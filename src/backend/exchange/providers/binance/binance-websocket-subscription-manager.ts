import {
  BinanceWebSocketStreamManager,
} from "./binance-websocket-stream-manager";

export class BinanceWebSocketSubscriptionManager {

  private readonly streamManager:
    BinanceWebSocketStreamManager;

  private readonly subscriptions =
    new Set<string>();

  public constructor(
    streamManager: BinanceWebSocketStreamManager,
  ) {

    this.streamManager =
      streamManager;

  }

  public subscribe(
    symbol: string,
  ): void {

    if (
      this.subscriptions.has(
        symbol,
      )
    ) {

      return;

    }

    this.subscriptions.add(
      symbol,
    );

    this.streamManager.subscribe([
      symbol,
    ]);

  }

  public subscribeMany(
    symbols: readonly string[],
  ): void {

    const pending:
      string[] = [];

    for (
      const symbol of symbols
    ) {

      if (
        this.subscriptions.has(
          symbol,
        )
      ) {

        continue;

      }

      this.subscriptions.add(
        symbol,
      );

      pending.push(
        symbol,
      );

    }

    if (
      pending.length > 0
    ) {

      this.streamManager.subscribe(
        pending,
      );

    }

  }


  public unsubscribe(
    symbol: string,
  ): void {

    if (
      !this.subscriptions.has(
        symbol,
      )
    ) {

      return;

    }

    this.subscriptions.delete(
      symbol,
    );

    this.streamManager.unsubscribe([
      symbol,
    ]);

  }


  public unsubscribeMany(
    symbols: readonly string[],
  ): void {

    const pending:
      string[] = [];

    for (
      const symbol of symbols
    ) {

      if (
        !this.subscriptions.has(
          symbol,
        )
      ) {

        continue;

      }

      this.subscriptions.delete(
        symbol,
      );

      pending.push(
        symbol,
      );

    }

    if (
      pending.length > 0
    ) {

      this.streamManager.unsubscribe(
        pending,
      );

    }

  }



  public resubscribeAll():
    void {

    if (
      this.subscriptions.size === 0
    ) {

      return;

    }

    this.streamManager.subscribe(
      [
        ...this.subscriptions,
      ],
    );

  }


  public getSubscriptions():
    readonly string[] {

    return [
      ...this.subscriptions,
    ];

  }

  public hasSubscription(
    symbol: string,
  ): boolean {

    return this.subscriptions.has(
      symbol,
    );

  }

  public getSubscriptionCount():
    number {

    return this.subscriptions.size;

  }


  public getStatus() {

    return {
      count:
        this.getSubscriptionCount(),

      subscriptions:
        this.getSubscriptions(),
    };

  }

}
