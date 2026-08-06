import {
  ExchangeRuntime,
} from "../runtime/exchange-runtime";

import {
  BinanceExchange,
} from "../providers/binance/binance-exchange";

import type {
  ExchangeConfiguration,
} from "../types/exchange-configuration";

export class ExchangeBootstrap {

  private readonly runtime:
    ExchangeRuntime;

  public constructor() {

    this.runtime =
      new ExchangeRuntime();

  }

  public getRuntime():
    ExchangeRuntime {

    return this.runtime;

  }


  public create(
    configuration: ExchangeConfiguration,
  ): BinanceExchange {

    return this.runtime.create(
      configuration,
    );

  }


  public async initialize():
    Promise<void> {

    await this.runtime.initialize();

  }


  public async start():
    Promise<void> {

    await this.runtime.start();

  }


  public async connect():
    Promise<void> {

    await this.runtime.connect();

  }


  public async disconnect():
    Promise<void> {

    await this.runtime.disconnect();

  }


  public async stop():
    Promise<void> {

    await this.runtime.stop();

  }


  public getExchange():
    BinanceExchange | null {

    return this.runtime.getExchange();

  }


  public getStatus() {

    return this.runtime.getStatus();

  }


  public getHealth() {

    return this.runtime.getHealth();

  }


  public async validate():
    Promise<boolean> {

    const exchange =
      this.getExchange();

    if (
      exchange ===
      null
    ) {

      return false;

    }

    const health =
      await this.getHealth();

    return (
      health !==
      null
    );

  }

}
