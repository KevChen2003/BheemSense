import React from 'react';
import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Chat, Description, Notifications, Assignment} from "@mui/icons-material";
import { useNavigate, useLocation } from 'react-router-dom';

function Footbar() {
    const [value, setValue] = useState(0); 
    const navigate = useNavigate();
    const location = useLocation();

    const pathIndexes = {
        '/messages': 0,
        '/dashboard': 1,
        '/notifications': 2,
        '/tasks': 3
    }

    const currentIndex = pathIndexes[location.pathname] ?? 1;

    const handleNavigation = (event, newValue) => {
        setValue(newValue);
        if (newValue == 0) navigate('/messages');
        if (newValue == 1) navigate('/dashboard');
        if (newValue == 2) navigate('/notifications');
        if (newValue == 3) navigate('/tasks');
    }

    return (
        <>
            <BottomNavigation 
                value={currentIndex} 
                onChange = {handleNavigation}
                sx={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#ffffff', borderTop: '1px solid #ddd'}}
            >
                <BottomNavigationAction label='Messages' icon={<Chat />} />
                <BottomNavigationAction label='Dashboard' icon={<Description />} />
                <BottomNavigationAction label='Notifications' icon={<Notifications />} />
                <BottomNavigationAction label='Tasks' icon={<Assignment />} />
            </BottomNavigation>
        </>
    )
}

export default Footbar