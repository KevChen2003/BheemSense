import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import PageTitle from '../components/PageTitle';
import { Box, Typography, IconButton } from '@mui/material';
import { PersonOutlineOutlined, BookmarkBorderOutlined, CheckBoxOutlined } from '@mui/icons-material';


function Dashboard() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [data, setData] = useState("");

    useEffect(() => {
        fetch("/data/data.json")
        .then((response) => {
            if (!response.ok) {
                console.log('error thrown');
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
        })
    }, []);

    const setStatus = ( nextTurn, needsAssistance, hasInquiry, lowOpacity) => {
        // red if turn passed or needsAssistance is true
        // yellow if turn within 30 mins or hasInquiry is true
        // green otherwise
        if (lowOpacity) {
            if (nextTurn < 0 || needsAssistance) {
                return 'rgba(255, 0, 0, 0.5)';  // Red with 50% opacity
            } else if (nextTurn <= 30 || hasInquiry) {
                return 'rgba(255, 242, 0, 0.5)';  // Yellow with 50% opacity
            } else {
                return 'rgba(0, 255, 30, 0.5)';  // Green with 50% opacity
            }
        } else {
            if (nextTurn < 0 || needsAssistance) {
                return 'rgba(255, 0, 0, 1)';  // Red with 100% opacity
            } else if (nextTurn <= 30 || hasInquiry) {
                return 'rgba(255, 242, 0, 1)';  // Yellow with 100% opacity
            } else {
                return 'rgba(0, 255, 30, 1)';  // Green with 100% opacity
            }
        }
    };

    const goToPatient = (patientID) => {
        navigate(`/patient/${patientID}`);
    }

    return (
        <> 
            <PageTitle title={'Dashboard'}/>
            <Box sx={{ height: '100%', overflow: 'scroll'}}>
                {data && data.patients ? (
                    data.patients.map((patient, index) => (
                        <Box key={index} sx={{
                            height: '6%',
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Box sx={{
                                backgroundColor: setStatus(patient.nextTurn, patient.needsAssistance, patient.hasInquiry, false),
                                flex: 1
                            }}/>
                            <Box sx={{
                                backgroundColor: setStatus(patient.nextTurn, patient.needsAssistance, patient.hasInquiry, true),
                                height: '100%',
                                alignItems: 'center',
                                flex: 24,
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <Typography sx={{ flex: 6, fontSize: '20px' }}>{patient.name}</Typography>
                                <Box sx={{ display: 'flex', flex: 3, alignItems: 'center', gap: '20px' }}>
                                    <IconButton sx={{ color: 'black' }}>
                                        <CheckBoxOutlined sx={{ fontSize: '30px' }}/>
                                    </IconButton>
                                    <IconButton sx={{ color: 'black' }} onClick={() => {goToPatient(patient.patientID)}}>
                                        <PersonOutlineOutlined sx={{ fontSize: '30px' }}/> 
                                    </IconButton>
                                    <IconButton sx={{ color: 'black' }}>
                                        <BookmarkBorderOutlined sx={{ fontSize: '30px' }}/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography> No patient data available </Typography>
                )}
            </Box>
        </>
    );
}; 

export default Dashboard;