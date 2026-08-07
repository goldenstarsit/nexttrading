import {
  ExchangeManager,
} from "../manager/exchange-manager";

import {
  BinanceExchange,
} from "../providers/binance/binance-exchange";

import type {
  ExchangeConfiguration,
} from "../types/exchange-configuration";

export class ExchangeController {

  private readonly manager:
    ExchangeManager;

  public constructor() {

    this.manager =
      new ExchangeManager();

  }


  public getManager():
    ExchangeManager {

    return this.manager;

  }


  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    return this.manager.create(
      configuration,
    );

  }


  public async initialize():
    Promise<void> {

    await this.manager.initialize();

  }


  public async start():
    Promise<void> {

    await this.manager.start();

  }


  public async connect():
    Promise<void> {

    await this.manager.connect();

  }


  public async disconnect():
    Promise<void> {

    await this.manager.disconnect();

  }


  public async stop():
    Promise<void> {

    await this.manager.stop();

  }


  public getExchange():
    BinanceExchange | null {

    return this.manager.getExchange();

  }


  public getStatus() {

    return this.manager.getStatus();

  }


  public getHealth() {

    return this.manager.getHealth();

  }


  public async validate():
    Promise<boolean> {

    return await this.manager.validate();

  }

}
