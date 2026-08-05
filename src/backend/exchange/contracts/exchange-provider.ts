import type {
  Identifiable,
} from "../../core/contracts/base/identifiable";

import type {
  Named,
} from "../../core/contracts/base/named";

import type {
  Versioned,
} from "../../core/contracts/base/versioned";

import type {
  Configurable,
} from "../../core/contracts/capabilities/configurable";

import type {
  HealthCheckable,
} from "../../core/contracts/capabilities/health-checkable";

import type {
  Initializable,
} from "../../core/contracts/capabilities/initializable";

import type {
  Startable,
} from "../../core/contracts/capabilities/startable";

import type {
  Stoppable,
} from "../../core/contracts/capabilities/stoppable";

import type {
  AccountProvider,
} from "./account-provider";

import type {
  MarketDataProvider,
} from "./market-data-provider";

import type {
  TradingProvider,
} from "./trading-provider";


export interface ExchangeProvider<TConfig>
  extends
    Identifiable,
    Named,
    Versioned,
    Configurable<TConfig>,
    Initializable,
    Startable,
    Stoppable,
    HealthCheckable,
    MarketDataProvider,
    TradingProvider,
    AccountProvider {}
