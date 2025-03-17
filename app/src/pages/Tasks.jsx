import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import PageTitle from '../components/PageTitle';
import { Box, Typography } from '@mui/material';
import Timeline from 'react-timelines';

import "react-timelines/lib/css/style.css";


const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59);

const timebar = [
    {
        id: 'time',
        title: 'time',
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

const tracks = [
    {
        id: "track-1",
        title: "Task 1",
        elements: [
        {
            id: "task-1",
            title: "Meeting",
            start: new Date(2024, 2, 17, 9, 0),
            end: new Date(2024, 2, 17, 10, 0),
            style: { backgroundColor: "lightblue" },
        },
        {
            id: "task-2",
            title: "Development",
            start: new Date(2024, 2, 17, 13, 0),
            end: new Date(2024, 2, 17, 15, 0),
            style: { backgroundColor: "lightgreen" },
        },
        ],
    },
    {
        id: "track-2",
        title: "Task 2",
        elements: [
        {
            id: "task-3",
            title: "Testing",
            start: new Date(2024, 2, 17, 16, 0),
            end: new Date(2024, 2, 17, 18, 0),
            style: { backgroundColor: "salmon" },
        },
        ],
    },
];
  

function Tasks() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [zoom, setZoom] = useState(5);
    const [open, setOpen] = useState(false);

    return (
        <> 
            <PageTitle title={'Tasks'}/>
            <Timeline
                scale={{ start, end, zoom, zoomMin: 2, zoomMax: 20 }}
                isOpen={open}
                toggleOpen={() => setOpen(!open)}
                zoomIn={() => setZoom(Math.min(zoom + 1, 10))}
                zoomOut={() => setZoom(Math.max(zoom - 1, 2))}
                timebar={timebar} // Use pre-defined timebar
                tracks={tracks} // Use pre-defined tracks
                now={now}
                clickElement={(element) => alert(`Clicked: ${element.title}`)}
                enableSticky
                scrollToNow
                sx={{
                    overflow: 'scroll'
                }}
            />
        </>
    );
}; 

export default Tasks;