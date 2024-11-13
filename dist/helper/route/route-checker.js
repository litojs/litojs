// src/helper/route/route-checker.ts
function checkForRouteConflicts(routes) {
  const conflicts = [];
  const dynamicRoutePattern = /^\/:[^/]+$/;
  for (let i = 0; i < routes.length; i++) {
    const routeA = routes[i];
    if (dynamicRoutePattern.test(routeA.path)) {
      for (let j = 0; j < routes.length; j++) {
        if (i === j) continue;
        const routeB = routes[j];
        const routeBPattern = new RegExp(`^${routeA.path.replace(/:[^/]+/, "[^/]+")}$`);
        if (routeBPattern.test(routeB.path)) {
          conflicts.push(routeA.path);
          break;
        }
      }
    }
  }
  return conflicts;
}
function suggestPrefixForConflicts(conflicts) {
  if (conflicts.length > 0) {
    return `Conflicting routes found: ${conflicts.join(", ")}. Consider using a prefix to avoid conflicts.`;
  }
  return "";
}
export {
  checkForRouteConflicts,
  suggestPrefixForConflicts
};
