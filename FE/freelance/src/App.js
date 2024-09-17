import React from 'react';
// import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import JoinAs from './component/JoinAs/JoinAs';
import Login from './component/Login/login';
import SignUp from './component/SignUp/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

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
      </Routes>
    </BrowserRouter>
  </Container>
);

export default App;
