import React from 'react';
import { SocketProvider } from 'C:/Users/spang/elections/Frontend/src/socketContext.js'; // Adjust the path as needed
import Navbar from './Components/Navbar';
import President from './pages/President';
import Home from './pages/home';
import Thanks from './pages/thanksforvoting';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <SocketProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/president" element={<President />} />
            <Route exact path="/thanksforvoting" element={<Thanks />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </SocketProvider>
  );
}

export default App;
