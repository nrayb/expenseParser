// TODO: Consider moving this out into it's own package.
// This is going to be needed/convinient for the actual front end, so sharing the same
// DataModel for transactions and accounts may probe to be usefull.
// This may be useful to the following components I want to build:
//  - Parser (this package)
//  - Validator (compared my beancount file to the generated one from csv)
//  - Front end
import { TransactionLine } from "./TransactionLine";

// Whatever this interface is likely how we'll keep it in the DB. so think this through
export interface ITransactionPayload {
    date: Date;
    name: string;
    description: string;

    // TODO: I KNOWWWWW don't use sourceAccount and targetAccount, instead we just have this
    // Think about this though, since we can't store arrays in a table. does it make sense to have
    // to create a separate table for transaction lines? Is there a better way of doing it?
    //      - Doing this in this pattern gives the responsibility away from the transaction
    //      - I think this actually makes more sense since the "parser" component of this
    //          project should be the one taking care of all this logic.
    transactionLines: TransactionLine[];
}

// TODO: Think of how this model will be stored in a table
export class Transaction {
    public date: Date;
    public name: string;
    public description: string;
    public tags: string[] = [];
    public transactionLines: TransactionLine[];
    constructor({
        date,
        name,
        description,
        transactionLines,
    }: ITransactionPayload) {
        this.date = date;
        this.name = name;
        this.description = description;
        this.transactionLines = transactionLines;
    }
}
