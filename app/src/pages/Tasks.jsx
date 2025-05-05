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

// import SQLite from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default'
//     },
//     () => {},
//     (error) => { console.log(error) }
// );

// const createTaskTable = () => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             `CREATE TABLE IF NOT EXISTS Tasks (
//                 taskID INTEGER PRIMARY KEY, 
//                 urgent BOOLEAN,
//                 startTime TEXT,
//                 endTime TEXT,
//                 title TEXT,
//                 description TEXT,
//                 tags TEXT,
//                 assignees TEXT,
//                 trackNum INTEGER, 
//                 taskColour TEXT
//             )`
//         )
//     })
// }


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

const dateToString = (dateTime) => {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    return timeString;
}

function Tasks() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [zoom, setZoom] = useState(5);
    const [open, setOpen] = useState(false);
    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const [urgent, setUrgent] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);

    // sqlite
    useEffect(() => {
        
        // const loadDB = async () => {
        //     const db = await SQLite.openDatabaseAsync('data');

        //     const result = await db.getFirstAsync('SELECT COUNT(*) AS count FROM data'); 

        //     const dbData = await db.getAllAsync('SELECT * FROM data');

            // if (result.count !== 0) {
            //     setData(JSON.stringify(dbData));
            // } else {
            //     // if it doesnt exist in localstorage, get from local file
            //     fetch("/data/data.json")
            //     .then((response) => {
            //         if (!response.ok) {
            //             console.log('error thrown');
            //             throw new Error('Failed to fetch data');
            //         }
            //         return response.json();
            //     })
            //     .then((data) => {
            //         // set data into DB
            //         // localStorage.setItem('data', JSON.stringify(data));
            //         setData(data);
            //     });
            // }
        // }
        // loadDB();

        const loadDB = async () => {
            await SQLite.openDatabase(
                {
                    name: 'MainDB',
                    location: 'default'
                },
                (dbInstance) => { setDb(dbInstance) },
                (error) => { console.error('Error opening database', error) }
            );
            
            // create table for Tasks if it doesn't exist already
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS Tasks (
                        taskID INTEGER PRIMARY KEY, 
                        urgent BOOLEAN,
                        startTime TEXT,
                        endTime TEXT,
                        title TEXT,
                        description TEXT,
                        tags TEXT,
                        assignees TEXT,
                        trackNum INTEGER, 
                        taskColour TEXT
                    )`
                )
            });

            let count;

            await db.transaction(async (tx) => {
                await tx.executeSql("SELECT COUNT(*) AS count FROM Tasks",
                    [],
                    (tx, results) => {
                        count = results.rows.item(0).count;
                    },
                    (tx, error) => {
                        console.error('Query failed: ', error.message);
                        // return true aborts and rolls back the transaction,
                        // return false or nothing continues the transaction despite the error
                        return true;
                    }
                )
            });

            let dbData;
            await db.transaction(async (tx) => {
                await tx.executeSql("SELECT * FROM Tasks",
                    [],
                    (tx, results) => {
                        const rows = results.rows;
                        const tempData = [];

                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);

                            // convert list string to JSON
                            if (row.tags) {
                                row.tags = JSON.parse(row.tags);
                            } 

                            if (row.assignees) {
                                row.assignees = JSON.parse(row.assignees);
                            }

                            tempData.push(row);
                        }

                        dbData = tempData;
                    },
                    (tx, error) => {
                        console.error('Query failed: ', error.message);
                        // return true aborts and rolls back the transaction,
                        // return false or nothing continues the transaction despite the error
                        return true;
                    }
                )
            });

            if (count !== 0) {
                setData(JSON.stringify(dbData));
            } else {
                // if it doesnt exist in localstorage, get from local file
                fetch("/data/data.json")
                .then((response) => {
                    if (!response.ok) {
                        console.log('error thrown');
                        throw new Error('Failed to fetch data');
                    }
                    return response.json();
                })
                .then((data) => {
                    // set data into DB
                    // localStorage.setItem('data', JSON.stringify(data));
                    setData(data);
                });
            }
        }

        loadDB();
    }, [db]);

    const storeData = (newData) => {
        // loop through the list of tasks in data and store it individually onto the sqlite db
    }

    // web app version
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
            fetch("/data/data.json")
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
        console.log(modalData);
        newData.tasks.push(modalData);
        // store in localstorage for now
        localStorage.setItem('data', JSON.stringify(newData));
        // storeData(newData);
        setData(newData);
    }

    const handleModalClose = (modalData) => {
        setModalStatus(modalData.modalStatus);
    }

    const getTracks = () => {
        let tracks = [
            {
                id: "track-1",
                title: " ",
                elements: [],
            },
            {
                id: "track-2",
                title: " ",
                elements: [],
            },
        ];

        if (!data || !Array.isArray(data.tasks)) return tracks;
        
        for (const [index, task] of data.tasks.entries()) {
            // if task has no start / end time (usually just for the task in the json file for testing)
            // set the date to today from 11am to 1pm
            if (task.startTime == null) {
                task.startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0);
            }
            if (task.endTime == null) {
                task.endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0);
            }

            if (task.trackNum == 1) {
                tracks[0].elements.push({
                    id: `task-${index}`,
                    title: task.title,
                    start: new Date(task.startTime),
                    end: new Date(task.endTime),
                    style: { backgroundColor: task.taskColour }
                })
            } else if (task.trackNum == 2) {
                tracks[1].elements.push({
                    id: `task-${index}`,
                    title: task.title,
                    start: new Date(task.startTime),
                    end: new Date(task.endTime),
                    style: { backgroundColor: task.taskColour }
                })
            }
        }
        return tracks;
    }

    return (
        <> 
            {modalStatus && <TaskModal onSubmit={ handleModalSubmit } onClose={handleModalClose} urgent={urgent} />}
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
                        tracks={getTracks()} // Use pre-defined tracks
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
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '59%', marginTop: '20px' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <Typography align='left' variant='h5' sx={{ marginLeft: '20px', flex: 1, color: 'red' }} >Urgent Tasks</Typography>
                    <IconButton sx={{ align: 'right', marginRight: '10px', marginTop: '-5px' }}
                        onClick={() => {
                            setUrgent(true);
                            setModalStatus(true);
                        }}>
                            {/* AddBox button will still show, so set it to invisible when modal is open */}
                        <AddBox sx={{ color: 'red', opacity: modalStatus ? '0%' : '100%'}}/> 
                    </IconButton>
                </Box>
                <Box sx={{ height: '30%', overflow: 'scroll' }}>
                    { data && data.tasks && data.tasks.filter((task) => task.urgent == true).length > 0 &&
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '90%',
                                height: '20%',
                                margin: '5px auto',
                                alignItems: 'center'
                        }}>
                            <Typography sx={{ flex: 3, fontSize: '10px', color: 'black' }}>Task Name</Typography>
                            <Typography sx={{ flex: 1, fontSize: '10px', color: 'black' }}>Start Time</Typography>
                            <Typography sx={{ flex: 1, fontSize: '10px', color: 'black' }}>End Time</Typography>
                        </Box>
                    }
                    {data && data.tasks && data.tasks.filter((task) => task.urgent == true).length > 0 ? data.tasks
                    .filter((task) => task.urgent == true)
                    .map((task, index) => (
                        <Box key={index} sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '90%',
                            height: '20%',
                            margin: '5px auto',
                            borderRadius: '8px',
                            backgroundColor: task.taskColour,
                            alignItems: 'center'
                        }}>
                            <Typography sx={{ flex: 3, fontSize: '10px', color: 'black' }}>{task.title}</Typography>
                            <Typography sx={{ flex: 1, fontSize: '10px', color: 'black' }}>{dateToString(task.startTime)}</Typography>
                            <Typography sx={{ flex: 1, fontSize: '10px', color: 'black' }}>{dateToString(task.endTime)}</Typography>
                        </Box>
                    )) : (
                        <Typography>No Urgent Tasks</Typography>
                    )}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <Typography align='left' variant='h5' sx={{ marginLeft: '20px', flex: 1, color: 'black' }} >Tasks</Typography>
                    <IconButton sx={{ align: 'right', marginRight: '10px', marginTop: '-5px' }}
                        onClick={() => {
                            setUrgent(false);
                            setModalStatus(true);
                        }}>
                            {/* AddBox button will still show, so set it to invisible when modal is open */}
                        <AddBox sx={{ color: 'black', opacity: modalStatus ? '0%' : '100%'}}/> 
                    </IconButton>
                </Box>
                <Box sx={{ height: '30%', overflow: 'scroll' }}>
                    { data && data.tasks && data.tasks.filter((task) => task.urgent == false).length > 0 &&
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '90%',
                                height: '20%',
                                margin: '5px auto',
                                alignItems: 'center'
                        }}>
                            <Typography sx={{ flex: 3, fontSize: '10px', color: 'black' }}>Task Name</Typography>
                            <Typography sx={{ flex: 1, fontSize: '10px', color: 'black' }}>Start Time</Typography>
                            <Typography sx={{ flex: 1, fontSize: '10px', color: 'black' }}>End Time</Typography>
                        </Box>
                    }
                    {data && data.tasks && data.tasks.filter((task) => task.urgent == false).length > 0 ? data.tasks
                    .filter((task) => task.urgent == false)
                    .map((task, index) => (
                        <Box key={index} sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '90%',
                            height: '20%',
                            margin: '5px auto',
                            borderRadius: '8px',
                            backgroundColor: task.taskColour,
                            alignItems: 'center'
                        }}>
                            <Typography sx={{ flex: 3, fontSize: '10px', color: 'black' }}>{task.title}</Typography>
                            <Typography sx={{ flex: 1, fontSize: '10px', color: 'black' }}>{dateToString(task.startTime)}</Typography>
                            <Typography sx={{ flex: 1, fontSize: '10px', color: 'black' }}>{dateToString(task.endTime)}</Typography>
                        </Box>
                    )) : (
                        <Typography>No Tasks</Typography>
                    )}
                </Box>
            </Box>
        </>
    );
}; 

export default Tasks;