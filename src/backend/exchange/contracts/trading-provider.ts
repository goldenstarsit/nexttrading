import type {
  CancelOrderRequest,
} from "../types/cancel-order-request";

import type {
  GetOpenOrdersRequest,
} from "../types/get-open-orders-request";

import type {
  GetOrderRequest,
} from "../types/get-order-request";

import type {
  Order,
} from "../types/order";

import type {
  OrderRequest,
} from "../types/order-request";


export interface TradingProvider {

  placeOrder(
    request: OrderRequest,
  ): Promise<Order>;


  cancelOrder(
    request: CancelOrderRequest,
  ): Promise<void>;


  getOrder(
    request: GetOrderRequest,
  ): Promise<Order | undefined>;


  getOpenOrders(
    request: GetOpenOrdersRequest,
  ): Promise<
    readonly Order[]
  >;

}
