export interface UserAuth {
  username?: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  url: string;
  abaut: null;
  birthday: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  posts: Post[];
  _count: Count;
  reactions: Reaction[];
  userReactions: (null | string)[];
}

export interface Reaction {
  postId: string;
  commentId: null;
}

export interface Post {
  id: string;
  content: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: User;
  comments: Comment[];
  reactions: Reaction[];
  _count: Count;
}

export interface Count {
  posts: number;
  comments: number;
  followers: number;
  following: number;
  reactions: number;
}

export interface Reaction {
  id: string;
  userId: number;
  user: User;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: number;
  user: User;
}

export interface User {
  username: string;
  avatar: string;
}

export interface Meta {
  totalPost: number;
  page: number;
  totalPages: number;
  pageSize: number;
}
