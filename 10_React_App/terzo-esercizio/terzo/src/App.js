import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Bio from './components/Bio';
import Contatti from './components/Contatti';
import Progetti from './components/Progetti';
import Competenze from './components/Competenze';
import Login from './components/Login';
import Register from './components/Register';
import Profilo from './components/Profilo';
import ModificaProfilo from './components/ModificaProfilo';
import ModificaDettagli from './components/ModificaDettagli';
import ModificaDettagli2 from './components/ModificaDettagli2';
import jwt_decode from 'jwt-decode';
// import Button from './components/Button';

function App() {
  /* const buttonStyle = { test stili bottoni
    border: "2px solid #35424a",
    backgroundColor: "transparent",
    borderRadius: "2em",
    color: "#35424a",
    fontWeight: "bold",
    padding: ".7em",
    margin: "1em"
  }; */

  const [isRegistering, setIsRegistering] = useState(false);  
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userData, setUserData] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? jwt_decode(token) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserData(jwt_decode(token));
    }
  }, []); 

  const handleLogin = (token) => {
    const decoded = jwt_decode(token);
    setUserData(decoded);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };

  const handleProfileUpdate = (newName) => {
    setUserData({ ...userData, name: newName });
  };

  const handleDetailsUpdate = (updatedDetails) => {
    setUserData({ ...userData, ...updatedDetails,});
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      <Header/>
      {isAuthenticated ? (
      <>
      <button onClick={handleLogout}>Logout</button>
        <Profilo user={userData}/>
        <ModificaProfilo user={userData} onUpdate={handleProfileUpdate}/>        
        <ModificaDettagli user={userData} onUpdate={handleDetailsUpdate}/>
        <ModificaDettagli2  user={userData} onUpdate={handleDetailsUpdate}/>
        <Bio bio={userData.bio}/>
        <Progetti projects={userData.projects}/>
        <Competenze skills={userData.skills}/>
        <Contatti contacts={userData.contacts}/>
        {/*<Button/> test stili bottoni */}
      </>
      ) : isRegistering ? (
        <Register onRegisterSuccess={handleRegisterSuccess}/>
      ) : (
      <div>
        <Login onLogin={handleLogin}/>
        <div class="container">
          <button /*style={buttonStyle}  test stili bottoni */ onClick={() => setIsRegistering(true)}>Register</button>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
