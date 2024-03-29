import './App.css';
import Header from './components/Header';
import Welcome from './pages/welcome';
import VerifyEmail from './pages/verifyEmail';
import Home from './pages/home';
import Login from './pages/login';
import { Routes, Route } from "react-router-dom";
import UserProfile from './components/user/profile';
import UserSettings from './components/user/settings';
import Bookshelf from './pages/bookshelf';
import Amplify from 'aws-amplify';
Amplify.configure({
  aws_cognito_region: "us-west-2",
  // (required) - Region where Amazon Cognito project was created   
  aws_user_pools_id: "us-west-2_1jHl1mG9W",
  // (optional) -  Amazon Cognito User Pool ID   
  aws_user_pools_web_client_id: "8p8q8f6qtllhdilgmp9gpskl2" // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)  

});

function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/",
    element: /*#__PURE__*/React.createElement(Welcome, null)
  }), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/login",
    element: /*#__PURE__*/React.createElement(Login, null)
  }), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/home",
    element: /*#__PURE__*/React.createElement(Home, null)
  }), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/confirm",
    element: /*#__PURE__*/React.createElement(VerifyEmail, null)
  }), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/user/profile",
    element: /*#__PURE__*/React.createElement(UserProfile, null)
  }), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/user/settings",
    element: /*#__PURE__*/React.createElement(UserSettings, null)
  }), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/library/bookshelf/:bookshelfId",
    element: /*#__PURE__*/React.createElement(Bookshelf, null)
  })));
}

export default App;