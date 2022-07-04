import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
// Manage routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' default element={<Home />} />
        <Route
          path='/membre/connexion'
          element={<Auth startingMode='login' />}
        />
        <Route
          path='/membre/inscription'
          element={<Auth startingMode='register' />}
        />
      </Routes>
    </Router>
  );
}

export default App;
