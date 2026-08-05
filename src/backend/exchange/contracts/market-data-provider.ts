export interface MarketDataProvider {

  subscribeMarketData(
    symbols: readonly string[],
  ): Promise<void>;


  unsubscribeMarketData(
    symbols: readonly string[],
  ): Promise<void>;

}
