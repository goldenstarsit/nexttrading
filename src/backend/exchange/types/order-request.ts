import type {
  ExchangeSymbol,
} from "./exchange-symbol";

import type {
  OrderSide,
} from "./order-side";

import type {
  OrderType,
} from "./order-type";


export interface OrderRequest {

  readonly symbol: ExchangeSymbol;

  readonly side: OrderSide;

  readonly type: OrderType;

  readonly quantity: number;

  readonly price?: number;

}
