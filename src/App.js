import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Workout from './pages/Workout';

function App() {
	return (
	  <Router>
	  	<AppNavbar />
	    <Routes>
	      <Route path="/" element={<Home />} />
	      <Route path="/register" element={<Register />} />
	      <Route path="/login" element={<Login />} />
	      <Route path="/logout" element={<Logout />} />
	      <Route path="/workout" element={<Workout />} />
	    </Routes>
	  </Router>
	);
}

export default App;
