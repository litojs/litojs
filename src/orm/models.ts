import { Field } from "./fields";
import { Query } from "./queries";

export class Models<T extends object> {
    private _name: string;
    private _fields: T;
    public query: Query<T>;

    constructor(name: string, fields: (col: Field) => T) {
        this._name = name;
        this._fields = fields(new Field());
        this.query = new Query(name);
    }

    public get fields() {
        return this._fields;
    }
}

export const note = new Models("note", (col) => ({
    title: col.text().notNull(),
    content: col.text().notNull(),
    isDone: col.boolean().default(false),
}));

console.log(note.query.insert({ title: "Hello!" }));
