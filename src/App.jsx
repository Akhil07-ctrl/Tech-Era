import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Home from './components/Home';
import CourseItemDetails from './components/CourseItemDetails';
import './App.css';

const App = () => (
  <Router basename='/Tech-Era'>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses/:id" element={<CourseItemDetails />} />
    </Routes>
  </Router>
);

export default App;