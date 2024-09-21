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
import Login from "./component/LogIn/LogIn";
import SignUp from "./component/SignUp/SignUp";
import FreelancerInfo from "./component/FreelancerInfo/FreelancerInfo";
import HomeFreelancer from "./component/HomeFreelancer/HomeFreelancer";
import JobForm from "./component/Job/JobForm/JobForm";  
import PersonalInfo from "./component/SignUpInfo/PersonalInfo";
import SkillsSelector from "./component/SignUpInfo/SkillsSelector";
import Experience from "./component/SignUpInfo/Experience";
import Description from "./component/SignUpInfo/Description";
const App = () => (
    <BrowserRouter>
      <NavbarApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/joinAs" element={<JoinAs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/candidates" element={<CandidatesTable />} />
        <Route path="/job" element={<JobForm />} />
        <Route path="/personalInfo" element={<PersonalInfo />} />
        <Route path="/SkillsSelector" element={<SkillsSelector />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/description" element={<Description />} />
        <Route path="/home-freelancer" element={<HomeFreelancer />} />
        <Route path="/freelancer-info" element={<FreelancerInfo />} />
        <Route path="/statisticalfreelancer" element={<StatisticalFreelancer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
);

export default App;
