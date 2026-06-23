// src/components/Post.tsx
import { useState } from 'react';
import type { PostType, Comment } from '../types';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostComments from './PostComments';

interface PostProps {
  post: PostType;
}

function Post({ post }: PostProps) {
  // Required Interaction 1: Like Button states
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post.likes);

  // Required Interaction 2: Save Button state
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Required Interaction 3: Dynamic comments array list state
  const [comments, setComments] = useState<Comment[]>(post.comments);

  // Conditional Logic Handler for Likes (Toggles count + active state seamlessly)
  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };

  // State Immutability — Critical Rule compliance: creates a brand-new array using spread operator
  const handleAddComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  return (
    <article className="post" style={{ border: '1px solid #dbdbdb', borderRadius: '8px', marginBottom: '24px', background: '#fff' }}>
      <PostHeader user={post.user} />
      <PostImage imageUrl={post.imageUrl} />
      
      {/* Pass interactive hooks down to the button display controller */}
      <PostActions 
        isLiked={isLiked} 
        onLikeToggle={handleLikeToggle} 
        likeCount={likeCount} 
        isSaved={isSaved} 
        onSaveToggle={handleSaveToggle} 
      />
      
      <div style={{ padding: '0 16px 16px 16px' }}>
        <p><strong>{post.user.username}</strong> {post.caption}</p>
        {/* Pass down current comments state and the immutable state insertion function */}
        <PostComments comments={comments} onAddComment={handleAddComment} />
        <small style={{ color: '#8e8e8e' }}>{post.timestamp}</small>
      </div>
    </article>
  );
}

export default Post;