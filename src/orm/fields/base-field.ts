import type { defaultValues } from "../field-factory";

interface BaseFieldType {
    type: string;
    isNotNull: boolean;
    default: defaultValues;
    primaryKey?: boolean;
}

export abstract class Field<T extends BaseFieldType> {
    protected config: T;

    constructor() {
        this.config = this.createBaseConfig();
    }

    protected abstract createBaseConfig(): T;

    public abstract primaryKey(): this;

    public notNull(): this {
        this.config.isNotNull = true;
        return this;
    }

    public default(value: defaultValues): this {
        this.config.default = value;
        return this;
    }

    public getConfig(): T {
        return this.config;
    }
}
