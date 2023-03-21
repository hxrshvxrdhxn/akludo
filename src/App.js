import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import './App.css';
import GameListing from "./pages/GameListing";
import Withdraw from './pages/Withdraw';
import AddMoney from './pages/AddMoney';
import ChoosePayOption from './pages/ChoosePayOption';
import Earn from './pages/Earn';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ludo-classic" element={<GameListing />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/deposite" element={<AddMoney />} />
          <Route path="/pay-option" element={<ChoosePayOption />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
