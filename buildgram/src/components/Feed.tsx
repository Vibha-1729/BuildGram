import { mockPosts } from '../mockData';
// import  type {PostType} from '../types';
import Post from './Post';

function Feed() {
  return (
    <main className="feed">
      {mockPosts.map((post) => (
        <Post key={post.id} post={post} />
        //    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
        //    key must be a unique, stable string — never the array index!
      ))}
    </main>
  );
}


export default Feed;