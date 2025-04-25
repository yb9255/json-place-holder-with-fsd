export const ROUTE_CONSTANTS = {
  home: {
    root: '/',
  },
  posts: {
    root: '/posts',
    getPostById: (id: string | number) => `/posts/${id}`,
  },
} as const;
