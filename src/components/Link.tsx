interface LinkProps extends JSX.HtmlAnchorTag {
    children: JSX.Element;
    href: string;
}

export const Link = (props: LinkProps) => {
    return (
        <a href={props.href} hx-boost="true">
            {props.children}
        </a>
    );
};
