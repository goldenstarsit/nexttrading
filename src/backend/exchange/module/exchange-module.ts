import {
  ExchangeController,
} from "../controller/exchange-controller";

import {
  BinanceExchange,
} from "../providers/binance/binance-exchange";

import type {
  ExchangeConfiguration,
} from "../types/exchange-configuration";

export class ExchangeModule {

  private readonly controller:
    ExchangeController;

  public constructor() {

    this.controller =
      new ExchangeController();

  }


  public getController():
    ExchangeController {

    return this.controller;

  }


  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    return this.controller.create(
      configuration,
    );

  }


  public async initialize():
    Promise<void> {

    await this.controller.initialize();

  }


  public async start():
    Promise<void> {

    await this.controller.start();

  }


  public async connect():
    Promise<void> {

    await this.controller.connect();

  }


  public async disconnect():
    Promise<void> {

    await this.controller.disconnect();

  }


  public async stop():
    Promise<void> {

    await this.controller.stop();

  }


  public getExchange():
    BinanceExchange | null {

    return this.controller.getExchange();

  }


  public getStatus() {

    return this.controller.getStatus();

  }


  public getHealth() {

    return this.controller.getHealth();

  }


  public async validate():
    Promise<boolean> {

    return await this.controller.validate();

  }

}
