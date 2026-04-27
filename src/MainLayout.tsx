import { Outlet } from 'react-router-dom';
import Navbar from './layout/Nabar';
import Footer from './layout/Footer';

const MainLayout = () => {
  return (
    <div className="app-container flex flex-col justify-between min-h-screen overflow-x-hidden">
      <Navbar /> 
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;