import {
  ExchangeService,
} from "../services/exchange-service";

import {
  BinanceExchange,
} from "../providers/binance/binance-exchange";

import type {
  ExchangeConfiguration,
} from "../types/exchange-configuration";

export class ExchangeFacade {

  private readonly service:
    ExchangeService;

  public constructor() {

    this.service =
      new ExchangeService();

  }


  public getService():
    ExchangeService {

    return this.service;

  }


  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    return this.service.create(
      configuration,
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


  public async connect():
    Promise<void> {

    await this.service.connect();

  }


  public async disconnect():
    Promise<void> {

    await this.service.disconnect();

  }


  public async stop():
    Promise<void> {

    await this.service.stop();

  }


  public getExchange():
    BinanceExchange | null {

    return this.service.getExchange();

  }


  public getStatus() {

    return this.service.getStatus();

  }


  public getHealth() {

    return this.service.getHealth();

  }


  public async validate():
    Promise<boolean> {

    return await this.service.validate();

  }

}
