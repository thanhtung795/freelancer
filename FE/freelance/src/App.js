import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinAs from "./component/JoinAs/JoinAs";
import Home from "./component/Home/Home";
import CandidatesTable from "./component/CandidatesTable/CandidatesTable";
import StatisticalFreelancer from "./component/StatisticalFreelancer/StatisticalFreelancer";
import NotFound from "./component/NotFound/NotFound";
import NavbarGuest from "./component/Layout/Navbar/Navbar";
import Footer from "./component/Layout/Footer/Footer";
import LogIn from "./component/Login/login";
import SignUp from "./component/SignUp/signup";
import FreelancerInfo from "./component/FreelancerInfo/FreelancerInfo";
import HomeFreelancer from "./component/HomeFreelancer/HomeFreelancer";
import JobForm from "./component/Job/JobForm/JobForm";
import PersonalInfo from "./component/SignUpInfo/PersonalInfo";
import SkillsSelector from "./component/SignUpInfo/SkillsSelector";
import Experience from "./component/SignUpInfo/Experience";
import Description from "./component/SignUpInfo/Description";
import DetailJob from "./component/Client/Job/DetailJob/DetailJob";
import ClientInfo from "./component/Client/ClientInfo/ClientInfo";
import NavbarClient from "./component/Layout/Navbar/NavbarClient";
import NavbarFreelancer from "./component/Layout/Navbar/NavbarFreelancer";
import FreelancerList from "./component/FreelancerList/FreelancerList";
import ListJobUploaded from "./component/ListJobUploaded/ListJobUploaded";
import ListToDoJob from "./component/ListToDoJob/ListToDoJob";
import FreelancerListApplied from "./component/FreelancerListApplied/FreelancerListApplied";
import JobDetail from "./component/JobDetail/JobDetail";
import Chat from "./component/Chat/Chat";
import ChangePassword from "./component/ChangePassword/ChangePassword";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import Admin from "./component/Admin/Admin";
import ArchiveList from "./component/ArchiveList/ArchiveList";
import DeletedList from "./component/DeletedList/DeletedList";
import Payment from "./component/Payment/Payment";
import NavbarAdmin from "./component/Layout/Navbar/NavbarAdmin";
import FreelancerProfile from "./component/FreelancerProfile/FreelancerProfile";
import ChatBot from "./component/ChatBot/ChatBot";
import JobList from "./component/JobList/JobList";
import JobDetailJob from "./component/JobDetail-Job/JobDetail-Job";
import ListJobApplied from "./component/ListJobApplied/ListJobApplied";
import VnPay from "./component/VnPay/VnPay";
const UserContext = React.createContext();

const App = () => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "guest"
  );
  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole("guest");
  };

  return (
    <UserContext.Provider value={{ userRole, handleLogin, handleLogout }}>
      <BrowserRouter>
        {userRole === "guest" && <NavbarGuest />}
        {userRole === "freelancer" && <NavbarFreelancer />}
        {userRole === "client" && <NavbarClient />}
        {userRole === "admin" && <NavbarAdmin />}
        <Routes>
          {userRole != "admin" ? (
            <>
              <Route path="/vnpay" element={<VnPay />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/joinAs" element={<JoinAs />} />
              <Route path="/job" element={<JobForm />} />
              <Route path="/personalInfo" element={<PersonalInfo />} />
              <Route path="/SkillsSelector" element={<SkillsSelector />} />
              <Route path="/candidates" element={<CandidatesTable />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/description" element={<Description />} />
              <Route path="/home-freelancer" element={<HomeFreelancer />} />
              <Route path="/client-info" element={<ClientInfo />} />
              <Route path="/freelancer-profile" element={<FreelancerProfile />} />
              <Route
                path="/statistical-freelancer"
                element={<StatisticalFreelancer />}
              />
              <Route path="/detail-job" element={<DetailJob />} />
              <Route path="/freelancer-info" element={<FreelancerInfo />} />
              <Route path="/freelancer-list" element={<FreelancerList />} />
              <Route
                path="/freelancer-list-applied"
                element={<FreelancerListApplied />}
              />
              <Route path="/list-job-uploaded" element={<ListJobUploaded />} />
              <Route path="/list-job-applied" element={<ListJobApplied />} />
              <Route path="/list-job" element={<JobList />} />
              <Route path="/list-todo-job" element={<ListToDoJob />} />
              <Route path="/job-detail" element={<JobDetail />} />
              <Route path="/job-detail/:id" element={<JobDetailJob />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/archived-list" element={<ArchiveList />} />
              <Route path="/deleted-list" element={<DeletedList />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
        <ChatBot />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
};
export default App;



