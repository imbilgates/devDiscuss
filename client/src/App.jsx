import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';


import { useAuth } from './contex/AuthContex';
import Auth from './component/auth/Auth';
import Nav from './pages/Nav';
import CreateDiscussion from './component/discussion/CreateDiscussion'
import Home from './pages/Home';
import Profile from './component/profile/Profile.jsx';
import Loading from './utils/Loading';
import DiscussionList from './component/discussion/DiscussionList';

function App() {
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
    return <Loading isLoading={isLoading} text='' />;
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
          <Route path='/' element={<DiscussionList />} />
          <Route path='/create' element={<CreateDiscussion />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
