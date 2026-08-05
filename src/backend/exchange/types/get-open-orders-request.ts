import type {
  ExchangeSymbol,
} from "./exchange-symbol";


export interface GetOpenOrdersRequest {

  readonly symbol: ExchangeSymbol;

}
