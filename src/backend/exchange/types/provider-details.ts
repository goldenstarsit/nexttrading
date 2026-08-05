import type {
  ProviderInfo,
} from "./provider-info";

import type {
  ProviderStatus,
} from "./provider-status";

export interface ProviderDetails {

  readonly info:
    ProviderInfo;

  readonly status:
    ProviderStatus;

}
