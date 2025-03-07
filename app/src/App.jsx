import React from 'react';
import './App.css';

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Heatmap from './components/Heatmap';
import Navbar from './components/NavBar';
import Footbar from './components/Footbar';
import Dashboard from './pages/Dashboard';

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
                        </Routes>
                    </div>

                    <Footbar />
                </div>
            </Router>
        </>
    )
}

export default App;
