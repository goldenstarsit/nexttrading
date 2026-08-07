import type {
  MarketConfiguration,
} from "./market-configuration";

import type {
  MarketHealth,
} from "./market-health";

import type {
  MarketSnapshot,
} from "./market-snapshot";

import type {
  MarketStatus,
} from "./market-status";

import type {
  MarketTick,
} from "./market-tick";

export interface MarketProvider {

  initialize():
    Promise<void>;

  start():
    Promise<void>;

  stop():
    Promise<void>;

  configure(
    configuration: MarketConfiguration,
  ): Promise<void>;

  getStatus():
    MarketStatus;

  getHealth():
    MarketHealth;

  getSnapshot(
    symbol: string,
  ): Promise<MarketSnapshot | null>;

  subscribe(
    symbol: string,
  ): Promise<void>;

  unsubscribe(
    symbol: string,
  ): Promise<void>;

  onTick(
    callback: (
      tick: MarketTick,
    ) => void,
  ): void;

}
