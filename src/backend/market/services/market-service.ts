import type {
  MarketConfiguration,
  MarketProvider,
  MarketSnapshot,
  MarketTick,
  MarketStatus,
  MarketHealth,
} from "../types";

export class MarketService {

  private provider:
    MarketProvider | null = null;


  public setProvider(
    provider: MarketProvider,
  ): void {

    this.provider = provider;

  }


  public getProvider():
    MarketProvider | null {

    return this.provider;

  }


  public async initialize():
    Promise<void> {

    if (!this.provider) {
      return;
    }

    await this.provider.initialize();

  }


  public async start():
    Promise<void> {

    if (!this.provider) {
      return;
    }

    await this.provider.start();

  }


  public async stop():
    Promise<void> {

    if (!this.provider) {
      return;
    }

    await this.provider.stop();

  }


  public async configure(
    configuration: MarketConfiguration,
  ): Promise<void> {

    if (!this.provider) {
      return;
    }

    await this.provider.configure(
      configuration,
    );

  }


  public getStatus():
    MarketStatus | null {

    if (!this.provider) {
      return null;
    }

    return this.provider.getStatus();

  }


  public getHealth():
    MarketHealth | null {

    if (!this.provider) {
      return null;
    }

    return this.provider.getHealth();

  }


  public async getSnapshot(
    symbol: string,
  ): Promise<MarketSnapshot | null> {

    if (!this.provider) {
      return null;
    }

    return await this.provider.getSnapshot(
      symbol,
    );

  }


  public async subscribe(
    symbol: string,
  ): Promise<void> {

    if (!this.provider) {
      return;
    }

    await this.provider.subscribe(
      symbol,
    );

  }


  public async unsubscribe(
    symbol: string,
  ): Promise<void> {

    if (!this.provider) {
      return;
    }

    await this.provider.unsubscribe(
      symbol,
    );

  }


  public onTick(
    callback: (
      tick: MarketTick,
    ) => void,
  ): void {

    if (!this.provider) {
      return;
    }

    this.provider.onTick(
      callback,
    );

  }

}
