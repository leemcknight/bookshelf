import './App.css';
import BookshelfHeader from './components/bookshelfHeader';
import Welcome from './components/welcome';
import VerifyEmail from './components/verifyEmail';
import BookshelfView from './components/bookshelfView'
import Home from './components/home';
import BookshelfLogin from './components/bookshelfLogin';
import { Routes, Route } from "react-router-dom";
import UserProfile from './components/user/profile';
import UserSettings from './components/user/settings';

function App() {
  return (
    <div className="App">
      <BookshelfHeader />
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route exact path='/login' element={<BookshelfLogin />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/confirm' element={<VerifyEmail />} />
        <Route exact path='/user/profile' element={<UserProfile />} />
        <Route exact path='/user/settings' element={<UserSettings />} />
        <Route exact path='/library/bookshelf/:bookshelfId' element={<BookshelfView />} />
      </Routes>
    </div>
  );
}

export default App;
