export interface AccountInfo {

  readonly makerCommission: number;

  readonly takerCommission: number;

  readonly buyerCommission: number;

  readonly sellerCommission: number;

  readonly canTrade: boolean;

  readonly canWithdraw: boolean;

  readonly canDeposit: boolean;

  readonly updateTime: number;

  readonly accountType: string;

}
