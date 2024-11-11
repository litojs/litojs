export function routeMatch(routePattern: string, pathname: string) {
    const regex = new RegExp(`^${routePattern}/?$`);
    const match = pathname.match(regex);

    return match;
}
