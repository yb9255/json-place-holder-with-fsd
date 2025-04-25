export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
