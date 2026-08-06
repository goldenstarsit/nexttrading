import {
  BinanceExchange,
} from "../providers/binance/binance-exchange";

import {
  BinanceExchangeFactory,
} from "../providers/binance/binance-exchange-factory";

import type {
  ExchangeConfiguration,
} from "../types/exchange-configuration";

export class ExchangeRuntime {

  private readonly factory:
    BinanceExchangeFactory;

  private exchange:
    BinanceExchange | null =
    null;

  public constructor() {

    this.factory =
      new BinanceExchangeFactory();

  }

  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    this.exchange =
      this.factory.create(
        configuration,
      );

    return this.exchange;

  }

  public getExchange():
    BinanceExchange | null {

    return this.exchange;

  }


  public async initialize():
    Promise<void> {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    await this.exchange.initialize();

  }


  public async start():
    Promise<void> {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    await this.exchange.start();

  }


  public async stop():
    Promise<void> {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    await this.exchange.stop();

  }


  public async connect():
    Promise<void> {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    await this.exchange.connect();

  }


  public async disconnect():
    Promise<void> {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    await this.exchange.disconnect();

  }


  public async reconnect():
    Promise<boolean> {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    return await this.exchange.reconnect();

  }


  public async ensureConnected():
    Promise<boolean> {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    return await this.exchange.ensureConnected();

  }


  public getStatus() {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    return this.exchange.getStatus();

  }


  public getHealth() {

    if (
      this.exchange ===
      null
    ) {

      throw new Error(
        "Exchange has not been created.",
      );

    }

    return this.exchange.getHealth();

  }

}
