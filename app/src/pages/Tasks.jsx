import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
import { AddBox } from '@mui/icons-material';

import Timeline from 'react-timelines';
import "react-timelines/lib/css/style.css";

import PageTitle from '../components/PageTitle';
import TaskModal from '../components/TaskModal';


const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59);

const timebar = [
    {
        id: 'time',
        title: ' ',
        cells: Array.from({length:24}, (_, i) => ({
            id: `time-${i}`,
            title: `${i}:00`,
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), i, 0),
            end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), i + 1, )
        })),
        useAsGrid: true,
        style: {}
    }
];

const sample_tracks = [
    {
        id: "track-1",
        title: " ",
        elements: [
        {
            id: "task-1",
            title: "Clean Up",
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
            end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0),
            style: { backgroundColor: "lightblue" },
        },
        {
            id: "task-2",
            title: "Patient Check In",
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30),
            end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0),
            style: { backgroundColor: "lightgreen" },
        },
        ],
    },
    {
        id: "track-2",
        title: " ",
        elements: [
        {
            id: "task-3",
            title: "Clean Patient",
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
            end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
            style: { backgroundColor: "salmon" },
        },
        ],
    },
];

const isValidJSON = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        // error occured, not JSON
        return null; 
    }
}
  

function Tasks() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [zoom, setZoom] = useState(5);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState('');
    const [modalStatus, setModalStatus] = useState(false);

    // load only on first mount, otherwise claling setdata will re-render, which will keep looping and calling setdata
    useEffect(() => {
        // get data from localstorage
        const localStorageData = localStorage.getItem('data');
        // check if localstorage has an item 'data', and check if the JSON in it is valid
        const lsData = isValidJSON(localStorageData);
        if (localStorageData && lsData != null) {
            // problem in setData here, if set to the JSON it messes with the timeline on first render, 
            // rerendering by pressing hte modal and cancelling it will fix it
            // works when localStorage starts at empty
            setData(lsData);
        } else {
            // if it doesnt exist in localstorage, get from local file
            fetch("http://localhost:5173/data/data.json")
            .then((response) => {
                if (!response.ok) {
                    console.log('error thrown');
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('data', JSON.stringify(data));
                setData(data);
            });
        }
    }, []);

    // works but doesn't take from localStorage
    // useEffect(() => {
    //     fetch("http://localhost:5173/data/data.json")
    //     .then((response) => {
    //         if (!response.ok) {
    //             console.log('error thrown');
    //             throw new Error('Failed to fetch data');
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         // testing, still works so its not JSON.parse issue
    //         // const a = JSON.stringify(data);
    //         // const b = JSON.parse(a);
    //         // setData(b);
    //         setData(data);
    //     })
    // }, []);
    
    const handleModalSubmit = (modalData) => {
        setModalStatus(modalData.modalStatus);
        // add data to database too

        // assigning track position (top or bottom), can either:
        // * assign automatically to top, but assign to bottom track if time period is overlapping with one on top
        //      * might be annoying as if they set a background task first (if it lasts a long period), it'll take up the entire top bar
        // * let user choose (probs do this for now for customisability)
        
        delete modalData.modalStatus;
        const newData = data;
        newData.tasks.push(modalData);
        // store in localstorage for now
        localStorage.setItem('data', JSON.stringify(newData));
        setData(newData);
    }

    const handleModalClose = (modalData) => {
        setModalStatus(modalData.modalStatus);
    }

    return (
        <> 
            {modalStatus && <TaskModal onSubmit={ handleModalSubmit } onClose={handleModalClose} />}
            <PageTitle title={'Tasks'}/>
            <Box sx={{
                width: '100vw',
                overflowX: 'scroll',
                // height: '28%',
                height: '250px',
                overflowY: 'scroll',
                whiteSpace: 'nowrap',
                borderRadius: '0 0 20px 20px',
                boxShadow: 3
            }}>
                <Box sx={{
                     minWidth: '2000px',
                     height: '100%'
                }}>
                    {!modalStatus && <Timeline
                        scale={{ start, end, zoom, zoomMin: 2, zoomMax: 20 }}
                        isOpen={open}
                        toggleOpen={() => setOpen(!open)}
                        zoomIn={() => setZoom(Math.min(zoom + 1, 10))}
                        zoomOut={() => setZoom(Math.max(zoom - 1, 2))}
                        timebar={timebar} // Use pre-defined timebar
                        tracks={sample_tracks} // Use pre-defined tracks
                        now={now}
                        clickElement={(element) => alert(`Clicked: ${element.title}`)}
                        enableSticky
                        scrollToNow
                        // sx={{
                        //     overflow: 'scroll'
                        // }}
                    />}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100vw', marginTop: '20px', color: 'red' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <Typography align='left' variant='h5' sx={{ marginLeft: '20px', flex: 1 }} >Urgent Tasks</Typography>
                    <IconButton sx={{ align: 'right', marginRight: '10px', marginTop: '-5px' }}
                        onClick={() => setModalStatus(true)}>
                            {/* AddBox button will still show, so set it to invisible when modal is open */}
                        <AddBox sx={{ color: 'red', opacity: modalStatus ? '0%' : '100%'}}/> 
                    </IconButton>
                </Box>
            </Box>
        </>
    );
}; 

export default Tasks;