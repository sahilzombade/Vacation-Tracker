import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Table from './components/Table';
import EmployeePage from './components/EmployeePage';
import PieChartPage from './components/PieChartPage';

function App() {
  return (
    <Router>
      <Navbar company_name="Vacation Tracker" />
      <div className="container mx-10 mt-4">
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/stats" element={<PieChartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

