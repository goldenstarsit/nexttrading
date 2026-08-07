import {
  MarketService,
} from "../services/market-service";

import type {
  MarketProvider,
  MarketSnapshot,
  MarketTick,
  MarketConfiguration,
  MarketStatus,
  MarketHealth,
} from "../types";

export class MarketManager {

  private readonly service =
    new MarketService();


  public getService():
    MarketService {

    return this.service;

  }


  public setProvider(
    provider: MarketProvider,
  ): void {

    this.service.setProvider(
      provider,
    );

  }


  public async initialize():
    Promise<void> {

    await this.service.initialize();

  }


  public async start():
    Promise<void> {

    await this.service.start();

  }


  public async stop():
    Promise<void> {

    await this.service.stop();

  }


  public async configure(
    configuration: MarketConfiguration,
  ): Promise<void> {

    await this.service.configure(
      configuration,
    );

  }


  public getStatus():
    MarketStatus | null {

    return this.service.getStatus();

  }


  public getHealth():
    MarketHealth | null {

    return this.service.getHealth();

  }


  public async getSnapshot(
    symbol: string,
  ): Promise<MarketSnapshot | null> {

    return await this.service.getSnapshot(
      symbol,
    );

  }


  public async subscribe(
    symbol: string,
  ): Promise<void> {

    await this.service.subscribe(
      symbol,
    );

  }


  public async unsubscribe(
    symbol: string,
  ): Promise<void> {

    await this.service.unsubscribe(
      symbol,
    );

  }


  public onTick(
    callback: (
      tick: MarketTick,
    ) => void,
  ): void {

    this.service.onTick(
      callback,
    );

  }

}
