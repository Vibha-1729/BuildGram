import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #dbdbdb', background: '#fff', position: 'sticky', top: 0 }}>
      {/* Clicking the brand name takes you home */}
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
        BuildGram
      </Link>
      <div>
        {/* Clicking the avatar takes you to my_account */}
        <Link to="/profile/my_account">
          <img 
            src="https://i.pravatar.cc/150?img=5" 
            alt="my profile" 
            style={{ width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }} 
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;