import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu, Info, CameraAlt, NotificationsOff, Refresh, PowerSettingsNew } from "@mui/icons-material";

function Navbar() {

  return (
    <>
        {/* top navbar */}
        <AppBar position='static' sx={{ backgroundColor:'#4C9BAE' }} >
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
            <Refresh />
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
