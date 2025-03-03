import { useNavigate } from 'react-router-dom';
import add from '../assets/add.png';
import explore from '../assets/explore.png';
import profile from '../assets/profile.png';
import compiler from '../assets/compiler.png';

const Button = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/create');
  };

  const handleListClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleCompilerClick = () => {
    window.open('/compiler', '_blank');
  };
  


  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <button onClick={handleListClick} className="btn p-0 m-2">
        <img src={explore} alt="List Discussion" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </button>
      <button onClick={handleAddClick} className="btn p-0 m-2">
        <img src={add} alt="Add Discussion" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </button>
      <button onClick={handleProfileClick} className="btn p-0 m-2">
        <img src={profile} alt="Add Discussion" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </button>
      <button onClick={handleCompilerClick} className="btn p-0 m-2">
        <img src={compiler} alt="Add Discussion" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </button>
    </div>
  );
};

export default Button;
