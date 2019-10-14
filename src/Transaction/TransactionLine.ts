import { Account } from "../Accounts/Account";

export interface ITransactionLine {
    account: Account;
    currency: string;
    value: number;
}

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
