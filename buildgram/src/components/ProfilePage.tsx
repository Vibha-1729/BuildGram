// src/components/ProfilePage.tsx
import { useParams, Link } from 'react-router-dom';

function ProfilePage() {
  // Reading the URL parameter exactly as listed in the instructions
  const { username } = useParams<{ username: string }>();

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '0 20px' }}>
      {/* Required: A "Back to Feed" link */}
      <Link to="/" style={{ textDecoration: 'none', color: '#0095f6', fontWeight: 'bold' }}>
        ← Back to Feed
      </Link>
      
      {/* Required: Avatar + username + a short bio */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0', borderBottom: '1px solid #dbdbdb', paddingBottom: '20px' }}>
        <img 
          src="https://i.pravatar.cc/150?img=1" 
          alt="avatar" 
          style={{ width: '90px', height: '90px', borderRadius: '50%', marginRight: '30px' }} 
        />
        <div>
          <h2>{username}</h2>
          <p>Sleeping with the blanket on.. 😴</p>
        </div>
      </div>

      {/* Required: A grid of post thumbnails */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        <div style={{ aspectRatio: '1/1', background: '#eee' }}>
          <img src="https://picsum.photos/seed/post1/300/300" alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ aspectRatio: '1/1', background: '#eee' }}>
          <img src="https://picsum.photos/seed/post2/300/300" alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;