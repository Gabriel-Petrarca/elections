
import './App.css';
import Navbar from './Components/Navbar';
import President from './pages/President';
import Home from './pages/home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/president" element={<President/>} />
      </Routes>
      </Router>
    </div>
  );
}
  
export default App;
