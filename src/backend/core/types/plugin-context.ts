import type {
  PluginMetadata,
} from "./plugin-metadata";

import type {
  PluginStatus,
} from "./plugin-status";


export interface PluginContext {

  readonly metadata: PluginMetadata;

  readonly status: PluginStatus;

}
