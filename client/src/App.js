import { Routes, Route } from 'react-router-dom'
import './App.css';
import { Post } from './components/Post';
import { PostList } from './components/PostList';
import { PostProvider } from './contexts/PostContext';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={
          <PostProvider>
            <Post />
          </PostProvider>
        } />
      </Routes>
    </div>
  )
}

export default App;
