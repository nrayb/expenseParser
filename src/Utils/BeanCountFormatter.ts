import { Transaction } from "../Transaction/Transaction";
import { TransactionLine } from "../Transaction/TransactionLine";
import { formatValue } from "./CurrencyFormatter";

export const MAX_NUMBER_OF_LINES = 56;

export function toBeanCountString(transaction: Transaction): string {
    const beanCountDate = formatDate(transaction.date);
    let output = `${beanCountDate} * "${transaction.name}" "${transaction.description}"`;
    // TODO: Add implementation for tags
    transaction.transactionLines.forEach((transactionLine) => {
        // TODO: Add some validation for the transaction line.
        output = output.concat(`\n${formatTransactionLine(transactionLine)}`);
    });
    return output;
}

export function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
}

export function formatTransactionLine(transactionLine: TransactionLine): string {
    const accountPath = transactionLine.account.materializedPath;
    const formattedValue = formatValue(transactionLine.value);
    const padding = MAX_NUMBER_OF_LINES - formattedValue.length - transactionLine.currency.length - 1 - 4;
    return `    ${accountPath.padEnd(padding)}${formattedValue} ${transactionLine.currency}`;
}
