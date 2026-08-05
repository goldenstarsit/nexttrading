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
  DefaultWebSocketMessageHandler,
} from "../../websocket/default-websocket-message-handler";

import type {
  ExchangeConfiguration,
} from "../../types/exchange-configuration";

export class BinanceExchangeFactory {

  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    const httpClient =
      new BinanceHttpClient(
        configuration,
      );

    const spotProvider =
      new BinanceSpotProvider(
        httpClient,
      );

    const messageHandler =
      new DefaultWebSocketMessageHandler();

    const streamManager =
      new BinanceWebSocketStreamManager(
        configuration.websocketBaseUrl,
        messageHandler,
      );

    return new BinanceExchange(
      spotProvider,
      streamManager,
    );

  }

}
