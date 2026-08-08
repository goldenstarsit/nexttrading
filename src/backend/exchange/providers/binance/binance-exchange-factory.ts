import {
  BinanceExchange,
} from "./binance-exchange";

import {
  BinanceHttpClient,
} from "./binance-http-client";

import {
  BinanceSpotProvider,
} from "./binance-spot-provider";

import {
  BinanceWebSocketStreamManager,
} from "./binance-websocket-stream-manager";

import {
  BinanceTradeMessageHandler,
} from "./binance-trade-message-handler";

import type {
  ExchangeConfiguration,
} from "../../types/exchange-configuration";

export class BinanceExchangeFactory {

  private getMarketDataHandler(
    provider: BinanceSpotProvider,
  ) {

    return (
      provider as BinanceSpotProvider & {
        getMarketDataHandler?:
          () => import("../../types/market-data-handler").MarketDataHandler | undefined;
      }
    ).getMarketDataHandler?.();

  }

  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    const httpClient =
      new BinanceHttpClient(
        configuration,
      );

    const messageHandler =
      new BinanceTradeMessageHandler();

    const streamManager =
      new BinanceWebSocketStreamManager(
        configuration.websocketBaseUrl,
        messageHandler,
      );

    const spotProvider =
      new BinanceSpotProvider(
        httpClient,
        streamManager,
      );

    messageHandler.setMarketDataHandler(
      (
        symbol,
        price,
      ) => {

        const handler =
          this.getMarketDataHandler(
            spotProvider,
          );

        if (handler) {
          handler(
            symbol,
            price,
          );
        }

      },
    );

    return new BinanceExchange(
      spotProvider,
      streamManager,
    );

  }

}
