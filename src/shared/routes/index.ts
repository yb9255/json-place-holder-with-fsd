type RouteConstant = {
  root: string;
  [key: string]: string | ((value: string) => string);
};

type RouteDomain = 'home' | 'posts';

export const ROUTE_CONSTANTS: Record<RouteDomain, RouteConstant> = {
  home: {
    root: '/',
  },
  posts: {
    root: '/posts',
    getPostById: (id: string) => `/posts/${id}`,
  },
} as const;
