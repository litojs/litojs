// src/helper/response/response-creator.ts
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
export {
  createResponse,
  view
};
