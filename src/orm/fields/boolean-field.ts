import type { defaultValues } from "../field-factory";
import { Field } from "./base-field";

export class BooleanField extends Field<{
    type: "boolean";
    isNotNull: boolean;
    default: defaultValues;
    primaryKey?: boolean;
}> {
    constructor() {
        super();
        this.config = { type: "boolean", isNotNull: false, default: null };
    }

    protected createBaseConfig() {
        return this.config;
    }

    public primaryKey(): this {
        this.config.primaryKey = true;
        return this;
    }
}
