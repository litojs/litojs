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

// src/helper/cookies/cookie-parser.ts
var cookie_parser_exports = {};
__export(cookie_parser_exports, {
  cookieParser: () => cookieParser
});
module.exports = __toCommonJS(cookie_parser_exports);
function cookieParser(cookieString) {
  const cookies = {};
  cookieString.split(";").forEach((cookie) => {
    const parts = cookie.split(";").map((item) => item.trim());
    const [nameValue, ...attributes] = parts;
    const [name, value] = nameValue.split("=").map((item) => item.trim());
    if (name) {
      const cookie2 = {
        name: decodeURIComponent(name),
        value: decodeURIComponent(value || ""),
        httpOnly: false,
        secure: false
      };
      attributes.forEach((attribute) => {
        const [attrName, attrValue] = attribute.split("=").map((item) => item.trim().toLowerCase());
        switch (attrName) {
          case "httponly":
            cookie2.httpOnly = true;
            break;
          case "secure":
            cookie2.secure = true;
            break;
          case "path":
            cookie2.path = attrValue;
            break;
          case "domain":
            cookie2.domain = attrValue;
            break;
          case "expires":
            cookie2.expires = new Date(attrValue);
            break;
          case "samesite":
            cookie2.sameSite = attrValue;
            break;
        }
      });
      cookies[cookie2.name] = cookie2;
    }
  });
  return cookies;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cookieParser
});
