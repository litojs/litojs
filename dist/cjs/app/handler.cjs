"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app/handler.ts
var handler_exports = {};
__export(handler_exports, {
  LitoHandler: () => LitoHandler
});
module.exports = __toCommonJS(handler_exports);

// src/helper/cookies/cookie-parser.ts
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

// src/helper/cookies/cookie-stringify.ts
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

// src/helper/context/context-creator.ts
function createContext(request, routes) {
  const { pathname, searchParams } = new URL(request.url);
  const { method } = request;
  const { route, params } = routeMatcher(pathname, method, routes);
  const query = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  const cookies = cookieParser(request.headers.get("cookie") || "");
  const setCookies = [];
  const context = {
    user: null,
    params: {},
    headers: request.headers,
    url: request.url,
    path: pathname,
    status: 200,
    query,
    cookies,
    cookie: {
      get: (key) => cookies[key],
      set: (key, value, options = {}) => {
        const cookieString = cookieStringify(key, value, options);
        setCookies.push(cookieString);
      },
      delete: (key) => {
        const cookieString = cookieStringify(key, "", { maxAge: -1 });
        setCookies.push(cookieString);
      }
    }
  };
  if (params) {
    context.params = params;
  }
  return { route, context, setCookies };
}

// src/helper/response/response-creator.ts
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

// src/helper/route/route-creator.ts
function routeCreator(method, path, handler) {
  return {
    method,
    path,
    handler
  };
}

// src/helper/utils/logger.ts
var import_chalk = __toESM(require("chalk"), 1);
var Logger = class {
  static log(message, error) {
    console.log(message, error ?? "");
  }
  static info(message, error) {
    console.log(import_chalk.default.blue(message), error);
  }
  static warn(message, error) {
    console.log(import_chalk.default.yellow(message), error ?? "");
  }
  static success(message, error) {
    console.log(import_chalk.default.green(message), error ?? "");
  }
  static error(message, error) {
    console.log(import_chalk.default.red(message), error ?? "");
  }
};

// src/app/handler.ts
var LitoHandler = class {
  lito;
  constructor(lito) {
    this.lito = lito;
  }
  // ? ------------------------------------------------------------
  // ? Handler Methods --------------------------------------------
  // ? ------------------------------------------------------------
  handleResponse(response, context, setCookies) {
    return createResponse(response, context, setCookies);
  }
  // ? ------------------------------------------------------------
  // ? Public Methods ---------------------------------------------
  // ? ------------------------------------------------------------
  async handleRequest(request) {
    const { route, context, setCookies } = createContext(request, this.lito.routes);
    const startTimer = process.hrtime();
    if (route) {
      let response;
      try {
        response = await route.handler(context);
      } catch (error) {
        const err = error;
        return new Response(err.message, { status: 500 });
      }
      const endTimer2 = process.hrtime(startTimer);
      const elapsedTime2 = (endTimer2[0] * 1e9 + endTimer2[1]) / 1e6;
      Logger.log(
        `INFO: [${request.method}]:[${context.status}] ${context.path} - Time: ${elapsedTime2.toFixed(3)}ms`
      );
      return this.handleResponse(response, context, setCookies);
    }
    const endTimer = process.hrtime(startTimer);
    const elapsedTime = (endTimer[0] * 1e9 + endTimer[1]) / 1e6;
    Logger.warn(`WARN: [${request.method}]:[404] ${context.path} - Time: ${elapsedTime.toFixed(3)}ms`);
    return new Response("Route not found", { status: 404 });
  }
  addRoute(method, path, handler) {
    this.lito.routes.push(routeCreator(method, path, handler));
    return this;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LitoHandler
});
