import {
  ExchangeBootstrap,
} from "../bootstrap/exchange-bootstrap";

import {
  BinanceExchange,
} from "../providers/binance/binance-exchange";

import type {
  ExchangeConfiguration,
} from "../types/exchange-configuration";

export class ExchangeService {

  private readonly bootstrap:
    ExchangeBootstrap;

  public constructor() {

    this.bootstrap =
      new ExchangeBootstrap();

  }


  public getBootstrap():
    ExchangeBootstrap {

    return this.bootstrap;

  }


  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    return this.bootstrap.create(
      configuration,
    );

  }


  public async initialize():
    Promise<void> {

    await this.bootstrap.initialize();

  }


  public async start():
    Promise<void> {

    await this.bootstrap.start();

  }


  public async connect():
    Promise<void> {

    await this.bootstrap.connect();

  }


  public async disconnect():
    Promise<void> {

    await this.bootstrap.disconnect();

  }


  public async stop():
    Promise<void> {

    await this.bootstrap.stop();

  }


  public getExchange():
    BinanceExchange | null {

    return this.bootstrap.getExchange();

  }


  public getStatus() {

    return this.bootstrap.getStatus();

  }


  public getHealth() {

    return this.bootstrap.getHealth();

  }


  public async validate():
    Promise<boolean> {

    return await this.bootstrap.validate();

  }

}
