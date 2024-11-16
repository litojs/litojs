import { BooleanField } from "./fields/boolean-field";
import { IntegerField } from "./fields/integer-field";
import { TextField } from "./fields/text-field";

export type defaultValues = "cuid" | "uuid" | "timestamp" | "now" | "null" | "true" | "false" | string | number | null;

export type FieldFactoryMethods = {
    text: () => TextField;
    integer: () => IntegerField;
    boolean: () => BooleanField;
};

export class FieldFactory {
    public static text(): TextField {
        return new TextField();
    }

    public static integer(): IntegerField {
        return new IntegerField();
    }

    public static boolean(): BooleanField {
        return new BooleanField();
    }
}
