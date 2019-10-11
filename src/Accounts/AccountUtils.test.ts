import {
    getAccountName,
    mapSanitizedAccountToAccountName,
    sanitizeAccountDescription,
} from "./AccountUtils";

const testAssetMap: {[key: string]: string} = {
    "7-ELEVEN STORE #37875 SURREY BC": "7-ELEVEN STORE",
    "ADOBE *PRODUCTS 8008336687 CA": "ADOBE *PRODUCTS",
    "AMATO GELATO CAFE VANCOUVER BC": "AMATO GELATO CAFE",
    "AMZN Mktp CA*K316I0K43 WWW.AMAZON.CAON": "AMZN Mktp WWW.AMAZON.CAON",
    "APL*ITUNES.COM/BILL 866-712-7753 ON": "APL*ITUNES.COM/BILL",
    "Audible CA*MO9HQ6X40 Amzn.com/billNJ": "Audible Amzn.com/billNJ",
    "BEST BUY #961 SURREY BC": "BEST BUY",
    "BISTRO SAKANA JAPANESE VANCOUVER BC": "BISTRO SAKANA JAPANESE",
    "BUBBLE WAFFLE CAFE VANCOUVER BC": "BUBBLE WAFFLE CAFE",
    "CDN TIRE STORE #00489 SURREY BC": "CDN TIRE STORE",
    "CHATIME SURREY BC": "CHATIME",
    "COMPASS AUTOLOAD 604-398-2042 BC": "COMPASS AUTOLOAD",
    "COSTCO WHOLESALE W51 BURNABY BC": "COSTCO WHOLESALE W51",
    "CRAFT BEER MARKET - VA VANCOUVER BC": "CRAFT BEER MARKET - VA",
    "DELICIOUS PHO VANCOUVER BC": "DELICIOUS PHO",
    "FALAFEL KING VANCOUVER BC": "FALAFEL KING",
    "FAMOUS PLAYER 1412QPS COQUITLAM BC": "FAMOUS PLAYER",
    "FIDO Mobile *696794023 888-481-3436 ON": "FIDO Mobile",
    "IKEA COQUITLAM COQUITLAM BC": "IKEA",
    "INDIGO 975 VANCOUVER BC": "INDIGO",
    "KITANOYA GUU GARDEN VANCOUVER BC": "KITANOYA GUU GARDEN",
    "LANDMARK 10 GUILDFORD SURREY BC": "LANDMARK 10 GUILDFORD",
    "LANDMARK WEB TICKETING 403-262-4255 AB": "LANDMARK WEB TICKETING",
    "MAN CAVE BARBER SHOP VANCOUVER BC": "MAN CAVE BARBER SHOP",
    "MCDONALD'S #40354 VANCOUVER BC": "MCDONALD'S",
    "NEW SZECHUAN RESTAURAN SURREY BC": "NEW SZECHUAN RESTAURAN",
    "OPA066-GUILDFORD TOWN SURREY BC": "OPA TOWN",
    "PAYMENT - THANK YOU / PAIEMENT - MERCI": "PAYMENT - THANK YOU / PAIEMENT - MERCI",
    "PETROCAN SURREY BC": "PETROCAN",
    "SIMON FRASER UNIVERSIT BURNABY BC": "SIMON FRASER UNIVERSIT",
    "STARBUCKS 04468 SURREY BC": "STARBUCKS",
    "STARBUCKS 04941 SURREY BC": "STARBUCKS",
    "STARBUCKS 21565 SURREY BC": "STARBUCKS",
    "T&T SUPERMARKET #003 VANCOUVER BC" : "T&T SUPERMARKET",
    "TACO TIME PACIFIC CENT VANCOUVER BC": "TACO TIME PACIFIC CENT",
    "THIRST FIRST REFRESHME VANCOUVER BC": "THIRST FIRST REFRESHME",
    "TIM HORTONS #3190 VANCOUVER BC": "TIM HORTONS",
    "TIM HORTONS #6868 SURREY BC": "TIM HORTONS",
    "TIM HORTONS Toronto ON": "TIM HORTONS",
    "VIRGIN MOBILE VERDUN QC": "VIRGIN MOBILE",
    "WAL*MART CANADA INC Mississauga ON": "WAL*MART CANADA INC",
    "WAL-MART #5838 SURREY BC": "WAL-MART",
    "YAH-YAH-YA VANCOUVER BC": "YAH-YAH-YA",
};

test("Test getAccountName", () => {
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
    Object.keys(accountMap).forEach((materializedPath) => {
        expect(getAccountName(materializedPath)).toBe(accountMap[materializedPath]);
    });
});

// Darn it... this is actually not account name, but transaction title.......
test("Test sanitizeAccountDescription for all known raw account name from RBC", () => {
    (Object.keys(testAssetMap) as string[]).forEach((rawAccountName: string) => {
        expect(sanitizeAccountDescription(rawAccountName)).toBe(testAssetMap[rawAccountName]);
    });
});

// Darn it... this is actually not account name, but transaction title.......
test("Test mapSanitizedAccountToAccountName for all known parsed account name from RBC", () => {
    (Object.values(testAssetMap) as string[]).forEach((parsedAccountName: string) => {
        // We simply assume that the map will return a hit when passing in a known account name
        expect(mapSanitizedAccountToAccountName(parsedAccountName)).toBeTruthy();
    });
});
