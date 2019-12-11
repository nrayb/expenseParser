import { Account } from "../Accounts/Account";
import { initializeAccount } from "../Accounts/AccountStore";
import { Transaction } from "../Transaction/Transaction";
import { TransactionLine } from "../Transaction/TransactionLine";
import {
    formatDate,
    formatTransactionLine,
    MAX_NUMBER_OF_LINES,
    toBeanCountString
} from "./BeanCountFormatter";

beforeAll(() => {
    initializeAccount({ materializedPath: "Expenses:Food:Breakfast" });
    initializeAccount({ materializedPath: "Liabilities:CA:RBC:MasterCard" });
});

describe("formatDate", () => {
    test("valid dates from RBC", () => {
        expect(formatDate(new Date("01/8/2019"))).toBe("2019-01-08");
        expect(formatDate(new Date("01/12/2019"))).toBe("2019-01-12");
        expect(formatDate(new Date("1/6/2019"))).toBe("2019-01-06");
        expect(formatDate(new Date("1/12/2019"))).toBe("2019-01-12");
        expect(formatDate(new Date("1/31/2019"))).toBe("2019-01-31");
        expect(formatDate(new Date("8/1/2019"))).toBe("2019-08-01");
        expect(formatDate(new Date("8/29/2019"))).toBe("2019-08-29");
    });

    test("Invalid parameters", () => {
        expect(() => { formatDate(null as any); }).toThrow();
        expect(() => { formatDate(undefined as any); }).toThrow();
    });
});

describe("formatTransactionLine", () => {
    let account: Account;
    let transactionLine: TransactionLine;
    let formattedTransactionLine: string;

    beforeAll(() => {
        account = new Account({ materializedPath: "Expenses:Food:Breakfast" });
        transactionLine = new TransactionLine({
            account,
            currency: "CAD",
            value: 100,
        });
        formattedTransactionLine = formatTransactionLine(transactionLine);
    });

    test("max length", () => {
        // Expect the length to be defined.
        expect(formattedTransactionLine.length).toBe(MAX_NUMBER_OF_LINES);
    });

    test("tab space", () => {
        // First 4 characters should be spaces (length of a tab)
        expect((formattedTransactionLine.substring(0, 4).match(/ /g) || []).length).toBe(4);
    });

    test("account name placed after tab, and preceeded with a space", () => {
        // Expect the materialized path to be outputted as the account name displayed
        expect((formattedTransactionLine.match(/(?<=    )[A-Za-z:]*(?= )/) || [])[0]).toBe(account.materializedPath);
    });

    test("currency in end of string", () => {
        // Expect to end with the currency
        expect(formattedTransactionLine.substring(formattedTransactionLine.length - 3)).toBe(transactionLine.currency);
    });
});

// hmmmm I realize after writing a test for this that my data-structure might be a little too complicated
// just to test this one function, I had to mock 3 different classes....
// To be fair this is almost at the end of the integration portion, but this atleast
// points to some potential scalability issue for testing.
// TODO: Look into improving this
test("Test formatValue with default parameters", () => {
    const date = new Date("01/8/2019");
    const transactionLine1 = new TransactionLine({
        account: new Account({ materializedPath: "Liabilities:CA:RBC:MasterCard" }),
        currency: "CAD",
        value: -100,
    });
    const transactionLine2 = new TransactionLine({
        account: new Account({ materializedPath: "Expenses:Food:Breakfast" }),
        currency: "CAD",
        value: 100,
    });
    const transaction = new Transaction({
        date,
        description: "",
        name: "RBC",
        transactionLines: [ transactionLine1, transactionLine2 ],
    });
    const beancountString = toBeanCountString(transaction);
    const stringLines = beancountString.split(/\n/g) || [];

    // Expect to have one line break per transactionLine
    expect(stringLines.length).toBe(transaction.transactionLines.length + 1);

    // Expect the transaction lines to be layed out sequentially based on index
    expect(stringLines[1]).toBe(formatTransactionLine(transactionLine1));
    expect(stringLines[2]).toBe(formatTransactionLine(transactionLine2));

    // Expect the transaction to begic with the date
    expect(beancountString.substring(0, 10)).toBe(formatDate(date));

    // Expect the transaction name to be present
    expect(beancountString.includes(transaction.name)).toBeTruthy();

    // Expect the transaction description to be present
    expect(beancountString.includes(transaction.description)).toBeTruthy();

    // TODO: add limit testing on really long names

    // TODO: add limit testing on really long descriptions
    // We should probably limit the description to a specific length.
});
