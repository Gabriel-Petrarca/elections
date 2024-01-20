import React from 'react';
import { SocketProvider } from 'C:/Users/spang/elections/Frontend/src/socketContext.js'; // Adjust the path as needed
import Navbar from './Components/Navbar';
import President from './pages/President';
import Membership from './pages/Membership';
import AO from './pages/AlumniOutreach';
import SE from './pages/StudentEngagement';
import Finance from './pages/Finance';
import IandB from './pages/Inclusion';
import Marketing from './pages/Marketing';
import Home from './pages/home';
import Thanks from './pages/thanksforvoting';
import Login from './pages/login';
import Admin from './pages/admin';
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
            <Route exact path="/membership" element={<Membership />} />
            <Route exact path="/ao" element={<AO />} />
            <Route exact path="/se" element={<SE />} />
            <Route exact path="/marketing" element={<Marketing />} />
            <Route exact path="/finance" element={<Finance />} />
            <Route exact path="/i&b" element={<IandB/>} />
            <Route exact path="/thanksforvoting" element={<Thanks />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </div>
    </SocketProvider>
  );
}

export default App;
