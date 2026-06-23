// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;