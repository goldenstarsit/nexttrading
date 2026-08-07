import type {
  MarketProvider,
} from "../types";

export class MarketRegistry {

  private readonly providers =
    new Map<
      string,
      MarketProvider
    >();



  public register(
    name: string,
    provider: MarketProvider,
  ): void {

    const normalizedName =
      name.trim();

    if (!normalizedName) {
      throw new Error(
        "Market provider name cannot be empty",
      );
    }

    this.providers.set(
      normalizedName,
      provider,
    );

  }


  public get(
    name: string,
  ): MarketProvider | undefined {

    return this.providers.get(
      name,
    );

  }


  public has(
    name: string,
  ): boolean {

    return this.providers.has(
      name,
    );

  }


  public unregister(
    name: string,
  ): void {

    this.providers.delete(
      name,
    );

  }


  public getNames(): readonly string[] {

    return Array.from(
      this.providers.keys(),
    );

  }


  public size(): number {

    return this.providers.size;

  }


  public clear(): void {

    this.providers.clear();

  }

}
