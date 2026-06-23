// src/components/PostActions.tsx
interface PostActionsProps {
  isLiked: boolean;
  onLikeToggle: () => void;
  likeCount: number;
  isSaved: boolean;
  onSaveToggle: () => void;
}

function PostActions({ isLiked, onLikeToggle, likeCount, isSaved, onSaveToggle }: PostActionsProps) {
  return (
    <div style={{ padding: '12px 16px' }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '8px', fontSize: '1.2rem' }}>
        <button onClick={onLikeToggle} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>💬</button>
        <button onClick={onSaveToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}>
          {isSaved ? '🔖' : '🔖'}
        </button>
      </div>
      <strong>{likeCount} likes</strong>
    </div>
  );
}

export default PostActions;