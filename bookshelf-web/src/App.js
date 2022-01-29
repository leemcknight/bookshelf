import './App.css';
import BookshelfHeader from './components/bookshelfHeader';
import Welcome from './components/welcome';
import VerifyEmail from './components/verifyEmail';
import BookshelfView from './components/bookshelfView'
import { useState } from 'react';
import Home from './components/home';
import ErrorView from './components/errorView';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
const apiManager = require('./util/apiManager');

function App() {
  const [account, setAccount] = useState();
  const [apiContext, setApiContext] = useState();
  const [library, setLibrary] = useState();
  const [bookshelf, setBookshelf] = useState();
  const [error, setError] = useState();
  const baseUrl = 'https://sr1evq3p4j.execute-api.us-west-2.amazonaws.com/dev';

  const loginCallback = async loginResponse => {
    const ctx = {
      user: loginResponse.attributes,
      session: loginResponse.signInUserSession,
      baseUrl: baseUrl
    }
    setApiContext(ctx);
    try {
      const library = await apiManager.getLibrary(ctx);
      setLibrary(library);
    } catch (error) {
      setLibrary(null);
      console.error(error);
      setError(error);
    }
  }

  const logoutCallback = () => {
    setApiContext({
      baseUrl: baseUrl
    });
    setLibrary(null);
    setBookshelf(null);
  }

  const createAccountCallback = account => {
    setAccount(account);
  }

  return (
    <div className="App">
      <BookshelfHeader loginCallback={loginCallback} logoutCallback={logoutCallback} apiContext={apiContext} />
      {error &&
        <ErrorView error={error} />
      }
      <Router>
        <Route exact path='/'><Welcome createAccountCallback={createAccountCallback} apiContext={apiContext} /></Route>
        <Route exact path='/home'><Home account={account} library={library} apiContext={apiContext} /></Route>
        <Route exact path='/confirm'><VerifyEmail account={account} loginCallback={loginCallback} apiContext={apiContext} /></Route>
        <Route exact path='/library/bookshelf'><BookshelfView library={library} bookshelf={bookshelf} apiContext={apiContext} /></Route>
      </Router>
    </div>
  );
}

export default App;
