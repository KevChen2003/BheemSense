import React, { useState } from 'react';
import './Modal.css';
import { Box, Typography, IconButton, Switch, Button, TextField, Checkbox, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, FormControl, Menu } from '@mui/material';
import { Close } from '@mui/icons-material';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PropTypes from 'prop-types';
import { MuiColorInput } from 'mui-color-input'
// import { MultiSectionDigitalClock, AdapterDayjs, LocalizationProvider} from '@mui/x-date-pickers';

const tags = ['cleanup', 'checkup', 'routine check'];
const assignees = ['John', 'Jessie', 'Ron'];

function TaskModal({ onSubmit, onClose, urgent }) {
    const [data, setData] = useState({
        modalStatus: true,
        urgent: urgent,
        startTime: null,
        endTime: null,
        title: '',
        description: '',
        tags: [],
        assignees: [],
        trackNum: 1,
        taskColour: "#808080"
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

    const handleClockChange = (name, value) => {
        setData({
            ...data,
            [name]: value
        });
    }
    
    const handleLists = (event, item) => {
        const { name, checked } = event.target;
        // grab list from data
        let updatedList = [...data[name]];
        if (checked) {
            updatedList.push(item);
        } else {
            // filter and keep items that aren't == item
            updatedList = updatedList.filter((i) => i !== item);
        }
        setData({
            ...data,
            [name]: updatedList
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const modalCloseData = {
            ...data, 
            modalStatus: false
        }
        setData(modalCloseData);
        // data state isn't updated immediately, so just use modalCloseData for immedaite close
        onSubmit(modalCloseData);
    }

    const handleColourChange = (newValue) => {
        setData({
            ...data,
            'taskColour': newValue
        })
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
                                    sx={{height: '60px', justifyContent: 'right'}}
                                    value={data.startTime}
                                    onChange={(value) => handleClockChange('startTime', value)}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: '20px'
                        }}>
                            <Typography variant='h6' flex='1' align='left' >End Time</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MultiSectionDigitalClock 
                                    sx={{height: '60px', justifyContent: 'right'}}
                                    value={data.endTime}
                                    onChange={(value) => handleClockChange('endTime', value)}
                                />
                            </LocalizationProvider>
                        </Box>
                        <TextField 
                            name='title'
                            label='Enter Title'
                            variant='outlined'
                            sx={{ marginTop: '20px' }}
                            value={data.title}
                            onChange={handleChange}
                        />
                        <TextField 
                            name='description'
                            label='Enter Task Description'
                            variant='outlined'
                            sx={{ marginTop: '20px' }}
                            value={data.description}
                            onChange={handleChange}
                            multiline
                        />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: '20px'
                        }}>
                            <Typography variant='h6' flex='1' align='left' >Tags</Typography>
                            <FormGroup 
                                sx={{ maxHeight: '100px', overflow: 'auto' }}
                            >
                                <Box
                                    sx={{ display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    {tags ? (
                                        tags.map((tag, index) => (
                                                <FormControlLabel 
                                                    control={<Checkbox />} 
                                                    label={tag} 
                                                    key={index}
                                                    name='tags'
                                                    onChange={(e) => handleLists(e, tag)}
                                                />
                                            
                                        ))
                                    ) : (
                                        <Typography>No tags</Typography>
                                    )}
                                </Box>
                            </FormGroup>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: '20px'
                        }}>
                            <Typography variant='h6' flex='1.07' align='left' >Assignees</Typography>
                            <FormGroup 
                                sx={{ maxHeight: '100px', overflow: 'auto', flex: '1' }}
                            >
                                <Box
                                    sx={{ display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    {assignees ? (
                                        assignees.map((assignee, index) => (
                                                <FormControlLabel 
                                                    control={<Checkbox />} 
                                                    label={assignee} 
                                                    key={index}
                                                    name='assignees'
                                                    onChange={(e) => handleLists(e, assignee)}
                                                />
                                            
                                        ))
                                    ) : (
                                        <Typography>No Assignees</Typography>
                                    )}
                                </Box>
                            </FormGroup>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: '20px'
                        }}>
                            <Typography variant='h6' flex='1' align='left' >Task Track Position</Typography>
                            <FormControl >
                                <Select
                                    onChange={handleChange}
                                    value={data.trackNum}
                                    name='trackNum'
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: '20px'
                        }}>
                            <Typography variant='h6' flex='1' align='left' >Task Colour</Typography>
                            <MuiColorInput format="hex" value={data.taskColour} onChange={handleColourChange} />
                        </Box>
                        <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '20px' }}>Create Task</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

TaskModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    urgent: PropTypes.func.isRquired
};

export default TaskModal