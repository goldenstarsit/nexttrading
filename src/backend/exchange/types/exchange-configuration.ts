export interface ExchangeConfiguration {

  readonly apiKey: string;

  readonly apiSecret: string;

  readonly restBaseUrl: string;

  readonly websocketBaseUrl: string;

  readonly testnet: boolean;

}
