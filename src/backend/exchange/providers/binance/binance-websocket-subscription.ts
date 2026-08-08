export class BinanceWebSocketSubscription {

  private symbols:
    string[] = [];

  public subscribe(
    symbols: readonly string[],
  ): void {

    this.symbols =
      [
        ...symbols,
      ];

  }

  public unsubscribe(
    symbols: readonly string[],
  ): void {

    this.symbols =
      this.symbols.filter(
        (item) =>
          !symbols.includes(item),
      );

  }

  public getSymbols():
    readonly string[] {

    return this.symbols;

  }

}
