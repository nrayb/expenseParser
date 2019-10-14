import { Account } from "../Accounts/Account";
import {
    getAccount,
    initializeAllAccounts,
} from "../Accounts/AccountStore";
import {
    inferAccount,
    parseDate,
} from "./TransactionParsingUtils";

test("Tets inferAccount for all known accoun", () => {
    // Limitation of this file, we need to initialize all the accounts
    initializeAllAccounts();
    const accountMap: { [key: string]: Account | undefined } = {
        "7-ELEVEN": getAccount("Expenses:Home:Groceries"),
        "ADOBE": getAccount("Expenses:Personal:Fun"),
        "AMATO GELATO CAFE": getAccount("Expenses:Food:Snacks"),
        "AMAZON": getAccount("Expenses:Personal:Material"),
        "APPLE": getAccount("Expenses:Personal:Tech"),
        "AUDIBLE": getAccount("Expenses:Personal:Fun"),
        "BEST BUY": getAccount("Expenses:Personal:Tech"),
        "BISTRO SAKANA": getAccount("Expenses:Food:Lunch"),
        "BUBBLE WAFFLE": getAccount("Expenses:Food:Lunch"),
        "CANADIAN TIRE": getAccount("Expenses:Home:Groceries"),
        "CHATIME": getAccount("Expenses:Food:Snacks"),
        "CINEPLEX": getAccount("Expenses:Personal:Fun"),
        "COSTCO": getAccount("Expenses:Home:Groceries"),
        "CRAFT BEER MARKET": getAccount("Expenses:Food:Lunch"),
        "DELICIOUS PHO": getAccount("Expenses:Food:Lunch"),
        "FALAFEL KING": getAccount("Expenses:Food:Lunch"),
        "FIDO": getAccount("Expenses:Home:Phone:Mine"),
        "GUU GARDEN": getAccount("Expenses:Food:Lunch"),
        "IKEA": getAccount("Expenses:Home:Furniture"),
        "ITUNES": getAccount("Expenses:Personal:Necessary"),
        "LANDMARK": getAccount("Expenses:Personal:Fun"),
        "MAN CAVE": getAccount("Expenses:Personal:Necessary"),
        "MCDONALDS": getAccount("Expenses:Food:Breakfast"),
        "NEW SZECHUAN RESTAURANT": getAccount("Expenses:Food:Dinner"),
        "OPA": getAccount("Expenses:Food:Dinner"),
        "PETROCAN": getAccount("Expenses:Car:Gas"),
        "RBC MASTERCARD": getAccount("Assets:CA:RBC:Chequing"),
        "STARBUCKS": getAccount("Expenses:Food:Coffee"),
        "T&T": getAccount("Expenses:Home:Groceries"),
        "TACO TIME": getAccount("Expenses:Food:Lunch"),
        "TIM HORTONS": getAccount("Expenses:Food:Breakfast"),
        "TRANSLINK": getAccount("Expenses:Transport:TransitPass"),
        "VIRGIN MOBILE": getAccount("Expenses:Home:Phone:Mom"),
        "WALMART": getAccount("Expenses:Home:Groceries"),
        "WORK": getAccount("Expenses:Food:Snacks"),
        "YAH-YAH-YA": getAccount("Expenses:Food:Lunch"),

        "MASTERCARD": getAccount("Liabilities:CA:RBC:MasterCard"),
    };
    Object.keys(accountMap).forEach((accountName) => {
        expect(inferAccount(accountName)).toBe(accountMap[accountName]);
    });
});

test("Tets parseDate for format from RBC", () => {
    // From RBC
    let date = parseDate("9/22/2019");
    expect(date.getDate()).toBe(22);
    expect(date.getMonth()).toBe(8);
    expect(date.getFullYear()).toBe(2019);

    date = parseDate("12/1/2019");
    expect(date.getDate()).toBe(1);
    expect(date.getMonth()).toBe(11);
    expect(date.getFullYear()).toBe(2019);

    date = parseDate("12/22/2019");
    expect(date.getDate()).toBe(22);
    expect(date.getMonth()).toBe(11);
    expect(date.getFullYear()).toBe(2019);

    date = parseDate("9/1/2019");
    expect(date.getDate()).toBe(1);
    expect(date.getMonth()).toBe(8);
    expect(date.getFullYear()).toBe(2019);

    date = parseDate("1/2/2019");
    expect(date.getDate()).toBe(2);
    expect(date.getMonth()).toBe(0);
    expect(date.getFullYear()).toBe(2019);
});
