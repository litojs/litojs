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
export {
  cookieParser
};
