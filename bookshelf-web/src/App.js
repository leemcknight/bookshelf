import './App.css';
import BookshelfHeader from './components/bookshelfHeader';
import Welcome from './components/welcome';
import VerifyEmail from './components/verifyEmail';
import BookshelfView from './components/bookshelfView'
import Home from './components/home';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BookshelfHeader />
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/confirm' element={<VerifyEmail />} />
        <Route exact path='/library/bookshelf' element={<BookshelfView />} />
      </Routes>
    </div>
  );
}

export default App;
