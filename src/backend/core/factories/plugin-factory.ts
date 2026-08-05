import type {
  PluginMetadata,
} from "../types/plugin-metadata";


export interface PluginFactory<TPlugin> {

  create(
    metadata: PluginMetadata,
  ): TPlugin;

}
