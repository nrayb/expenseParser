import { getAccount } from "./AccountStore";

// This interface is likely going to be exactly how we store it in the DB.
// I've chosen to follow the "Materialized Path" pattern to store the hierarchy
// https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-materialized-paths/
export interface IAccountPayload {
    accountName: string;
    children?: Account[];
    currency?: string;
    materializedPath: string;
}

export class Account {
    public children: Account[] = [];
    public parent: Account;
    private accountName: string;
    private currency: string = "CAD";
    private materializedPath: string;

    constructor({ accountName, materializedPath }: IAccountPayload) {
        this.accountName = accountName;
        this.materializedPath = materializedPath;
        const splitPath = materializedPath.split(":");
        const parentAccountName = splitPath[splitPath.length - 2]; // I don't like this too much... not very fool-proof
        if (parentAccountName) {
            this.parent = getAccount(parentAccountName);
            this.parent.children.push(this);
        }
    }

    public toBeanCountString(): string {
        return this.materializedPath;
        // const prefix = this.parent ? this.parent.toBeanCountString() : this.type.toString();
        // return `${prefix}${":"}${this.accountName.toUpperCase()}`;
    }
}