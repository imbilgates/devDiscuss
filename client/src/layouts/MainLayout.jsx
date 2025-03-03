import { Outlet } from 'react-router-dom';
import Nav from '../pages/Nav';
import Home from '../pages/Home';

const MainLayout = () => (
  <>
    <Nav />
    <Home />
    <Outlet /> {/* This will render child routes dynamically */}
  </>
);

export default MainLayout;
