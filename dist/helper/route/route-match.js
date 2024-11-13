// src/helper/route/route-match.ts
function routeMatch(routePattern, pathname) {
  const regex = new RegExp(`^${routePattern}/?$`);
  const match = pathname.match(regex);
  return match;
}
export {
  routeMatch
};
