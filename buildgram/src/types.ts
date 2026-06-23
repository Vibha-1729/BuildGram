export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  bio?: string;           // The ? means this field is optional
  postCount?: number;
  followerCount?: number;
}

export interface Comment {
  id: string;
  user: User;             // A comment belongs to a User — reuse your interface!
  text: string;
  timestamp: string;
}

export interface PostType {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];    // An array of Comment objects — not just strings
  timestamp: string;
}
