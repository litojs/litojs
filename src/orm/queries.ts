/* eslint-disable @typescript-eslint/no-explicit-any */
export class Query<T extends object> {
    private _table: string;
    private query: string;
    private queryParams: any[];

    constructor(table: string) {
        this._table = table;
        this.query = "";
        this.queryParams = [];
    }

    private buildInsert(data: Partial<T>) {
        const columns = Object.keys(data).join(", ");
        const placeholders = Object.values(data)
            .map(() => "?")
            .join(", ");
        this.query = `INSERT INTO ${this._table} (${columns}) VALUES (${placeholders})`;
        this.queryParams = Object.values(data);
        return this;
    }

    private buildUpdate(data: Partial<T>, filters: Partial<Record<keyof T, any>>) {
        const set = this.buildSetClause(data);
        const conditions = this.buildWhereClause(filters);
        this.query = `UPDATE ${this._table} SET ${set} WHERE ${conditions}`;
        this.queryParams = [...Object.values(data), ...Object.values(filters)];
        return this;
    }

    private buildDelete(filters: Partial<Record<keyof T, any>>) {
        const conditions = this.buildWhereClause(filters);
        this.query = `DELETE FROM ${this._table} WHERE ${conditions}`;
        this.queryParams = Object.values(filters);
        return this;
    }

    private buildSelect(isAll: boolean, filters?: Partial<Record<keyof T, any>>) {
        const selectClause = isAll ? `SELECT *` : `SELECT * LIMIT 1`;
        this.query = filters
            ? `${selectClause} FROM ${this._table} WHERE ${this.buildWhereClause(filters)}`
            : `${selectClause} FROM ${this._table}`;
        this.queryParams = filters ? Object.values(filters) : [];
        return this;
    }

    private buildSetClause(data: Partial<T>): string {
        return Object.keys(data)
            .map((key) => `${key} = ?`)
            .join(", ");
    }

    private buildWhereClause(filters: Partial<Record<keyof T, any>>): string {
        return Object.keys(filters)
            .map((key) => {
                this.queryParams.push(filters[key as keyof T]);
                return `${key} = ?`;
            })
            .join(" AND ");
    }

    public insert(data: Partial<Record<keyof T, any>>) {
        return this.buildInsert(data);
    }

    public update(data: Partial<Record<keyof T, any>>, filters: Partial<Record<keyof T, any>>) {
        return this.buildUpdate(data, filters);
    }

    public delete(filters: Partial<Record<keyof T, any>>) {
        return this.buildDelete(filters);
    }

    public all() {
        return this.buildSelect(true);
    }

    public get(filters: Partial<Record<keyof T, any>>) {
        return this.buildSelect(false, filters);
    }

    public orderBy(column: keyof T, direction: "ASC" | "DESC" = "ASC") {
        this.query += ` ORDER BY ${String(column)} ${direction}`;
        return this;
    }

    public groupBy(column: keyof T) {
        this.query += ` GROUP BY ${String(column)}`;
        return this;
    }

    public join(table: string, on: string, type: "INNER" | "LEFT" = "INNER") {
        this.query += ` ${type} JOIN ${table} ON ${on}`;
        return this;
    }

    public limit(count: number) {
        this.query += ` LIMIT ${count}`;
        return this;
    }

    public getQuery() {
        return { query: this.query, params: this.queryParams };
    }
}
