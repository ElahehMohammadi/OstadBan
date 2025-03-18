export const routeActiveItem = (routeName: string, item: string) =>
  routeName ? item.includes(routeName) : false;
