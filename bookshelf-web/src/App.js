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

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/confirm' element={<VerifyEmail />} />
        <Route exact path='/user/profile' element={<UserProfile />} />
        <Route exact path='/user/settings' element={<UserSettings />} />
        <Route exact path='/library/bookshelf/:bookshelfId' element={<Bookshelf />} />
      </Routes>
    </div>
  );
}

export default App;
