import {
  ExchangeFacade,
} from "../facade/exchange-facade";

import {
  BinanceExchange,
} from "../providers/binance/binance-exchange";

import type {
  ExchangeConfiguration,
} from "../types/exchange-configuration";

export class ExchangeManager {

  private readonly facade:
    ExchangeFacade;

  public constructor() {

    this.facade =
      new ExchangeFacade();

  }


  public getFacade():
    ExchangeFacade {

    return this.facade;

  }


  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    return this.facade.create(
      configuration,
    );

  }


  public async initialize():
    Promise<void> {

    await this.facade.initialize();

  }


  public async start():
    Promise<void> {

    await this.facade.start();

  }


  public async connect():
    Promise<void> {

    await this.facade.connect();

  }


  public async disconnect():
    Promise<void> {

    await this.facade.disconnect();

  }


  public async stop():
    Promise<void> {

    await this.facade.stop();

  }


  public getExchange():
    BinanceExchange | null {

    return this.facade.getExchange();

  }


  public getStatus() {

    return this.facade.getStatus();

  }


  public getHealth() {

    return this.facade.getHealth();

  }


  public async validate():
    Promise<boolean> {

    return await this.facade.validate();

  }

}
