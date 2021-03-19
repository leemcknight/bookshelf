import './App.css';
import BookshelfHeader from './components/bookshelfHeader';
import Welcome from './components/welcome';
import VerifyEmail from './components/verifyEmail';
import {createElement, useState} from 'react';
import Home from './components/home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [user, setUser] = useState();
  const [account, setAccount] = useState();

  const loginCallback = user => {
    setUser(user);
  }

  const createAccountCallback = account => {
     setAccount(account);
  }

  return (
    <div className="App">
      <BookshelfHeader />
        <Router>
          <Route exact path='/'><Welcome createAccountCallback={createAccountCallback} /></Route>
          <Route exact path='/home'><Home account={account} /></Route>
          <Route exact path='/confirm'><VerifyEmail account={account} /></Route>
        </Router>      
    </div>
  );
}

export default App;
