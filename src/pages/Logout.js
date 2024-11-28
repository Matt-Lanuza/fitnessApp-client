import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>You have been logged out!</h2>
      <p>Redirecting to login...</p>
    </div>
  );
}


