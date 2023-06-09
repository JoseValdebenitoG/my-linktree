import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginView from "./routes/loginView.jsx";
import ChooseUsernameView from "./routes/chooseUsernameView.jsx";
import DashboardView from "./routes/dashboardView.jsx";
import EditProfileView from "./routes/editProfileView.jsx";
import SignOutView from "./routes/signOutView.jsx";
import PublicProfileView from "./routes/publicProfileView.jsx";
import "animate.css/animate.min.css";

// Define routes for the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LoginView />} />
      <Route path="choose-username" element={<ChooseUsernameView />} />
      <Route path="dashboard" element={<DashboardView />} />
      <Route path="dashboard/profile" element={<EditProfileView />} />
      <Route path="signout" element={<SignOutView />} />
      <Route path="u/:username" element={<PublicProfileView />} />
    </Routes>
  </BrowserRouter>
);
