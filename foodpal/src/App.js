import './App.css';
import React from 'react';
import LogInPage from './components/logInPage';
import WelcomePage from './components/welcomePage';


function App() {
  return (
    <div classname="App">
      <WelcomePage />
      <LogInPage />
    </div>
  );
}

export default App;