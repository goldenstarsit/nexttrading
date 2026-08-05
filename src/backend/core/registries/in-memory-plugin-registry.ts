import {
  RegistrationError,
} from "../errors/registration-error";

import type {
  PluginMetadata,
} from "../types/plugin-metadata";

import type {
  PluginRegistry,
} from "./plugin-registry";


export class InMemoryPluginRegistry
  implements PluginRegistry {


  private readonly plugins =
    new Map<string, PluginMetadata>();


  public register(
    metadata: PluginMetadata,
  ): void {

    if (
      this.plugins.has(
        metadata.id,
      )
    ) {

      throw new RegistrationError(
        `Plugin already registered: ${metadata.id}`,
      );

    }

    this.plugins.set(
      metadata.id,
      metadata,
    );

  }


  public has(
    id: string,
  ): boolean {

    return this.plugins.has(id);

  }


  public get(
    id: string,
  ): PluginMetadata | undefined {

    return this.plugins.get(id);

  }


  public list(): PluginMetadata[] {

    return Array.from(
      this.plugins.values(),
    );

  }


  public remove(
    id: string,
  ): void {

    this.plugins.delete(id);

  }

}
