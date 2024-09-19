import React from 'react';
// import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import JoinAs from './component/JoinAs/JoinAs';
import Login from './component/LogIn/LogIn';
import SignUp from './component/SignUp/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CandidatesTable from './component/CandidatesTable/CandidatesTable';
import PersonalInfo from './component/SignUpInfo/PersonalInfo';
import Specialization from './component/SignUpInfo/Specialization';
import Experience from './component/SignUpInfo/Experience';
import Description from './component/SignUpInfo/Description';
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
const App = () => (
  <Container className="p-3">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinAs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/candidates" element={<CandidatesTable />} />
        <Route path="/personalInfo" element={<PersonalInfo/>} />
        <Route path="/specialization" element={<Specialization/>} />
        <Route path="/experience" element={<Experience/>} />
        <Route path="/description" element={<Description/>} />
      </Routes>
    </BrowserRouter>
  </Container>
);

export default App;
