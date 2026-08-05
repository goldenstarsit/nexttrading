import type {
  ProviderIdentifier,
} from "./provider-identifier";

import type {
  ProviderDisplayName,
} from "./provider-display-name";

import type {
  ProviderVersion,
} from "./provider-version";

export interface ProviderInfo {

  readonly identifier:
    ProviderIdentifier;

  readonly displayName:
    ProviderDisplayName;

  readonly version:
    ProviderVersion;

}
