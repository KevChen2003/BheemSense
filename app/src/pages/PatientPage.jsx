import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import PageTitle from '../components/PageTitle';
import { Box, Typography, Button } from '@mui/material';
import { MenuBook, Feed, Medication, WarningAmber } from '@mui/icons-material';


function PatientPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [data, setData] = useState("");

    const { id } = useParams();

    const patientID = parseInt(id, 10);

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
    
    // Guard: while data is loading, show a loading message
    if (!data || !data.patients || !data.patients[patientID - 1]) {
        return <Typography variant="h6" sx={{ padding: 2 }}>Loading patient data...</Typography>;
    }

    const patient = data.patients[patientID - 1];

    return (
        <> 
            <PageTitle title={patient.name}/>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '75%' }}>
                <img src='/data/heatmap.jpg' alt='heatmap' style={{ display: 'flex', flex: 1, height: '100%', width: '50vw' }}/>

                <img src='/data/graphs.jpg' alt='data' style={{ display: 'flex', flex: 1, height: '100%', width: '50vw' }}/>

                {/* <Box sx={{ display: 'flex', flex: 1 }}>
                    <Box sx={{ flexDirection: 'column'}}>
                        <Typography>Name: {patient.name}</Typography>
                        <Typography>Age: {getAge()} years old</Typography>
                        <Typography>Gender: {patient.gender}</Typography>
                        <Typography>Next Turn: {patient.nextTurn} mins</Typography>
                        {patient.needsAssistance ? (
                            <Typography sx={{ color: 'red' }}>Needs assistance</Typography>
                        ) : (
                            <Typography sx={{ color: 'green' }}>Does not need assistance</Typography>
                        )}
                        {patient.hasInquiry ? (
                            <Typography sx={{ color: '#8B8000' }}>Has inquiry</Typography>
                        ) : (
                            <Typography sx={{ color: 'green' }}>No inquiry</Typography>
                        )}
                    </Box>
                </Box> */}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '11.5%' }}>
                {/* buttons */}
                <Button sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', backgroundColor: '#0084FF', borderRadius: '15px', textTransform: 'none' }}>
                    <MenuBook sx={{ color: 'white', width: '80%', height: '80%' }} />
                    <Typography sx={{ color: 'white', fontSize: '10px' }}>Turn History</Typography>
                </Button>
                <Button sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', backgroundColor: '#00B50C', borderRadius: '15px', textTransform: 'none' }}
                        onClick={() => {navigate(`/patient/${patientID}/info`)}}
                >
                    <Feed sx={{ color: 'white', width: '80%', height: '80%' }} />
                    <Typography sx={{ color: 'white', fontSize: '10px' }}>Patient Info</Typography>
                </Button>
                <Button sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', backgroundColor: '#E4D900', borderRadius: '15px', textTransform: 'none' }}>
                    <Medication sx={{ color: 'white', width: '80%', height: '80%' }} />
                    <Typography sx={{ color: 'white', fontSize: '10px' }}>Medications</Typography>
                </Button>
                <Button sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', backgroundColor: '#FD4040', borderRadius: '15px', textTransform: 'none' }}>
                    <WarningAmber sx={{ color: 'white', width: '80%', height: '80%' }} />
                    <Typography sx={{ color: 'white', fontSize: '10px' }}>Emergency</Typography>
                </Button>
            </Box>
        </>
    );
}; 

export default PatientPage;