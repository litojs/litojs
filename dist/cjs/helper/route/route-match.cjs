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

// src/helper/route/route-match.ts
var route_match_exports = {};
__export(route_match_exports, {
  routeMatch: () => routeMatch
});
module.exports = __toCommonJS(route_match_exports);
function routeMatch(routePattern, pathname) {
  const regex = new RegExp(`^${routePattern}/?$`);
  const match = pathname.match(regex);
  return match;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routeMatch
});
