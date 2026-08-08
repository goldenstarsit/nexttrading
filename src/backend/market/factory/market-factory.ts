import { BinanceMarketProvider } from "../adapters/binance/binance-market-provider";

import {
  MarketRegistry,
} from "../registry/market-registry";

import type {
  MarketProvider,
} from "../types";

export class MarketFactory {

  private readonly registry =
    new MarketRegistry();


  public registerBinance(): BinanceMarketProvider {
    const provider = new BinanceMarketProvider();

    this.register(
      provider.name,
      provider,
    );

    return provider;
  }


  public getRegistry():
    MarketRegistry {

    return this.registry;

  }


  public register(
    name: string,
    provider: MarketProvider,
  ): void {

    this.registry.register(
      name,
      provider,
    );

  }


  public get(
    name: string,
  ): MarketProvider | undefined {

    return this.registry.get(
      name,
    );

  }


  public has(
    name: string,
  ): boolean {

    return this.registry.has(
      name,
    );

  }


  public unregister(
    name: string,
  ): void {

    this.registry.unregister(
      name,
    );

  }


  public getNames():
    readonly string[] {

    return this.registry.getNames();

  }


  public size(): number {

    return this.registry.size();

  }


  public clear(): void {

    this.registry.clear();

  }


  public hasProvider(
    name: string,
  ): boolean {

    return this.registry.has(
      name.trim(),
    );

  }


  public getProvider(
    name: string,
  ): MarketProvider | undefined {

    return this.registry.get(
      name.trim(),
    );

  }

}
