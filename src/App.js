import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "stream-browserify";
// Import your components for routing
import RegisterPage from "./pages/Register/Register";
import HomePage from "./pages/Home/Home";
import AvatarPage from "./pages/Avatar/Avatar";
import RealteacherPage from "./pages/Realteacher/Realteacher";
import VoiceoverPage from "./pages/Voiceover/Voiceover";
import LoginPage from "./pages/Login/Login";
import AdminPage from "./pages/Admin/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />{" "}
        <Route path="/home" element={<HomePage />} />{" "}
        <Route path="/avatar-videos" element={<AvatarPage />} />{" "}
        <Route path="/voice-over-videos" element={<VoiceoverPage />} />{" "}
        <Route path="/Real-teacher" element={<RealteacherPage />} />{" "}
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/adminhome" element={<AdminPage />} />{" "}
      </Routes>{" "}
    </Router>
  );
}

export default App;
