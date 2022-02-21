import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Main from './components/Main';
import './App.css';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <div id="wrapper">
          <NavBar/>   
          <Main/>    
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;