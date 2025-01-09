import { useEffect } from 'react';
import axios from 'axios';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './contex/AuthContex';
import Auth from './component/Auth';
import Nav from './pages/Nav';
import CreateDiscussion from './component/CreateDiscussion'
import MyDiscussion from './component/MyDiscussion';
import Home from './pages/Home';
import Profile from './component/profile/Profile';
function App() {
  axios.defaults.baseURL = "http://localhost:5000/api";
  const navigate = useNavigate();

  const { isAuth, isLoading } = useAuth()

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [isAuth]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <div>
        {isAuth && <>
          <Nav />
          <Home />
        </>}
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={<MyDiscussion />} />
          <Route path='/create' element={<CreateDiscussion />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
