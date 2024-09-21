import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinAs from "./component/JoinAs/JoinAs";
import Home from "./component/Home/Home";
import CandidatesTable from "./component/CandidatesTable/CandidatesTable";
import StatisticalFreelancer from "./component/StatisticalFreelancer/StatisticalFreelancer";
import NotFound from "./component/NotFound/NotFound";
import NavbarApp from "./component/Layout/Navbar/Navbar";
import Footer from "./component/Layout/Footer/Footer";
import Login from "./component/Login/login";
import SignUp from "./component/SignUp/signup";



const App = () => (
  <BrowserRouter>
    <NavbarApp />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/joinas" element={<JoinAs />} />
      <Route path="/candidates" element={<CandidatesTable />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/statisticalfreelancer"
        element={<StatisticalFreelancer />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
