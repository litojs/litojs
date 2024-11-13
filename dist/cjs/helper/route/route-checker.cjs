"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/helper/route/route-checker.ts
var route_checker_exports = {};
__export(route_checker_exports, {
  checkForRouteConflicts: () => checkForRouteConflicts,
  suggestPrefixForConflicts: () => suggestPrefixForConflicts
});
module.exports = __toCommonJS(route_checker_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkForRouteConflicts,
  suggestPrefixForConflicts
});
