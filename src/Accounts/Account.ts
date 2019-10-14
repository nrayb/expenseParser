import { getAccountName } from "./AccountUtils";

// This interface is likely going to be exactly how we store it in the DB.
// I've chosen to follow the "Materialized Path" pattern to store the hierarchy
// https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-materialized-paths/
export interface IAccountPayload {
    children?: Account[];
    currency?: string;
    isOpen?: boolean;
    materializedPath: string;
}

export class Account {
    public accountName: string;
    public children: Account[] = [];
    public currency: string = "CAD";
    public parent: Account;
    public materializedPath: string;

    constructor({ materializedPath }: IAccountPayload) {
        this.materializedPath = materializedPath;
        this.accountName = getAccountName(materializedPath);
    }
}
