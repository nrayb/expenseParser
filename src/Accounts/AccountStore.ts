import {
    Account,
    IAccountPayload
} from "./Account";

import { validatePath } from "./AccountUtils";

const initializedAccounts: { [key: string]: Account } = {};

// TODO: Implement this better and upload to whatever DB we're using
// This is not necessary for this project since this will only read and output transactions
export function createAccount(accountPayload: IAccountPayload): Account {
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
    return initializedAccounts[materializedPath];
}

// TODO: Implement this
// These kind of makes sense to be done in a SQL table read
export function getAccountsWithParent(parentAccountName: string): Account[] {
    return [];
}

// Initializes the desired account and all uninitialized ancestors
export function initializeAccount({ materializedPath }: IAccountPayload): Account {
    if (!validatePath(materializedPath) || initializedAccounts[materializedPath]) { return; }

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
    const ACCOUNT_PAYLOADS: IAccountPayload[] = [
        { materializedPath: "Expenses:Transport:TransitPass" },
        { materializedPath: "Expenses:Home:Electricity" },
        { materializedPath: "Expenses:Home:Mortgage" },
        { materializedPath: "Expenses:Home:Strata" },
        { materializedPath: "Expenses:Home:PropertyTax" },
        { materializedPath: "Expenses:Home:Insurance" },
        { materializedPath: "Expenses:Home:Groceries" },
        { materializedPath: "Expenses:Home:Phone:Mine" }, // TODO: change the accountName
        { materializedPath: "Expenses:Home:Phone:Mom" }, // TODO: change the accountName
        { materializedPath: "Expenses:Home:Furniture" },
        { materializedPath: "Expenses:Car:Insurance" },
        { materializedPath: "Expenses:Car:Gas" },
        { materializedPath: "Expenses:Car:Maintenance" },
        { materializedPath: "Expenses:Food:Breakfast" },
        { materializedPath: "Expenses:Food:Brunch" },
        { materializedPath: "Expenses:Food:Lunch" },
        { materializedPath: "Expenses:Food:Dinner" },
        { materializedPath: "Expenses:Food:Snacks" },
        { materializedPath: "Expenses:Food:Coffee" },
        { materializedPath: "Expenses:Shared-Account" },
        { materializedPath: "Expenses:Personal:Date" },
        { materializedPath: "Expenses:Personal:Toys" },
        { materializedPath: "Expenses:Personal:Tech" },
        { materializedPath: "Expenses:Personal:Camera" },
        { materializedPath: "Expenses:Personal:ShitHappens" },
        { materializedPath: "Expenses:Personal:Clothes" },
        { materializedPath: "Expenses:Personal:Taxes" },
        { materializedPath: "Expenses:Personal:Material" }, // TODO: change the accountName
        { materializedPath: "Expenses:Personal:Fun" }, // TODO: change the accountName
        { materializedPath: "Expenses:Personal:Necessary" },
        { materializedPath: "Expenses:Personal:Travel:Flights" },
        { materializedPath: "Expenses:Personal:Travel:Transit" },
        { materializedPath: "Expenses:Personal:Travel:Wifi" },
        { materializedPath: "Expenses:Personal:Travel:Toiletries" },
        { materializedPath: "Expenses:Personal:Travel:Accommodations" },
        { materializedPath: "Expenses:Personal:Travel:PocketMoney" },
        { materializedPath: "Expenses:Gifts:Etc" },
        { materializedPath: "Expenses:Gifts:Rochelle" },
        { materializedPath: "Expenses:Gifts:Camille" },
        { materializedPath: "Expenses:Gifts:Mom" },
        { materializedPath: "Expenses:Gifts:Dad" },
        { materializedPath: "Expenses:Gifts:Kokoy" },
        { materializedPath: "Expenses:Gifts:Jay" },
    ];

    ACCOUNT_PAYLOADS.forEach(initializeAccount);
}
