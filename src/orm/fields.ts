/* eslint-disable @typescript-eslint/no-explicit-any */
interface FieldType {
    type: string;
    isNotNull: boolean;
    default: any;
    primaryKey: boolean;
}

export class Field {
    private config: FieldType;

    constructor() {
        this.config = {
            type: "",
            isNotNull: false,
            default: null,
            primaryKey: false,
        };
    }

    text() {
        this.config = { ...this.config, type: "text", isNotNull: false };
        return this;
    }

    integer() {
        this.config = { ...this.config, type: "integer", isNotNull: false };
        return this;
    }

    boolean() {
        this.config = { ...this.config, type: "boolean", isNotNull: false };
        return this;
    }

    primaryKey() {
        const lastKey = Object.keys(this.config).pop();
        if (lastKey) {
            this.config = { ...this.config, primaryKey: true };
        }
        return this;
    }

    notNull() {
        const lastKey = Object.keys(this.config).pop();
        if (lastKey) {
            this.config = { ...this.config, isNotNull: true };
        }
        return this;
    }

    default(value: any) {
        const lastKey = Object.keys(this.config).pop();
        if (lastKey) {
            this.config = { ...this.config, default: value };
        }
        return this;
    }

    getConfig() {
        return this.config;
    }
}
