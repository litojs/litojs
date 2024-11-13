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

// src/helper/cookies/cookie-stringify.ts
var cookie_stringify_exports = {};
__export(cookie_stringify_exports, {
  cookieStringify: () => cookieStringify
});
module.exports = __toCommonJS(cookie_stringify_exports);
function cookieStringify(key, value, options = {}) {
  let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  if (options.maxAge !== void 0) {
    cookieString += `; Max-Age=${options.maxAge}`;
  }
  if (options.domain) {
    cookieString += `; Domain=${options.domain}`;
  }
  if (options.path) {
    cookieString += `; Path=${options.path}`;
  }
  if (options.expires) {
    cookieString += `; Expires=${options.expires.toUTCString()}`;
  }
  if (options.secure) {
    cookieString += `; Secure`;
  }
  if (options.httpOnly) {
    cookieString += `; HttpOnly`;
  }
  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }
  return cookieString;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cookieStringify
});
