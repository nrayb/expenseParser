import { Account } from "../Accounts/Account";
import { getAccount } from "../Accounts/AccountStore";
import {
    inferAccountPath,
    mapSanitizedAccountToAccountName,
    sanitizeAccountName,
} from "./TransactionUtils";

// TODO: experiment to see if regex will be faster
// Since we know the format comming in from RBC, it may be faster to just parse it through regex
// For now though, we can simply trust that this method will work, and is universal enough for this.
export function parseDate(date: string): Date {
    return new Date(date);
}

// Most banks don't have a concept of a transaction name
// What we will have to do is to guess the name based on the target account name
export function inferTransactionName(accountName: string): string {
    const sanitizedAccount = sanitizeAccountName(accountName);
    const mappedAccount = mapSanitizedAccountToAccountName(sanitizedAccount);
    return mappedAccount || sanitizedAccount;
}

export function inferAccount(accountName: string): Account | undefined {
    const sanitizedAccount = sanitizeAccountName(accountName);
    const accountPath = inferAccountPath(sanitizedAccount);
    return getAccount(accountPath);
}

// TODO: Implement this
export function inferDescription(accountName: string): string | undefined {
    return undefined;
}
