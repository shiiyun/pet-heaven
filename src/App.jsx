import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/Footer';

import Home from './pages/home';
import Adoption from './pages/adoption';
import Services from './pages/services';
import AboutUs from './pages/about';
import Login from './pages/login';
import SignUp from './pages/signup';
import Profile from './pages/profile';

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("petHeavenSession") || "null"
      );
    } catch {
      return null;
    }
  });

  const handleLogin = (user) => {
    sessionStorage.setItem(
      "petHeavenSession",
      JSON.stringify(user)
    );

    setCurrentUser(user);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("petHeavenSession");
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="app-layout">

        <Navbar
          isLoggedIn={!!currentUser}
          onLogout={handleLogout}
        />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutus" element={<AboutUs />} />

            <Route path="/login" element={<Login onLogin={handleLogin} />}/>
            <Route path="/signup" element={<SignUp />}/>
            
            <Route path="/profile" element={
              currentUser ? (
                <Profile user={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
/>
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
};

export default App;
