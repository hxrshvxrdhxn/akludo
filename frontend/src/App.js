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
import Otp from './pages/Otp';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import OtpResetPassword from './pages/OtpResetPassword';
import GaurdedAuth from './GaurdedAuth';
import 'react-toastify/dist/ReactToastify.css';


function App() { 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ludo-classic" element={<GaurdedAuth comp={<GameListing />} />} />
          <Route path="/withdraw" element={<GaurdedAuth comp={<Withdraw />} />} />
          <Route path="/deposit" element={<GaurdedAuth comp={<AddMoney />}  />} />
          <Route path="/pay-option" element={<GaurdedAuth comp={<ChoosePayOption />}  />} />
          <Route path="/earn" element={<GaurdedAuth comp={<Earn />}  />} />
          <Route path="/user-profile"  element={<GaurdedAuth comp={<UserProfile />}  />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/otp' element={<GaurdedAuth comp={<Otp />}  />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/new-password' element={<NewPassword />} />
          <Route path='/otp-reset-password' element={<OtpResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
