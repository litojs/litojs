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
export {
  createContext
};
