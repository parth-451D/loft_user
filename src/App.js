import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./component/comman/header";
import Home from "./component/pages/home/home";
import GallaryList from "./component/pages/gallary/gallaryList";
import Footer from "./component/pages/footer/footer";
import About from "./component/pages/about us/about";
import BlogList from "./component/pages/blog/blogList";
import BlogDetails from "./component/pages/blog/blogDetails";
import Aminites from "./component/pages/aminites/aminites";
import AnimitesList from "./component/pages/aminites/aminitesList";
import Property from "./component/pages/property/property";
import PropertyDetails from "./component/pages/property/propertyDetails";
import Login from "./component/pages/login/login";
import SignUp from "./component/pages/Sign Up/signUp";
import ForgotPassword from "./component/pages/forgot password/forgotPassword";
import RecoverPassword from "./component/pages/recover password/recoverPassword";
import ResetPassword from "./component/pages/reset password/resetPassword";
import Booking from "./component/pages/booking/booking";
import Payment from "./component/pages/payment/payment";
import Contact from "./component/pages/contact us/contact";
import EditProfile from "./component/pages/edit profile/editProfile";
import UnitDetails from "./component/pages/Units/unit-details";
import Chat from "./component/pages/chat/chat";
import NewChat from "./component/pages/chat/newChat";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Function to check if the current route is /login or /forgot-password
  const isExcludedRoute = () => {
    return [
      "/login",
      "/forgot-password",
      "/sign-up",
      "/forgot-password",
      "/recover-password",
      "/reset-password",
    ].includes(location.pathname);
  };

  return (
    <div>
      {!isExcludedRoute() && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gallary" element={<GallaryList />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog-Details" element={<BlogDetails />} />
        <Route path="/unit-Details" element={<UnitDetails />} />
        <Route path="/animites" element={<AnimitesList />} />
        <Route path="/property" element={<Property />} />
        <Route path="/property-details" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      {/* <Chat /> */}
      <NewChat />
      {!isExcludedRoute() && <Footer />}
    </div>
  );
};

export default App;
