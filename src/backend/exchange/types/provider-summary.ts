import type {
  ProviderName,
} from "./provider-name";

import type {
  ProviderVersion,
} from "./provider-version";

import type {
  ProviderState,
} from "./provider-state";

export interface ProviderSummary {

  readonly provider:
    ProviderName;

  readonly version:
    ProviderVersion;

  readonly state:
    ProviderState;

}
