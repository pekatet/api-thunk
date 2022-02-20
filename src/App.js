import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ServiceList from './components/ServiceList'
import ServiceForm from './components/ServiceForm'

function App() {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/services/:id" element={<ServiceForm/>}/>
          <Route path="/services" element={<ServiceList/>} />
          <Route path="/" element={<Navigate to="/services"/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
