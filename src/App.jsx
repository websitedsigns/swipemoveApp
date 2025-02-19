// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LikedProperties from './pages/LikedProperties';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liked" element={<LikedProperties likedProperties={[]} />} />
      </Routes>
    </Router>
  );
};

export default App;