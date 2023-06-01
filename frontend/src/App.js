import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import './App.css';
import GameListing from "./pages/GameListing";
import Withdraw from './pages/Chips';
import AddMoney from './pages/AddMoney';
import ChoosePayOption from './pages/ChoosePayOption';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import Otp from './pages/Otp';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import OtpResetPassword from './pages/OtpResetPassword';
import GaurdedAuth from './GaurdedAuth';
import 'react-toastify/dist/ReactToastify.css';
import Refer from './pages/Refer';
import GameHistory from './pages/GameHistory';
import TransactionHistory from './pages/TransactionHistory';
import Support from './pages/Support';
import TermsAndCondition from './pages/TermsAndCondition';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import RefundPolicy from './pages/RefundPolicy';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ludo-classic" element={<GaurdedAuth comp={<GameListing />} />} />
          <Route path="/chips" element={<GaurdedAuth comp={<Withdraw />} />} />
          <Route path="/deposit" element={<GaurdedAuth comp={<AddMoney />} />} />
          <Route path="/pay-option" element={<GaurdedAuth comp={<ChoosePayOption />} />} />
          <Route path="/refer" element={<GaurdedAuth comp={<Refer />} />} />
          <Route path="/user-profile" element={<GaurdedAuth comp={<UserProfile />} />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/otp' element={<GaurdedAuth comp={<Otp />} />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/new-password' element={<NewPassword />} />
          <Route path='/otp-reset-password' element={<OtpResetPassword />} />
          <Route path='/game-history' element={<GameHistory />} />
          <Route path='/transaction-history' element={<TransactionHistory />} />
          <Route path='/support' element={<Support />} />
          <Route path='/terms-condition' element={<TermsAndCondition />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
