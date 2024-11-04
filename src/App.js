import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import Home from './pages/Home';
import DiaryList from './components/DiaryList';
import DiaryDetail from './components/DiaryDetail';
import CreateDiary from './components/CreateDiary';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  // UseEffect to check the token in localStorage and set isAuth
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token); // If token exists, set isAuth to true
  }, []); // Run this only once on component mount

  return (
    <div className="App">
      <Router>
        <Navbar setIsAuth={setIsAuth} isAuth={isAuth} />

        <Routes>
          {/* Redirect users based on authentication */}
          <Route path="/" element={isAuth ? <Navigate to="/home" /> : <LoginSignup setIsAuth={setIsAuth} />} />
          <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
          <Route path="/diary/:id" element={isAuth ? <DiaryDetail /> : <Navigate to="/" />} />
          <Route path="/diaries/" element={isAuth ? <DiaryList /> : <Navigate to="/" />} />
          <Route path="/diaries/create" element={isAuth ? <CreateDiary /> : <Navigate to="/" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isAuth ? <Navigate to="/home" /> : <LoginSignup setIsAuth={setIsAuth} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
