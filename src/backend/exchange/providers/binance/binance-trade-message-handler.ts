import type {
  WebSocketMessageHandler,
} from "../../contracts/websocket-message-handler";

import type {
  MarketDataHandler,
} from "../../types/market-data-handler";


interface BinanceTradeMessage {

  readonly stream?:
    string;

  readonly data?: {

    readonly e?:
      string;

    readonly s?:
      string;

    readonly p?:
      string;

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

    let parsed:
      BinanceTradeMessage;

    try {

      parsed =
        JSON.parse(
          message,
        ) as BinanceTradeMessage;

    } catch {

      return;

    }


    const data =
      parsed.data;


    if (!data) {

      return;

    }


    if (data.e !== "trade") {

      return;

    }


    if (
      typeof data.s !== "string" ||
      data.s.trim().length === 0
    ) {

      return;

    }


    if (
      typeof data.p !== "string" ||
      data.p.trim().length === 0
    ) {

      return;

    }


    const price =
      Number(
        data.p,
      );


    if (
      !Number.isFinite(price) ||
      price <= 0
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
