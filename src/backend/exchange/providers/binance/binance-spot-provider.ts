import type {
  BinanceRestClient,
} from "./binance-rest-client";

import type {
  BinanceWebSocketStreamManager,
} from "./binance-websocket-stream-manager";

import type {
  ExchangeProvider,
} from "../../contracts/exchange-provider";

import type {
  ExchangeConfiguration,
} from "../../types/exchange-configuration";

import type {
  ExchangeInfo,
} from "../../types/exchange-info";

import type {
  AccountInfo,
} from "../../types/account-info";

import type {
  Balance,
} from "../../types/balance";

import type {
  Order,
} from "../../types/order";

import type {
  OpenOrdersRequest,
} from "../../types/open-orders-request";

import type {
  PlaceOrderRequest,
} from "../../types/place-order-request";

import type {
  CancelOrderRequest,
} from "../../types/cancel-order-request";

import type {
  ProviderStatus,
} from "../../types/provider-status";

import type {
  MarketDataHandler,
} from "../../types/market-data-handler";

import type {
  MarketSubscription,
} from "../../types/market-subscription";

import type {
  CurrentSubscription,
} from "../../types/current-subscription";

import type {
  ProviderMetrics,
} from "../../types/provider-metrics";

import type {
  ProviderCapabilities,
} from "../../types/provider-capabilities";

import type {
  ProviderName,
} from "../../types/provider-name";

import type {
  ProviderVersion,
} from "../../types/provider-version";

import type {
  ProviderState,
} from "../../types/provider-state";

import type {
  ProviderSummary,
} from "../../types/provider-summary";

import type {
  ProviderReady,
} from "../../types/provider-ready";

import type {
  ProviderLifecycle,
} from "../../types/provider-lifecycle";

import type {
  ProviderIdentifier,
} from "../../types/provider-identifier";

import type {
  ProviderDisplayName,
} from "../../types/provider-display-name";

import type {
  ProviderHealth,
} from "../../types/provider-health";

import type {
  ProviderInfo,
} from "../../types/provider-info";

import type {
  ProviderDetails,
} from "../../types/provider-details";

import type {
  ProviderPing,
} from "../../types/provider-ping";


