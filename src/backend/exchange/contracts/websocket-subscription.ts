export interface WebSocketSubscription {

  subscribe(
    symbols: readonly string[],
  ): Promise<void>;

  unsubscribe(
    symbols: readonly string[],
  ): Promise<void>;

}
