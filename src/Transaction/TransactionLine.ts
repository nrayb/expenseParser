import { Account } from "../Accounts/Account";

export interface ITransactionLine {
    account: Account;
    currency: string;
    value: number;
}

// Hmmm now that I think about it,
// Do is still need this class? the interface is enough isn't it?
export class TransactionLine {
    public account: Account;
    public currency: string;
    public value: number;
    constructor({ account, currency, value }: ITransactionLine) {
        this.account = account;
        this.currency = currency;
        this.value = value;
    }
}
