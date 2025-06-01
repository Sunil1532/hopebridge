import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import DonorDashboard from "./pages/DonarDashboard"; // ✅ Updated name
import AddChild from "./pages/addChild";
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/volunteer/add-child" element={<AddChild />} />
          <Route path="/donor" element={<DonorDashboard />} /> {/* ✅ Clean URL */}
        </Routes>
      </Router>
    </UserProvider>
    </Layout>
  );
};

export default App;
