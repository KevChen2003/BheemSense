import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Chat, Description, Notifications } from "@mui/icons-material";

function Footbar() {
  const [value, setValue] = useState(0); 

  return (
    <>
        <BottomNavigation 
            value={value} 
            onChange={(event, newValue) => setValue(newValue)}
            sx={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#ffffff', borderTop: '1px solid #ddd'}}
        >
            <BottomNavigationAction label='Chat' icon={<Chat />} />
            <BottomNavigationAction label='Documents' icon={<Description />} />
            <BottomNavigationAction label='Notifications' icon={<Notifications />} />
        </BottomNavigation>
    </>
  )
}

export default Footbar