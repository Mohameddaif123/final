import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import JoinPopup from './components/JoinPopup';

function App() {
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Get the last visit date from localStorage
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    // Calculate today's date
    const today = new Date().toISOString().split('T')[0];

    // Check if it's the first visit to the website or if a day has passed since the last visit
    const isFirstVisitOrDayPassed = !lastVisitDate || lastVisitDate !== today;
    // Check if the user is on the home page
    const isHomePage = location.pathname === '/';

    if (isFirstVisitOrDayPassed && isHomePage) {
      // Show the JoinPopup if it's the first visit or a day has passed and the user is on the home page
      setShowJoinPopup(true);
      // Store today's date in localStorage
      localStorage.setItem('lastVisitDate', today);
    }
  }, [location]);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Outlet />
        <ToastContainer />
        {showJoinPopup && <JoinPopup />}
      </header>
    </div>
  );
}

export default App;