export class BinanceSpotProvider
  implements
    ExchangeProvider<
      ExchangeConfiguration
    > {

  private started =
    false;

  private marketDataHandler?:
    MarketDataHandler;

  private subscription?:
    MarketSubscription;

  public constructor(
    private readonly client:
      BinanceRestClient,

    private readonly streamManager:
      BinanceWebSocketStreamManager,
  ) {}

  public readonly id =
    "binance";

  public readonly name =
    "Binance Spot";

  public readonly version =
    "1.0.0";

  public configure(
    config: ExchangeConfiguration,
  ): void {

    void config;

  }

  public async initialize(): Promise<void> {

    await this.client.get<ExchangeInfo>(
      "/api/v3/exchangeInfo",
    );

  }

  public async start(): Promise<void> {

    this.started =
      true;

  }

  public async stop(): Promise<void> {

    this.started =
      false;

  }

  public async getStatus(): Promise<ProviderStatus> {

    return {
      started:
        this.started,
      healthy:
        await this.healthCheck(),
    };

  }

  public setMarketDataHandler(
    handler: MarketDataHandler,
  ): void {

    this.marketDataHandler =
      handler;

  }

  public getMarketDataHandler():
    MarketDataHandler | undefined {

    return this.marketDataHandler;

  }

  public getCurrentSubscription():
    CurrentSubscription {

    return {
      subscription:
        this.subscription,
    };

  }

  public getMetrics():
    ProviderMetrics {

    return {
      started:
        this.started,
      subscribed:
        this.subscription !==
          undefined,
      symbolsCount:
        this.subscription
          ?.symbols.length ?? 0,
    };

  }

  public getCapabilities():
    ProviderCapabilities {

    return {
      marketData:
        true,
      spotTrading:
        true,
      accountInformation:
        true,
    };

  }

  public getProviderName():
    ProviderName {

    return {
      id:
        this.id,
      name:
        this.name,
    };

  }

  public getVersion():
    ProviderVersion {

    return {
      version:
        "1.0.0",
    };

  }

  public getState():
    ProviderState {

    return {
      started:
        this.started,
      version:
        this.getVersion()
          .version,
      subscriptionActive:
        this.subscription !==
          undefined,
    };

  }

  public getSummary():
    ProviderSummary {

    return {
      provider:
        this.getProviderName(),
      version:
        this.getVersion(),
      state:
        this.getState(),
    };

  }

  public isReady():
    ProviderReady {

    return {
      ready:
        this.started,
    };

  }

  public getLifecycle():
    ProviderLifecycle {

    return {
      started:
        this.started,
      stopped:
        !this.started,
    };

  }

  public getIdentifier():
    ProviderIdentifier {

    return {
      id:
        this.id,
    };

  }

  public getDisplayName():
    ProviderDisplayName {

    return {
      displayName:
        this.name,
    };

  }

  public async getHealth():
    Promise<ProviderHealth> {

    return {
      healthy:
        await this.healthCheck(),
    };

  }

  public getInfo():
    ProviderInfo {

    return {
      identifier:
        this.getIdentifier(),
      displayName:
        this.getDisplayName(),
      version:
        this.getVersion(),
    };

  }

  public async getDetails():
    Promise<ProviderDetails> {

    return {
      info:
        this.getInfo(),
      status:
        await this.getStatus(),
    };

  }

  public async ping():
    Promise<ProviderPing> {

    return {
      reachable:
        await this.healthCheck(),
    };

  }

  public async healthCheck(): Promise<boolean> {

    try {

      await this.client.get(
        "/api/v3/ping",
      );

      return true;

    } catch {

      return false;

    }

  }

  public async subscribeMarketData(
    symbols: readonly string[],
  ): Promise<void> {

    if (!this.started) {

      throw new Error(
        "Provider is not started",
      );

    }

    this.subscription = {
      symbols: [
        ...symbols,
      ],
    };

    this.streamManager.subscribe(
      symbols,
    );

  }

  public async unsubscribeMarketData(
    symbols: readonly string[],
  ): Promise<void> {

    if (!this.started) {

      throw new Error(
        "Provider is not started",
      );

    }

    if (!this.subscription) {
      return;
    }

    this.streamManager.unsubscribe(
      symbols,
    );

    const remaining =
      this.subscription.symbols.filter(
        (symbol) =>
          !symbols.includes(symbol),
      );

    if (remaining.length === 0) {

      this.subscription =
        undefined;

      return;

    }

    this.subscription = {
      symbols: remaining,
    };

  }

  public async placeOrder(
    request: PlaceOrderRequest,
  ): Promise<Order> {

    return this.client.post<Order>(
      "/api/v3/order",
      {
        ...request,
      },
      true,
    );

  }

  public async cancelOrder(
    request: CancelOrderRequest,
  ): Promise<void> {

    await this.client.delete(
      "/api/v3/order",
      {
        symbol:
          request.symbol,
        orderId:
          request.orderId,
      },
      true,
    );

  }

  public async getOrder(
    request: {
      symbol: string;
      orderId: string;
    },
  ): Promise<Order | undefined> {

    return this.client.get<Order>(
      "/api/v3/order",
      {
        symbol:
          request.symbol,
        orderId:
          request.orderId,
      },
      true,
    );

  }

  public async getOpenOrders(
    request?: OpenOrdersRequest,
  ): Promise<Order[]> {

    return this.client.get<Order[]>(
      "/api/v3/openOrders",
      request
        ? {
            ...request,
          }
        : undefined,
      true,
    );

  }

  public async getAccountInfo(): Promise<AccountInfo> {

    return this.client.get<AccountInfo>(
      "/api/v3/account",
      undefined,
      true,
    );

  }

  public async getBalances(): Promise<Balance[]> {

    const account =
      await this.client.get<
        AccountInfo & {
          balances: Balance[];
        }
      >(
        "/api/v3/account",
        undefined,
        true,
      );

    return account.balances;

  }

  public async getBalance(
    asset: string,
  ): Promise<Balance | undefined> {

    const balances =
      await this.getBalances();

    const balance =
      balances.find(
        (item) =>
          item.asset === asset,
      );

    return balance;

  }

}
