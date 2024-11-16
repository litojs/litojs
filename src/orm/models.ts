import { FieldFactory, type FieldFactoryMethods } from "./field-factory";
import { Query } from "./queries";

export class Models<T extends object> {
    private _name: string;
    private _fields: T;
    public query: Query<T>;

    constructor(name: string, fields: (col: FieldFactoryMethods) => T) {
        this._name = name;
        this._fields = fields(FieldFactory);
        this.query = new Query(name);
    }

    public get fields() {
        return this._fields;
    }
}
