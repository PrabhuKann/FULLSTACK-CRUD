import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
// import Home from './Home';
// import NotFound from './NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set EmployeeList as the landing page */}
        <Route path="/" element={<EmployeeList />} />

        {/* Routes for other pages */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/not-found" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
