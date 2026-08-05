import type {
  AccountInfo,
} from "../types/account-info";

import type {
  Balance,
} from "../types/balance";


export interface AccountProvider {

  getAccountInfo(): Promise<AccountInfo>;


  getBalances(): Promise<
    readonly Balance[]
  >;


  getBalance(
    asset: string,
  ): Promise<
    Balance | undefined
  >;

}
