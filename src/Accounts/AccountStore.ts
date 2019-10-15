import {
    Account,
    IAccountPayload
} from "./Account";
import { validatePath } from "./AccountUtils";

const initializedAccounts: { [key: string]: Account } = {};

// TODO: Implement this better and upload to whatever DB we're using
// This is not necessary for this project since this will only read and output transactions
export function createAccount(accountPayload: IAccountPayload): Account | undefined {
    // Validate account payload
    // Most of the other functions are pretty optimistic regarding the inputs.
    // Make sure that when we use this function, only accept valid payloads
    return initializeAccount(accountPayload);
}

export function getAllAccounts(): Account[] {
    // TODO: Implement query for account list.
    // This would be a good place to query for the accounts from whereever we keep them.
    // For now, we can keep them statically since this won't change much,
    return Object.values(initializedAccounts);
}

export function getAccount(materializedPath: string): Account | undefined {
    // Not sure if I want this yet, but this makes sense for the parser...
    // if (!initializedAccounts.length) { initializeAllAccounts(); }

    return initializedAccounts[materializedPath];
}

// TODO: Implement this
// These kind of makes sense to be done in a SQL table read
export function getAccountsWithParent(parentAccountName: string): Account[] {
    return [];
}

// Initializes the desired account and all uninitialized ancestors
export function initializeAccount({ materializedPath }: IAccountPayload): Account | undefined {
    if (!validatePath(materializedPath)) { return; }

    if (initializedAccounts[materializedPath]) { return initializedAccounts[materializedPath]; }

    const account = new Account({ materializedPath });
    initializedAccounts[materializedPath] = account;

    const regexTest = /:(?:.(?!:))+$/m;
    if (regexTest.test(materializedPath)) {
        const parentPath = materializedPath.replace(regexTest, "");
        const parent = initializedAccounts[parentPath] || initializeAccount({ materializedPath: parentPath });
        account.parent = parent;
        account.parent.children.push(account);
    }

    return account;
}

export function initializeAllAccounts() {
    // TODO: Implement getter of where we store the accounts
    // This is super ugly having the account list as part of the code.
    const accountJson = require("./AccountPayload.json");
    accountJson.forEach(initializeAccount);
}
