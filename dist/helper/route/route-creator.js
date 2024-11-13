// src/helper/route/route-creator.ts
function routeCreator(method, path, handler) {
  return {
    method,
    path,
    handler
  };
}
export {
  routeCreator
};
