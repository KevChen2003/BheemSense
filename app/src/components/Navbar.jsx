import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu, Info, CameraAlt, NotificationsOff, Logout, PowerSettingsNew } from "@mui/icons-material";

function Navbar() {

  return (
    <>
        {/* top navbar */}
        <AppBar position='static' sx={{ backgroundColor:'#0094AE' }} >
        <Toolbar>
            <IconButton color='inherit'>
            <Menu />
            </IconButton>
            <IconButton color='inherit'>
            <Info />
            </IconButton>
            <IconButton color='inherit'>
            <CameraAlt />
            </IconButton>
            <Typography variant='h6' sx={{ flexGrow: 1, textAlign: 'center', fontSize: '16px' }}>
            Centered Around You
            </Typography>
            <IconButton color='inherit'>
            <NotificationsOff />
            </IconButton>
            <IconButton color='inherit'>
            <Logout />
            </IconButton>
            <IconButton color='inherit'>
            <PowerSettingsNew />
            </IconButton>
        </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar
