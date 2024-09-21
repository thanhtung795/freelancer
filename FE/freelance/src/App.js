import React from 'react';
// import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import JoinAs from './component/JoinAs/JoinAs';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CandidatesTable from './component/CandidatesTable/CandidatesTable';
import JobForm from './component/Job/JobForm/JobForm';
// const ExampleToast = ({ children }) => {
//   const [show, toggleShow] = useState(true);
//   return (
//     <>
//       {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
//       <Toast show={show} onClose={() => toggleShow(false)}>
//         <Toast.Header>
//           <strong className="mr-auto">React-Bootstrap</strong>
//         </Toast.Header>
//         <Toast.Body>{children}</Toast.Body>
//       </Toast>
//     </>
//   );
// };
import LogIn from './component/LogIn/LogIn';
import SignUp from './component/SignUp/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CandidatesTable from './component/CandidatesTable/CandidatesTable';
import PersonalInfo from './component/SignUpInfo/PersonalInfo';
import Experience from './component/SignUpInfo/Experience';
import Description from './component/SignUpInfo/Description';
import HomeFreelancer from './component/HomeFreelancer/HomeFreelancer';
import SkillsSelector from './component/SignUpInfo/SkillsSelector';
import FreelancerInfo from './component/FreelancerInfo/FreelancerInfo';
const App = () => (
  <Container className="p-3">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinAs />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} /> */}
        <Route path="/candidates" element={<CandidatesTable />} />
        <Route path="/job" element={<JobForm />} />
        <Route path="/candidates" element={<CandidatesTable />} />
        <Route path="/personalInfo" element={<PersonalInfo/>} />
        <Route path="/SkillsSelector" element={<SkillsSelector/>} />
        <Route path="/experience" element={<Experience/>} />
        <Route path="/description" element={<Description/>} />
        <Route path="/home-freelancer" element={<HomeFreelancer />} />
        <Route path="/freelancer-info" element={<FreelancerInfo />} />
      </Routes>
    </BrowserRouter>
  </Container>
);

export default App;
