import type {
  WebSocketMessageHandler,
} from "../../contracts/websocket-message-handler";

import type {
  MarketDataHandler,
} from "../../types/market-data-handler";

interface BinanceTradeMessage {
  readonly stream?: string;
  readonly data?: {
    readonly e?: string;
    readonly s?: string;
    readonly p?: string;
  };
}

export class BinanceTradeMessageHandler
  implements WebSocketMessageHandler {

  private marketDataHandler?:
    MarketDataHandler;

  public setMarketDataHandler(
    handler: MarketDataHandler,
  ): void {

    this.marketDataHandler =
      handler;

  }

  public async handleMessage(
    message: string,
  ): Promise<void> {

    const parsed =
      JSON.parse(
        message,
      ) as BinanceTradeMessage;

    const data =
      parsed.data;

    if (
      !data ||
      data.e !== "trade" ||
      typeof data.s !== "string" ||
      typeof data.p !== "string"
    ) {

      return;

    }

    if (!this.marketDataHandler) {

      return;

    }

    this.marketDataHandler(
      data.s,
      data.p,
    );

  }

}
