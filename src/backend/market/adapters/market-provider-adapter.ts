import type {
  MarketConfiguration,
  MarketHealth,
  MarketSnapshot,
  MarketStatus,
  MarketTick,
  MarketProvider,
} from "../types";

export abstract class MarketProviderAdapter
  implements MarketProvider {

  public abstract readonly name: string;

  protected configuration:
    MarketConfiguration | null = null;

  protected initialized = false;

  protected running = false;

  protected status:
    MarketStatus = {
      connected: false,
      streaming: false,
    };

  protected health:
    MarketHealth = {
      healthy: false,
      message: "Not initialized",
    };

  protected readonly subscriptions =
    new Set<string>();

  protected setStatus(
    status: MarketStatus,
  ): void {

    this.status = status;

  }


  protected setConnected(
    connected: boolean,
  ): void {

    this.status = {
      ...this.status,
      connected,
    };

  }


  protected setStreaming(
    streaming: boolean,
  ): void {

    this.status = {
      ...this.status,
      streaming,
    };

  }


  protected setHealthy(
    message: string = "Healthy",
  ): void {

    this.health = {
      healthy: true,
      message,
    };

  }


  protected setUnhealthy(
    message: string,
  ): void {

    this.health = {
      healthy: false,
      message,
    };

  }


  protected setHealth(
    health: MarketHealth,
  ): void {

    this.health = health;

  }


  protected getConfiguration():
    MarketConfiguration | null {

    return this.configuration;

  }


  protected addSubscription(
    symbol: string,
  ): void {

    this.subscriptions.add(
      symbol.trim(),
    );

  }


  protected removeSubscription(
    symbol: string,
  ): void {

    this.subscriptions.delete(
      symbol.trim(),
    );

  }


  protected hasSubscription(
    symbol: string,
  ): boolean {

    return this.subscriptions.has(
      symbol.trim(),
    );

  }


  protected clearSubscriptions():
    void {

    this.subscriptions.clear();

  }

  protected isInitialized():
    boolean {

    return this.initialized;

  }


  protected isRunning():
    boolean {

    return this.running;

  }


  protected getSubscriptions():
    readonly string[] {

    return Array.from(
      this.subscriptions,
    );

  }


  public abstract readonly capabilities: {
    streaming: boolean;
    snapshots: boolean;
    subscriptions: boolean;
  };



  public async initialize():
    Promise<void> {

    this.initialized = true;

    this.setConnected(false);
    this.setStreaming(false);
    this.setHealthy(
      "Initialized",
    );

  }


  public async start():
    Promise<void> {

    if (!this.initialized) {
      throw new Error(
        `Market provider "${this.name}" must be initialized before start`,
      );
    }

    this.running = true;

    this.setConnected(true);

    if (this.capabilities.streaming) {
      this.setStreaming(true);
    }

  }


  public async stop():
    Promise<void> {

    this.running = false;

    this.setConnected(false);
    this.setStreaming(false);

  }


  public async configure(
    configuration: MarketConfiguration,
  ): Promise<void> {

    this.configuration =
      configuration;

  }

  public getStatus():
    MarketStatus {

    return this.status;

  }


  public getHealth():
    MarketHealth {

    return this.health;

  }

  public abstract getSnapshot(
    symbol: string,
  ): Promise<MarketSnapshot | null>;

  public abstract subscribe(
    symbol: string,
  ): Promise<void>;

  public abstract unsubscribe(
    symbol: string,
  ): Promise<void>;

  public abstract onTick(
    callback: (
      tick: MarketTick,
    ) => void,
  ): void;

}
