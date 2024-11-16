/* eslint-disable @typescript-eslint/no-explicit-any */
export class Field {
    private config: Record<string, any> = {};

    text() {
        this.config.type = "text";
        return this;
    }

    primaryKey() {
        this.config.primaryKey = true;
        return this;
    }

    default(value: any) {
        this.config.default = value;
        return this;
    }

    notNull() {
        this.config.notNull = true;
        return this;
    }

    integer() {
        this.config.type = "integer";
        return this;
    }

    boolean() {
        this.config.type = "boolean";
        return this;
    }

    protected getConfig() {
        return this.config;
    }
}
