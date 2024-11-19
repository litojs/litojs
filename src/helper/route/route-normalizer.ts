/**
 *
 *
 * Normalizes a route pathname by converting dynamic segments into regex pattern strings.
 *
 * This function takes a pathname containing dynamic parameters denoted by a colon
 * (e.g., `/:userId`) and replaces these segments with a named capture group that can
 * be used for routing in a server context.
 *
 * @param pathname - The pathname string to normalize for routing.
 * @returns A normalized pathname string suitable for regex matching.
 *
 */
export function routeNormalizer(pathname: string) {
    return pathname.replace(/:\w+/g, (param) => {
        return `(?<${param.substring(1)}>[^/]+)`;
    });
}
