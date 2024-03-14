import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Welcome from "../components/Welcome/welcome.jsx";
import Home from "../components/home.jsx";
import RegisterForm from "../components/auth/registerForm.jsx";
import LoginForm from "../components/auth/loginForm.jsx";
import NotesForm from "../components/notes/notesForm.jsx";
import NotFound from "../components/NotFoundPage/notFoundPage.jsx";
import Header from "../components/Header/header.jsx";
import Footer from "../components/Footer/footer.jsx";
import AboutUs from "../components/AboutUs/aboutUs.jsx";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("online-notes");
    setIsLoggedIn(!!token);
  }, [isLoggedIn]); // Add isLoggedIn as a dependency

  return (
    <div className="app-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          {isLoggedIn ? (
            <>
              <Route path="/auth/register" element={<Navigate to="/" />} />
              <Route path="/auth/login" element={<Navigate to="/" />} />
              <Route path="/create" element={<NotesForm />} />
            </>
          ) : (
            <>
              <Route path="/auth/register" element={<RegisterForm />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route
                path="/create"
                element={
                  isLoggedIn ? <NotesForm /> : <Navigate to="/auth/login" />
                }
              />
            </>
          )}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default AppRoutes;
