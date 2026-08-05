import type {
  ExchangeSymbol,
} from "./exchange-symbol";


export interface GetOrderRequest {

  readonly symbol: ExchangeSymbol;

  readonly orderId: string;

}
