import React from 'react';
import logo from './logo.png';
import { Wordle } from './features/wordle/Wordle';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Wordle />
      </header>
    </div>
  );
}

export default App;
