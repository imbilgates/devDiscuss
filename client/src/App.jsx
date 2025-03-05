import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './contex/AuthContex';
import AuthPage from './component/auth/AuthPage';
import CreateDiscussion from './component/discussion/CreateDiscussion';
import Profile from './component/Profile/Profile';
import Loading from './utils/Loading';
import DiscussionList from './component/discussion/DiscussionList';
import Compiler from './component/compiler/Compiler';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './layouts/ProtectedRoute';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading isLoading={isLoading} text='' />;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/compiler' element={<Compiler />} />

        {/* Protected Routes for MainLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/' element={<DiscussionList />} />
            <Route path='/create' element={<CreateDiscussion />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
