export interface Order {

  readonly symbol: string;

  readonly orderId: number;

  readonly clientOrderId: string;

  readonly price: string;

  readonly origQty: string;

  readonly executedQty: string;

  readonly status: string;

  readonly type: string;

  readonly side: string;

  readonly time: number;

  readonly updateTime: number;

}
