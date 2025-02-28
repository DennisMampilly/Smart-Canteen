import React from 'react';
    import { Routes, Route, Link } from 'react-router-dom';
    import Home from './components/Home';
    import CanteenDashboard from './components/CanteenDashboard';
    import StudentDashboard from './components/StudentDashboard';
    import NGODashboard from './components/NGODashboard';

    function App() {
      return (
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/canteen">Canteen</Link></li>
              <li><Link to="/student">Student</Link></li>
              <li><Link to="/ngo">NGO</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/canteen" element={<CanteenDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/ngo" element={<NGODashboard />} />
          </Routes>
        </div>
      );
    }

    export default App;
