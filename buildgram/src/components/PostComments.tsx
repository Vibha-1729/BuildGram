// src/components/PostComments.tsx
import React, { useState } from 'react';
import type { Comment } from '../types';
import { currentUser } from '../mockData';

interface PostCommentsProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void; // Make sure this line exists!
}

function PostComments({ comments, onAddComment }: PostCommentsProps) {
  const [inputText, setInputText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: currentUser,
      text: inputText,
      timestamp: 'Just now',
    };

    onAddComment(newComment);
    setInputText('');
  };

  return (
    <div style={{ marginTop: '5px' }}>
      {comments.map((comment) => (
        <p key={comment.id} style={{ margin: '4px 0' }}>
          <strong>{comment.user.username}</strong> {comment.text}
        </p>
      ))}
      <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a comment..." 
          style={{ flexGrow: 1, padding: '8px', border: '1px solid #dbdbdb', borderRadius: '4px' }}
        />
        <button type="submit" style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#0095f6', fontWeight: 'bold', cursor: 'pointer' }}>
          Post
        </button>
      </form>
    </div>
  );
}

export default PostComments;