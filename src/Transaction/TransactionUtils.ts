// TODO: Move this file away from transactionUtils.
//      - This is more of a parser util and will not live in the transaction component

// TODO: This would be nice if we could expose this to the user.
// This should be something that can be configured in the user side.
// We should re-implement this to live somewhere else (i.e. S3, or maybe google drive)
const RBC_ACCOUNT_MAPPING: { [key: string]: string } = {
    "7-ELEVEN STORE": "7-ELEVEN",
    "ADOBE *PRODUCTS": "ADOBE",
    "AMATO GELATO CAFE": "AMATO GELATO CAFE",
    "AMZN MKTP": "AMAZON",
    "AMZN MKTP WWW.AMAZON.CAON": "AMAZON",
    "APL*ITUNES.COM/BILL": "ITUNES",
    "AUDIBLE AMZN.COM/BILLNJ": "AUDIBLE",
    "BEST BUY": "BEST BUY",
    "BISTRO SAKANA JAPANESE": "BISTRO SAKANA",
    "BUBBLE WAFFLE CAFE": "BUBBLE WAFFLE",
    "CDN TIRE STORE": "CANADIAN TIRE",
    "CHATIME": "CHATIME",
    "COMPASS AUTOLOAD": "TRANSLINK",
    "COSTCO WHOLESALE W51": "COSTCO",
    "CRAFT BEER MARKET - VA": "CRAFT BEER MARKET",
    "DELICIOUS PHO": "DELICIOUS PHO",
    "FALAFEL KING": "FALAFEL KING",
    "FAMOUS PLAYER": "CINEPLEX",
    "FIDO MOBILE": "FIDO",
    "GONG CHA": "GONG CHA",
    "HYDRO BILL PMT": "BCHYDRO",
    "IKEA": "IKEA",
    "INDIGO": "CHAPTERS",
    "KITANOYA GUU GARDEN": "GUU GARDEN",
    "LANDMARK 10 GUILDFORD": "LANDMARK",
    "LANDMARK WEB TICKETING": "LANDMARK",
    "MAN CAVE BARBER SHOP": "MAN CAVE",
    "MCDONALD'S": "MCDONALDS",
    "NEW SZECHUAN RESTAURAN": "NEW SZECHUAN RESTAURANT",
    "OPA TOWN": "OPA",
    "PAYMENT - THANK YOU / PAIEMENT - MERCI": "RBC MASTERCARD",
    "PETROCAN": "PETROCAN",
    "SIMON FRASER UNIVERSIT": "SFU",
    "STARBUCKS": "STARBUCKS",
    "T&T SUPERMARKET": "T&T",
    "TACO TIME PACIFIC CENT": "TACO TIME",
    "THIRST FIRST REFRESHME": "WORK",
    "TIM HORTONS": "TIM HORTONS",
    "VIRGIN MOBILE": "VIRGIN MOBILE",
    "WAL*MART CANADA INC": "WALMART",
    "WAL-MART": "WALMART",
    "YAH-YAH-YA": "YAH-YAH-YA",
};

// Wait.... does this live in this file?
export function sanitizeAccountName(account: string): string {
    // This logic can be expensive, so this would be a good candidate for memoization
    return account.replace(/\s?\(?\d{3}\)?(?:-|\*|\s)?\d{3}(?:-|\*|\s)\d{4}/, "") // Removes phone numbers
        .split(/\s?(?<!\S)(?:AB|BC|ON|QC|CA)(?!\S)/i).join("") // Replaces all instances of Provinces
        .split(/\s?(?:BURNABY|COQUITLAM|SURREY|VANCOUVER|RICHMOND|TORONTO|VERDUN|MISSISSAUGA)/i).join("")
        .split(/\s?CA\*\S*/i).join("") // AUDIBLE
        .replace(/\s?#?\*?\d{3,}\S*/, "") // Usually represents store/transaction numbers
        .replace("Contactless Interac purchase - ", "") // RBC strings
        .replace("Online Banking Interac purchase - ", ""); // RBC strings
        // TODO: We need to trim spaces in the end
}

// I don't like this function as is.
// Right now it's not very helpful, but I wrote a function anyways to facilitate future features.
// TODO: Move the mapping somewhere else (e.x. S3, or Google Drive)
//      - It doesn't make sense for the parsing library to host the mapping
export function mapSanitizedAccountToAccountName(account: string): string | undefined {
    return RBC_ACCOUNT_MAPPING[account.toUpperCase()];
}

export function inferAccountPath(transactionName: string): string {
    const accountPathMap: {[key: string]: string} = {
        "7-ELEVEN": "Expenses:Home:Groceries",
        "ADOBE": "Expenses:Personal:Fun",
        "AMATO GELATO CAFE": "Expenses:Food:Snacks",
        "AMAZON": "Expenses:Personal:Material",
        "APPLE": "Expenses:Personal:Tech",
        "AUDIBLE": "Expenses:Personal:Fun",
        "BEST BUY": "Expenses:Personal:Tech",
        "BISTRO SAKANA": "Expenses:Food:Lunch",
        "BUBBLE WAFFLE": "Expenses:Food:Lunch",
        "CANADIAN TIRE": "Expenses:Home:Groceries",
        "CHAPTERS": "Expenses:Personal:Material",
        "CHATIME": "Expenses:Food:Snacks",
        "CINEPLEX": "Expenses:Personal:Fun",
        "COSTCO": "Expenses:Home:Groceries",
        "CRAFT BEER MARKET": "Expenses:Food:Lunch",
        "DELICIOUS PHO": "Expenses:Food:Lunch",
        "FALAFEL KING": "Expenses:Food:Lunch",
        "FIDO": "Expenses:Home:Phone:Mine",
        "GUU GARDEN": "Expenses:Food:Lunch",
        "IKEA": "Expenses:Home:Furniture",
        "ITUNES": "Expenses:Personal:Necessary",
        "LANDMARK": "Expenses:Personal:Fun",
        "MAN CAVE": "Expenses:Personal:Necessary",
        "MCDONALDS": "Expenses:Food:Breakfast",
        "NEW SZECHUAN RESTAURANT": "Expenses:Food:Dinner",
        "OPA": "Expenses:Food:Dinner",
        "PETROCAN": "Expenses:Car:Gas",
        "RBC MASTERCARD": "Assets:CA:RBC:Chequing",
        "SFU": "Expenses:Personal:Necessary",
        "STARBUCKS": "Expenses:Food:Coffee",
        "T&T": "Expenses:Home:Groceries",
        "TACO TIME": "Expenses:Food:Lunch",
        "TIM HORTONS": "Expenses:Food:Breakfast",
        "TRANSLINK": "Expenses:Transport:TransitPass",
        "VIRGIN MOBILE": "Expenses:Home:Phone:Mom",
        "WALMART": "Expenses:Home:Groceries",
        "WORK": "Expenses:Food:Snacks",
        "YAH-YAH-YA": "Expenses:Food:Lunch",

        "MASTERCARD": "Liabilities:CA:RBC:MasterCard",
    };
    return accountPathMap[transactionName];
}
