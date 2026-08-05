import type {
  PluginMetadata,
} from "../types/plugin-metadata";


export interface PluginRegistry {

  register(
    metadata: PluginMetadata,
  ): void;


  has(
    id: string,
  ): boolean;


  get(
    id: string,
  ): PluginMetadata | undefined;


  list(): PluginMetadata[];


  remove(
    id: string,
  ): void;

}
