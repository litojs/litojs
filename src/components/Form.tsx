interface FormProps extends JSX.HtmlFormTag {
    responseBehavior?: "insertLast" | "insertFirst" | "replace" | "default";
    method: "POST" | "PUT" | "DELETE" | "PATCH";
    target: string;
    url: string;
    children: JSX.Element | JSX.Element[];
}

const getHxSwapValue = (responseBehavior?: string) => {
    switch (responseBehavior) {
        case "insertLast":
            return "beforeend";
        case "insertFirst":
            return "afterbegin";
        case "replace":
            return "innerHTML";
        case "default":
        default:
            return "outerHTML";
    }
};

export const Form = (props: FormProps) => {
    const hxSwap = getHxSwapValue(props.responseBehavior);
    const hxMethod = `hx-${props.method.toLowerCase()}`;

    return (
        <form hx-boost="true" {...{ [hxMethod]: props.url }} hx-target={props.target} hx-swap={hxSwap}>
            {props.children}
        </form>
    );
};
