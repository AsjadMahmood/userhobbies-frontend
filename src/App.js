import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import './App.css';
import User from './components/user';
// import Hobbies from './components/hobbies';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
  );
}

function Main() {
  return(
    <Switch>
      <Route exact path="/" component={User} />
    </Switch>
  );
}

export default App;
