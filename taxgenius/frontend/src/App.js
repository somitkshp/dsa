import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ITRForm from './components/ITRForm';

function App() {
  const [view, setView] = useState('home'); // home, login, register

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TaxGenius</h1>
        <p>Your AI-powered tax filing assistant.</p>
        <nav>
          <button onClick={() => setView('home')}>Home</button>
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('register')}>Register</button>
        </nav>
      </header>
      <main>
        {view === 'login' && <Login />}
        {view === 'register' && <Register />}
        {view === 'home' && (
          <div>
            <h2>Home</h2>
            <p>Welcome! You are now logged in (simulated).</p>
            <button onClick={() => setView('itr-form')}>File ITR</button>
          </div>
        )}
        {view === 'itr-form' && <ITRForm />}
      </main>
    </div>
  );
}

export default App;
