describe("AccountStore tests. ", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test("Test initializeAccount for invalid account path", () => {
        const { getAccount, getAllAccounts, initializeAccount } = require("./AccountStore");
        expect(initializeAccount({ materializedPath: "" })).toBeFalsy();
        expect(initializeAccount({ materializedPath: "TOD!!O" })).toBeFalsy();
        expect(initializeAccount({ materializedPath: ":" })).toBeFalsy();
        expect(initializeAccount({ materializedPath: ":test" })).toBeFalsy();
        expect(initializeAccount({ materializedPath: "test:account:" })).toBeFalsy();
        expect(getAllAccounts().length).toBe(0);
    });

    test("Test initializeAccount for account with no parent", () => {
        const { getAccount, getAllAccounts, initializeAccount } = require("./AccountStore");
        initializeAccount({ materializedPath: "TODO" });
        const todoAccount = getAccount("TODO");
        expect(todoAccount).toBeTruthy();
        expect(todoAccount.parent).toBeFalsy();
        expect(todoAccount.children).toEqual([]);
        expect(getAllAccounts().length).toEqual(1);
    });

    test("Test initializeAccount for account with a parent", () => {
        const { getAccount, getAllAccounts, initializeAccount } = require("./AccountStore");
        initializeAccount({ materializedPath: "Expenses:Shared-Account" });
        const account = getAccount("Expenses:Shared-Account");
        expect(account).toBeTruthy();
        expect(account.children).toEqual([]);

        const parent = getAccount("Expenses");
        expect(account.parent).toEqual(parent);
        expect(getAllAccounts().length).toEqual(2);
    });

    test("Test initializeAccount for account with ancestors", () => {
        const { getAccount, getAllAccounts, initializeAccount } = require("./AccountStore");
        initializeAccount({ materializedPath: "Expenses:Food:Breakfast" });

        const account = getAccount("Expenses:Food:Breakfast");
        expect(account).toBeTruthy();
        expect(account.children).toEqual([]);

        const parent = getAccount("Expenses:Food");
        expect(account.parent).toEqual(parent);

        const grandParent = getAccount("Expenses");
        expect(parent.parent).toEqual(grandParent);

        expect(getAllAccounts().length).toEqual(3);
    });

    test("Test initializeAccount for accounts with common ancestors", () => {
        const { getAccount, getAllAccounts, initializeAccount } = require("./AccountStore");

        initializeAccount({ materializedPath: "Expenses:Food:Lunch" });
        const lunchAccount = getAccount("Expenses:Food:Lunch");
        expect(lunchAccount).toBeTruthy();
        expect(lunchAccount.children).toEqual([]);

        initializeAccount({ materializedPath: "Expenses:Food:Breakfast" });
        const breakfastAccount = getAccount("Expenses:Food:Breakfast");
        expect(breakfastAccount).toBeTruthy();
        expect(breakfastAccount.children).toEqual([]);

        const foodAccount = getAccount("Expenses:Food");
        expect(lunchAccount.parent).toEqual(foodAccount);
        expect(breakfastAccount.parent).toEqual(foodAccount);
        expect(foodAccount.children.length).toEqual(2);
        expect(foodAccount.children.includes(lunchAccount)).toBeTruthy();
        expect(foodAccount.children.includes(breakfastAccount)).toBeTruthy();

        const expensesAccount = getAccount("Expenses");
        expect(foodAccount.parent).toEqual(expensesAccount);
        expect(expensesAccount.parent).toBeFalsy();
        expect(expensesAccount.children.length).toBe(1);
        expect(expensesAccount.children.includes(foodAccount)).toBeTruthy();

        expect(getAllAccounts().length).toEqual(4);
    });

    test("Test initializeAccount for accounts with uncommon ancestors", () => {
        const { getAccount, getAllAccounts, initializeAccount } = require("./AccountStore");

        initializeAccount({ materializedPath: "Expenses:Food:Lunch" });
        const lunchAccount = getAccount("Expenses:Food:Lunch");
        expect(lunchAccount).toBeTruthy();
        expect(lunchAccount.children).toEqual([]);

        initializeAccount({ materializedPath: "Todo:Test:Account" });
        const testAccount = getAccount("Todo:Test:Account");
        expect(testAccount).toBeTruthy();
        expect(testAccount.children).toEqual([]);

        const foodAccount = getAccount("Expenses:Food");
        expect(lunchAccount.parent).toEqual(foodAccount);
        expect(testAccount.parent).not.toEqual(foodAccount);
        expect(foodAccount.children.length).toEqual(1);
        expect(foodAccount.children.includes(lunchAccount)).toBeTruthy();
        expect(foodAccount.children.includes(testAccount)).toBeFalsy();

        const testParent = getAccount("Todo:Test");
        expect(lunchAccount.parent).not.toEqual(testParent);
        expect(testAccount.parent).toEqual(testParent);
        expect(testParent.children.length).toEqual(1);
        expect(testParent.children.includes(lunchAccount)).toBeFalsy();
        expect(testParent.children.includes(testAccount)).toBeTruthy();

        const expensesAccount = getAccount("Expenses");
        expect(foodAccount.parent).toEqual(expensesAccount);
        expect(expensesAccount.parent).toBeFalsy();
        expect(expensesAccount.children.length).toBe(1);
        expect(expensesAccount.children.includes(foodAccount)).toBeTruthy();
        expect(expensesAccount.children.includes(testParent)).toBeFalsy();

        const todoAccount = getAccount("Todo");
        expect(testParent.parent).toEqual(todoAccount);
        expect(todoAccount.parent).toBeFalsy();
        expect(todoAccount.children.length).toBe(1);
        expect(todoAccount.children.includes(testParent)).toBeTruthy();
        expect(todoAccount.children.includes(foodAccount)).toBeFalsy();

        expect(getAllAccounts().length).toEqual(6);
    });
});
