// src/components/PostHeader.tsx
import { Link } from 'react-router-dom';
import type { User } from '../types';

interface PostHeaderProps {
  user: User;
}

function PostHeader({ user }: PostHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px' }}>
      <img 
        src={user.avatarUrl} 
        alt={user.username} 
        style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '10px' }} 
      />
      {/* 1B Requirement: wrap the username in a <Link> */}
      <Link to={`/profile/${user.username}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
        {user.username}
      </Link>
    </div>
  );
}

export default PostHeader;