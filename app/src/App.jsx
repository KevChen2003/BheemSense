import React from 'react';
import './App.css';

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Heatmap from './components/Heatmap';
import Navbar from './components/Navbar';
import Footbar from './components/Footbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import PatientPage from './pages/PatientPage';

function App() {
    useEffect(() => {
        document.title = 'BheemSense';
    }, []);

    return (
        <>
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', height:'100vh', width: '100vw' }}>
                    <Navbar />
                    {/* routes */}
                    <div style={{ flex: 1, overflow: 'auto' }}>  {/* Allows content to fill space */}
                        <Routes>
                            {/* automatically navigate to dashboard */}
                            <Route path="/" element={<Navigate to="/dashboard" replace />} /> 
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/patient/:id" element={<PatientPage />} />
                        </Routes>
                    </div>

                    <Footbar />
                </div>
            </Router>
        </>
    )
}

export default App;
