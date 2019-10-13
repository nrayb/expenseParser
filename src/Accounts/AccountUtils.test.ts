import {
    getAccountName,
    validatePath,
} from "./AccountUtils";

const accountMap: {[key: string]: string} = {
    "Expenses:Car:Gas": "Gas",
    "Expenses:Car:Insurance": "Insurance",
    "Expenses:Car:Maintenance": "Maintenance",
    "Expenses:Food:Breakfast": "Breakfast",
    "Expenses:Food:Brunch": "Brunch",
    "Expenses:Food:Coffee": "Coffee",
    "Expenses:Food:Dinner": "Dinner",
    "Expenses:Food:Lunch": "Lunch",
    "Expenses:Food:Snacks": "Snacks",
    "Expenses:Gifts:Camille": "Camille",
    "Expenses:Gifts:Dad": "Dad",
    "Expenses:Gifts:Etc": "Etc",
    "Expenses:Gifts:Jay": "Jay",
    "Expenses:Gifts:Kokoy": "Kokoy",
    "Expenses:Gifts:Mom": "Mom",
    "Expenses:Gifts:Rochelle": "Rochelle",
    "Expenses:Home:Electricity": "Electricity",
    "Expenses:Home:Furniture": "Furniture",
    "Expenses:Home:Groceries": "Groceries",
    "Expenses:Home:Insurance": "Insurance",
    "Expenses:Home:Mortgage": "Mortgage",
    "Expenses:Home:Phone:Mine": "Mine", // TODO: change the accountName
    "Expenses:Home:Phone:Mom": "Mom", // TODO: change the accountName
    "Expenses:Home:PropertyTax": "PropertyTax",
    "Expenses:Home:Strata": "Strata",
    "Expenses:Personal:Camera": "Camera",
    "Expenses:Personal:Clothes": "Clothes",
    "Expenses:Personal:Date": "Date",
    "Expenses:Personal:Fun": "Fun", // TODO: change the accountName
    "Expenses:Personal:Material": "Material", // TODO: change the accountName
    "Expenses:Personal:Necessary": "Necessary",
    "Expenses:Personal:ShitHappens": "ShitHappens",
    "Expenses:Personal:Taxes": "Taxes",
    "Expenses:Personal:Tech": "Tech",
    "Expenses:Personal:Toys": "Toys",
    "Expenses:Personal:Travel:Accommodations": "Accommodations",
    "Expenses:Personal:Travel:Flights": "Flights",
    "Expenses:Personal:Travel:PocketMoney": "PocketMoney",
    "Expenses:Personal:Travel:Toiletries": "Toiletries",
    "Expenses:Personal:Travel:Transit": "Transit",
    "Expenses:Personal:Travel:Wifi": "Wifi",
    "Expenses:Shared-Account": "Shared-Account",
    "Expenses:Transport:TransitPass": "TransitPass",
};

test("Test getAccountName", () => {
    Object.keys(accountMap).forEach((materializedPath) => {
        expect(getAccountName(materializedPath)).toBe(accountMap[materializedPath]);
    });
});

describe("test validatePath ", () => {
    test("for all known paths", () => {
        Object.keys(accountMap).forEach((materializedPath) => {
            expect(validatePath(materializedPath)).toBeTruthy();
        });
    });

    test("for all undesired paths", () => {
        expect(validatePath("")).toBeFalsy();
        expect(validatePath("materiali!zedPath")).toBeFalsy();
        expect(validatePath("materializ#edPath")).toBeFalsy();
        expect(validatePath("materiali@zedPath")).toBeFalsy();
        expect(validatePath(":materialize$dPath")).toBeFalsy();
        expect(validatePath(";materialize$dPath")).toBeFalsy();
        expect(validatePath("\materialize$dPath")).toBeFalsy();
        expect(validatePath("m/aterialize$dPath")).toBeFalsy();
        expect(validatePath("m/aterialize$dPath1")).toBeFalsy();
        expect(validatePath("m/aterialize$dPath:")).toBeFalsy();
    });
});
