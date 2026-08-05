export interface PlaceOrderRequest {

  readonly symbol: string;

  readonly side: string;

  readonly type: string;

  readonly quantity: number;

  readonly price?: number;

  readonly timeInForce?: string;

}
