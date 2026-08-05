export interface Configurable<TConfig> {

  configure(
    config: TConfig
  ): void;

}
