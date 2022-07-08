import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
import EmailSender from './pages/EmailSender/EmailSender';
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
          <Route path='/confirm-email/:action' element={<EmailSender />} />
          <Route
            path='/confirm-email/email-token/:emailToken'
            element={<EmailConfirmation />}
          />
          <Route path='/user/:username' element={<Profile />} />
        </Routes>
      </ErrorHandlerWrapper>
    </Router>
  );
}

export default App;
