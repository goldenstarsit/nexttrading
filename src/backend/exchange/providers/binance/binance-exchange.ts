import {
  BinanceSpotProvider,
} from "./binance-spot-provider";

import {
  BinanceWebSocketStreamManager,
} from "./binance-websocket-stream-manager";

import {
  BinanceWebSocketSubscriptionManager,
} from "./binance-websocket-subscription-manager";

export class BinanceExchange {

  private readonly spotProvider:
    BinanceSpotProvider;

  private readonly streamManager:
    BinanceWebSocketStreamManager;

  private readonly subscriptionManager:
    BinanceWebSocketSubscriptionManager;

  public constructor(
    spotProvider: BinanceSpotProvider,
    streamManager: BinanceWebSocketStreamManager,
  ) {

    this.spotProvider =
      spotProvider;

    this.streamManager =
      streamManager;

    this.subscriptionManager =
      new BinanceWebSocketSubscriptionManager(
        streamManager,
      );

  }


  public async connect():
    Promise<void> {

    await this.streamManager.connect();

  }


  public async disconnect():
    Promise<void> {

    await this.streamManager.disconnect();

  }


  public async reconnect():
    Promise<boolean> {

    return await this.streamManager.reconnect();

  }


  public async ensureConnected():
    Promise<boolean> {

    return await this.streamManager.ensureConnected();

  }


  public subscribe(
    symbol: string,
  ): void {

    this.subscriptionManager.subscribe(
      symbol,
    );

  }


  public subscribeMany(
    symbols: readonly string[],
  ): void {

    this.subscriptionManager.subscribeMany(
      symbols,
    );

  }


  public unsubscribe(
    symbol: string,
  ): void {

    this.subscriptionManager.unsubscribe(
      symbol,
    );

  }


  public unsubscribeMany(
    symbols: readonly string[],
  ): void {

    this.subscriptionManager.unsubscribeMany(
      symbols,
    );

  }


  public resubscribeAll():
    void {

    this.subscriptionManager.resubscribeAll();

  }


  public getSpotProvider():
    BinanceSpotProvider {

    return this.spotProvider;

  }


  public getStreamManager():
    BinanceWebSocketStreamManager {

    return this.streamManager;

  }


  public getSubscriptionManager():
    BinanceWebSocketSubscriptionManager {

    return this.subscriptionManager;

  }


  public configure(
    config: Parameters<BinanceSpotProvider["configure"]>[0],
  ): void {

    this.spotProvider.configure(
      config,
    );

  }


  public async initialize():
    Promise<void> {

    await this.spotProvider.initialize();

  }


  public async start():
    Promise<void> {

    await this.spotProvider.start();

  }


  public async stop():
    Promise<void> {

    await this.spotProvider.stop();

  }


  public async placeOrder(
    request: Parameters<BinanceSpotProvider["placeOrder"]>[0],
  ) {

    return await this.spotProvider.placeOrder(
      request,
    );

  }


  public async cancelOrder(
    request: Parameters<BinanceSpotProvider["cancelOrder"]>[0],
  ): Promise<void> {

    await this.spotProvider.cancelOrder(
      request,
    );

  }


  public async getOrder(
    request: Parameters<BinanceSpotProvider["getOrder"]>[0],
  ) {

    return await this.spotProvider.getOrder(
      request,
    );

  }


  public async getOpenOrders(
    request?: Parameters<BinanceSpotProvider["getOpenOrders"]>[0],
  ) {

    return await this.spotProvider.getOpenOrders(
      request,
    );

  }


  public async getAccountInfo() {

    return await this.spotProvider.getAccountInfo();

  }


  public async getBalances() {

    return await this.spotProvider.getBalances();

  }


  public async getBalance(
    asset: string,
  ) {

    return await this.spotProvider.getBalance(
      asset,
    );

  }


  public async getStatus() {

    return await this.spotProvider.getStatus();

  }


  public async getHealth() {

    return await this.spotProvider.getHealth();

  }


  public async getDetails() {

    return await this.spotProvider.getDetails();

  }


  public async ping() {

    return await this.spotProvider.ping();

  }


  public async healthCheck():
    Promise<boolean> {

    return await this.spotProvider.healthCheck();

  }


  public getInfo() {

    return this.spotProvider.getInfo();

  }


  public getSummary() {

    return this.spotProvider.getSummary();

  }


  public getMetrics() {

    return this.spotProvider.getMetrics();

  }


  public getCapabilities() {

    return this.spotProvider.getCapabilities();

  }


  public getState() {

    return this.spotProvider.getState();

  }

}
