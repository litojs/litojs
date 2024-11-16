import type { defaultValues } from "../field-factory";
import { Field } from "./base-field";

export class TextField extends Field<{
    type: "text";
    isNotNull: boolean;
    default: defaultValues;
    primaryKey?: boolean;
}> {
    constructor() {
        super();
        this.config = { type: "text", isNotNull: false, default: "" };
    }

    protected createBaseConfig() {
        return this.config;
    }

    public primaryKey(): this {
        this.config.primaryKey = true;
        return this;
    }
}
