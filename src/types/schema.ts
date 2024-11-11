export type SchemaField = {
    type: string;
    attr?: string[];
};

export type Schema = {
    table: string;
    fields: Record<string, SchemaField>;
};
