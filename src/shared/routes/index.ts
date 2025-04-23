type RouteConstant = {
  root: string;
  [key: string]: string | ((value: string) => string);
};

export const ROUTE_CONSTANTS: Record<string, RouteConstant> = {
  home: {
    root: "/",
  },
} as const;
