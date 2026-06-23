// src/mockData.ts
import type { PostType, User } from './types';

// Tip: Define shared users once and reuse them across posts.
// This keeps your data consistent (same avatar, same id).
const userManan: User = {
  id: 'user_01',
  username: 'manan_street',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  bio: 'Sleeping with the blanket on..',
};

// Define more users here...

export const mockPosts: PostType[] = [
  {
    id: 'post_1',
    user: userManan,
    imageUrl: 'https://picsum.photos/seed/post1/600/600',
    caption: 'First post!',
    likes: 142,
    timestamp: '2 hours ago',
    comments: [
      {
        id: 'comment_1',
        user: /* another user object here */ userManan, // replace with a different user
        text: 'This is awesome!',
        timestamp: '1 hour ago',
      },
    ],
  },
  // Add post_2 and post_3 below...
];

// Use this if you want the currentUser
export const currentUser: User = {
  id: 'user_me',
  username: 'my_account',
  avatarUrl: 'https://i.pravatar.cc/150?img=5',
};
