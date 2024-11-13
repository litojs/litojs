// src/helper/route/route-match.ts
function routeMatch(routePattern, pathname) {
  const regex = new RegExp(`^${routePattern}/?$`);
  const match = pathname.match(regex);
  return match;
}

// src/helper/route/route-normalizer.ts
function routeNormalizer(pathname) {
  return pathname.replace(/:\w+/g, (param) => {
    return `(?<${param.substring(1)}>[^/]+)`;
  });
}

// src/helper/route/route-matcher.ts
function routeMatcher(pathname, method, routes) {
  for (const route of routes) {
    const routePattern = routeNormalizer(route.path);
    const match = routeMatch(routePattern, pathname);
    if (match && route.method === method) {
      const params = match.groups;
      return { route, params };
    }
  }
  return {};
}
export {
  routeMatcher
};
