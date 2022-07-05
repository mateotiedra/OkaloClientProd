import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import ErrorHandlerWrapper from './ErrorHandler/ErrorHandlerWrapper';

// Manage routing
function App() {
  return (
    <Router>
      <ErrorHandlerWrapper>
        <Routes>
          <Route path='/' default element={<Home />} />
          <Route path='/login' element={<Auth startingMode='login' />} />
          <Route path='/register' element={<Auth startingMode='register' />} />
          <Route path='/user/:username' element={<Profile />} />
        </Routes>
      </ErrorHandlerWrapper>
    </Router>
  );
}

export default App;
