export interface HealthCheckable {

  healthCheck(): Promise<boolean>;

}
