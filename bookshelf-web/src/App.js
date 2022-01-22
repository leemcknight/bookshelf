import './App.css';
import BookshelfHeader from './components/bookshelfHeader';
import Welcome from './components/welcome';
import VerifyEmail from './components/verifyEmail';
import BookshelfView from './components/bookshelfView'
import { createElement, useState } from 'react';
import Home from './components/home';
import ErrorView from './components/errorView';
import apiManager from './util/apiManager';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [user, setUser] = useState();
  const [account, setAccount] = useState();
  const [apiContext, setApiContext] = useState();
  const [bookshelf, setBookshelf] = useState();
  const [error, setError] = useState();
  const baseUrl = 'https://sr1evq3p4j.execute-api.us-west-2.amazonaws.com/dev';

  const loginCallback = async loginResponse => {
    var loginUser = {};
    loginUser.AuthenticationResult = loginResponse.data.AuthenticationResult;
    setUser(loginUser);
    setApiContext({
      user: loginUser,
      baseUrl: baseUrl
    });
    try {
      console.log('getting library')
      const library = await apiManager.getLibrary({
        user: loginUser,
        baseUrl: baseUrl
      });
      setBookshelf(library);
    } catch (error) {
      console.error(error);
      //setError(error);
    }
  }

  const createAccountCallback = account => {
    setAccount(account);
  }

  return (
    <div className="App">
      <BookshelfHeader loginCallback={loginCallback} />
      {error &&
        <ErrorView error={error} />
      }
      <Router>
        <Route exact path='/'><Welcome createAccountCallback={createAccountCallback} apiContext={apiContext} /></Route>
        <Route exact path='/home'><Home account={account} apiContext={apiContext} /></Route>
        <Route exact path='/confirm'><VerifyEmail account={account} loginCallback={loginCallback} apiContext={apiContext} /></Route>
        <Route exact path='/bookshelf'><BookshelfView bookshelf={bookshelf} apiContext={apiContext} /></Route>
      </Router>
    </div>
  );
}

export default App;
