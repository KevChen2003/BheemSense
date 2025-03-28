import React, { useState } from 'react';
import './Modal.css';
import { Box, Typography, IconButton, Switch, Button } from '@mui/material';
import { Close, DataArray } from '@mui/icons-material';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MultiSectionDigitalClock, AdapterDayjs, LocalizationProvider} from '@mui/x-date-pickers';

function TaskModal({ onClose }) {
    const [data, setData] = useState({
        modalStatus: true,
        urgent: false,
        startTime: null
    });

    const handleClose = () => {
        const modalCloseData = {
            ...data, 
            modalStatus: false
        }
        setData(modalCloseData);
        // data state isn't updated immediately, so just use modalCloseData for immedaite close
        onClose(modalCloseData);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value, // if of type "checkbox", including switch, store "checked", else store "value"
        })
    }

    const handleClockChange = (value) => {
        setData({
            ...data,
            startTime: value
        });
    }

    const handleSubmit = (event) => {

    }

    return (
        <>
            <Box className='modal'>
                <Box className='overlay' />
                <Box className='modal-content'>
                    <IconButton onClick={handleClose} sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        padding: '5px 7px'
                    }} >
                        <Close />
                    </IconButton>
                    <Typography variant='h4' align='left'>Create Task</Typography>
                    <Box component='form' onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '20px'
                        }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Typography variant='h6' flex='1' align='left' >Urgent</Typography>
                            <Switch 
                                name="urgent"
                                checked={data.urgent}
                                onChange={handleChange}
                                color='warning'
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: '20px'
                        }}>
                            <Typography variant='h6' flex='1' align='left' >Start Time</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MultiSectionDigitalClock 
                                    sx={{height: '80px', justifyContent: 'right'}}
                                    value={data.startTime}
                                    onChange={handleClockChange}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '20px' }}>Create Task</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default TaskModal