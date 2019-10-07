import {
    Account,
    IAccountPayload
} from "./Account";

// Hm.... I don't think I like having the accountName as well as the materializedPath.
// The materializedPath should be enough, and we should use this as the uniqueId
const ACCOUNT_PAYLOADS: IAccountPayload[] = [
    { accountName: "TransitPass", materializedPath: "Expenses:Transport:TransitPass" },
    { accountName: "Electricity", materializedPath: "Expenses:Home:Electricity" },
    { accountName: "Mortgage", materializedPath: "Expenses:Home:Mortgage" },
    { accountName: "Strata", materializedPath: "Expenses:Home:Strata" },
    { accountName: "PropertyTax", materializedPath: "Expenses:Home:PropertyTax" },
    { accountName: "Insurance", materializedPath: "Expenses:Home:Insurance" },
    { accountName: "Groceries", materializedPath: "Expenses:Home:Groceries" },
    { accountName: "Phone-Mine", materializedPath: "Expenses:Home:Phone:Mine" }, // TODO: change the accountName
    { accountName: "Phone-Mom", materializedPath: "Expenses:Home:Phone:Mom" }, // TODO: change the accountName
    { accountName: "Furniture", materializedPath: "Expenses:Home:Furniture" },
    { accountName: "Insurance", materializedPath: "Expenses:Car:Insurance" },
    { accountName: "Gas", materializedPath: "Expenses:Car:Gas" },
    { accountName: "Maintenance", materializedPath: "Expenses:Car:Maintenance" },
    { accountName: "Breakfast", materializedPath: "Expenses:Food:Breakfast" },
    { accountName: "Brunch", materializedPath: "Expenses:Food:Brunch" },
    { accountName: "Lunch", materializedPath: "Expenses:Food:Lunch" },
    { accountName: "Dinner", materializedPath: "Expenses:Food:Dinner" },
    { accountName: "Snacks", materializedPath: "Expenses:Food:Snacks" },
    { accountName: "Coffee", materializedPath: "Expenses:Food:Coffee" },
    { accountName: "Shared-Account", materializedPath: "Expenses:Shared-Account" },
    { accountName: "Date", materializedPath: "Expenses:Personal:Date" },
    { accountName: "Toys", materializedPath: "Expenses:Personal:Toys" },
    { accountName: "Tech", materializedPath: "Expenses:Personal:Tech" },
    { accountName: "Camera", materializedPath: "Expenses:Personal:Camera" },
    { accountName: "ShitHappens", materializedPath: "Expenses:Personal:ShitHappens" },
    { accountName: "Clothes", materializedPath: "Expenses:Personal:Clothes" },
    { accountName: "Taxes", materializedPath: "Expenses:Personal:Taxes" },
    { accountName: "Material", materializedPath: "Expenses:Personal:Material" }, // TODO: change the accountName
    { accountName: "Fun", materializedPath: "Expenses:Personal:Fun" }, // TODO: change the accountName
    { accountName: "Necessary", materializedPath: "Expenses:Personal:Necessary" },
    { accountName: "Flights", materializedPath: "Expenses:Personal:Travel:Flights" },
    { accountName: "Transit", materializedPath: "Expenses:Personal:Travel:Transit" },
    { accountName: "Wifi", materializedPath: "Expenses:Personal:Travel:Wifi" },
    { accountName: "Toiletries", materializedPath: "Expenses:Personal:Travel:Toiletries" },
    { accountName: "Accommodations", materializedPath: "Expenses:Personal:Travel:Accommodations" },
    { accountName: "PocketMoney", materializedPath: "Expenses:Personal:Travel:PocketMoney" },
    { accountName: "Etc", materializedPath: "Expenses:Gifts:Etc" },
    { accountName: "Rochelle", materializedPath: "Expenses:Gifts:Rochelle" },
    { accountName: "Camille", materializedPath: "Expenses:Gifts:Camille" },
    { accountName: "Mom", materializedPath: "Expenses:Gifts:Mom" },
    { accountName: "Dad", materializedPath: "Expenses:Gifts:Dad" },
    { accountName: "Kokoy", materializedPath: "Expenses:Gifts:Kokoy" },
    { accountName: "Jay", materializedPath: "Expenses:Gifts:Jay" },
];

const initializedAccounts: Account[] = [];

// TODO: Implement this
// These kind of makes sense to be done in a SQL table read
export function getAllAccounts(): Account[] {
    // TODO: Implement query for account list.
    // This would be a good place to query for the accounts from whereever we keep them.
    // For now, we can keep them statically since this won't change much,
    return [];
}

// TODO: Implement this
// These kind of makes sense to be done in a SQL table read
export function getAccount(accountName: string): Account {
    return undefined;
}

// TODO: Implement this
// These kind of makes sense to be done in a SQL table read
export function getAccountsWithParent(parentAccountName: string): Account[] {
    return [];
}
