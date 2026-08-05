export interface DependencyContainer {

  register<T>(
    key: string,
    dependency: T,
  ): void;


  resolve<T>(
    key: string,
  ): T;

}
