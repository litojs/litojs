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

// src/helper/response/response-creator.ts
var response_creator_exports = {};
__export(response_creator_exports, {
  createResponse: () => createResponse,
  view: () => view
});
module.exports = __toCommonJS(response_creator_exports);
function view(component, props) {
  const html = component(props).toString();
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8"
    }
  });
}
function createResponse(response, context, setCookies) {
  const headers = new Headers();
  if (response instanceof Response) {
    response.headers.forEach((value, key) => headers.set(key, value));
  } else if (typeof response === "object") {
    headers.set("Content-Type", "application/json");
    response = new Response(JSON.stringify(response), {
      status: context.status
    });
  } else if (typeof response === "string") {
    if (response.trim().startsWith("<") && response.trim().endsWith(">")) {
      headers.set("Content-Type", "text/html");
    } else {
      headers.set("Content-Type", "text/plain");
    }
    response = new Response(response, { status: context.status });
  } else {
    response = new Response(String(response), {
      status: context.status
    });
  }
  if (setCookies.length > 0) {
    headers.set("Set-Cookie", setCookies.join(", "));
  }
  return new Response(response.body, {
    status: context.status,
    headers
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createResponse,
  view
});
