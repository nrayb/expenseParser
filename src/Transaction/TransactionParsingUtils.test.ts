import { Account } from "../Accounts/Account";
import {
    getAccount,
    initializeAllAccounts,
} from "../Accounts/AccountStore";
import {
    inferAccount,
    inferTransactionName,
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

test("Tets inferTransactionName for known descriptions from RBC", () => {
    const testAssetMap: {[key: string]: string} = {
        "7-ELEVEN STORE #37875 SURREY BC": "7-ELEVEN",
        "ADOBE *PRODUCTS 8008336687 CA": "ADOBE",
        "AMATO GELATO CAFE VANCOUVER BC": "AMATO GELATO CAFE",
        "AMZN Mktp CA*K316I0K43 WWW.AMAZON.CAON": "AMAZON",
        "APL*ITUNES.COM/BILL 866-712-7753 ON": "ITUNES",
        "Audible CA*MO9HQ6X40 Amzn.com/billNJ": "AUDIBLE",
        "BEST BUY #961 SURREY BC": "BEST BUY",
        "BISTRO SAKANA JAPANESE VANCOUVER BC": "BISTRO SAKANA",
        "BUBBLE WAFFLE CAFE VANCOUVER BC": "BUBBLE WAFFLE",
        "CDN TIRE STORE #00489 SURREY BC": "CANADIAN TIRE",
        "CHATIME SURREY BC": "CHATIME",
        "COMPASS AUTOLOAD 604-398-2042 BC": "TRANSLINK",
        "COSTCO WHOLESALE W51 BURNABY BC": "COSTCO",
        "CRAFT BEER MARKET - VA VANCOUVER BC": "CRAFT BEER MARKET",
        "DELICIOUS PHO VANCOUVER BC": "DELICIOUS PHO",
        "FALAFEL KING VANCOUVER BC": "FALAFEL KING",
        "FAMOUS PLAYER 1412QPS COQUITLAM BC": "CINEPLEX",
        "FIDO Mobile *696794023 888-481-3436 ON": "FIDO",
        "IKEA COQUITLAM COQUITLAM BC": "IKEA",
        "INDIGO 975 VANCOUVER BC": "CHAPTERS",
        "KITANOYA GUU GARDEN VANCOUVER BC": "GUU GARDEN",
        "LANDMARK 10 GUILDFORD SURREY BC": "LANDMARK",
        "LANDMARK WEB TICKETING 403-262-4255 AB": "LANDMARK",
        "MAN CAVE BARBER SHOP VANCOUVER BC": "MAN CAVE",
        "MCDONALD'S #40354 VANCOUVER BC": "MCDONALDS",
        "NEW SZECHUAN RESTAURAN SURREY BC": "NEW SZECHUAN RESTAURANT",
        "OPA066-GUILDFORD TOWN SURREY BC": "OPA",
        "PAYMENT - THANK YOU / PAIEMENT - MERCI": "RBC MASTERCARD",
        "PETROCAN SURREY BC": "PETROCAN",
        "SIMON FRASER UNIVERSIT BURNABY BC": "SFU",
        "STARBUCKS 04468 SURREY BC": "STARBUCKS",
        "STARBUCKS 04941 SURREY BC": "STARBUCKS",
        "STARBUCKS 21565 SURREY BC": "STARBUCKS",
        "T&T SUPERMARKET #003 VANCOUVER BC" : "T&T",
        "TACO TIME PACIFIC CENT VANCOUVER BC": "TACO TIME",
        "THIRST FIRST REFRESHME VANCOUVER BC": "WORK",
        "TIM HORTONS #3190 VANCOUVER BC": "TIM HORTONS",
        "TIM HORTONS #6868 SURREY BC": "TIM HORTONS",
        "TIM HORTONS Toronto ON": "TIM HORTONS",
        "VIRGIN MOBILE VERDUN QC": "VIRGIN MOBILE",
        "WAL*MART CANADA INC Mississauga ON": "WALMART",
        "WAL-MART #5838 SURREY BC": "WALMART",
        "YAH-YAH-YA VANCOUVER BC": "YAH-YAH-YA",
    };
    Object.keys(testAssetMap).forEach((rawDescription) => {
        expect(inferTransactionName(rawDescription)).toBe(testAssetMap[rawDescription]);
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

    date = parseDate("1/12/2019");
    expect(date.getDate()).toBe(12);
    expect(date.getMonth()).toBe(0);
    expect(date.getFullYear()).toBe(2019);
});
