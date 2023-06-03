export default getPageRoutes(import.meta.glob("./pages/**/*.jsx", { eager: true }));

function getPageRoutes(importMap) {
  return (
    Object.keys(importMap)
      // Ensure that static routes have
      // precedence over the dynamic ones
      .sort((a, b) => (a > b ? -1 : 1))
      .map((path) => {
        console.log(path);
        return {
            path: path
              // Remove /pages and .jsx extension
              .slice(7)
              .replace(/\/index$/, '')
              .replace(/\.[jt]sx?$/, '')
              .replace(/\[(.*?)\]/g, ':$1'),
            component: importMap[path].default,
          }
      })
  );
}
