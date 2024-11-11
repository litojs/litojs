export function routeNormalizer(pathname: string) {
    return pathname.replace(/:\w+/g, (param) => {
        return `(?<${param.substring(1)}>[^/]+)`;
    });
}
