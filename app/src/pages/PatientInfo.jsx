import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import PageTitle from '../components/PageTitle';
import { Box, Typography, Button } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';


function PatientInfo() {
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

    function getAge() {
        const dob = new Date(patient.DOB);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();

        // Check if birthday has occurred yet this year
        const hasHadBirthdayThisYear =
            today.getMonth() > dob.getMonth() ||
            (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

        if (!hasHadBirthdayThisYear) {
            age--;
        }

        return age;
    }

    return (
        <> 
            <PageTitle title={patient.name}/>
            <Box sx={{ display: 'flex', height: '86.4%', flexDirection: 'column', width: '100vw', overflow: 'scroll' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', margin: '20px', gap: '10px' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%' }}>
                        <Typography sx={{textAlign: 'left'}}>Age: </Typography>
                        <Typography sx={{textAlign: 'right'}}>{getAge()} years</Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%' }}>
                        <Typography sx={{textAlign: 'left'}}>Sex: </Typography>
                        <Typography sx={{textAlign: 'right'}}>{patient.sex}</Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%' }}>
                        <Typography sx={{textAlign: 'left'}}>Ethnicity: </Typography>
                        <Typography sx={{textAlign: 'right'}}>{patient.ethnicity}</Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%'}}>
                        <Typography sx={{textAlign: 'left'}}>Allergies: </Typography>
                        <Button sx={{
                                    textAlign: 'right',
                                    color: 'black',
                                    fontSize: '14px',
                                    textTransform: 'none',
                                    minWidth: '0px',        // Remove minimum width constraint
                                    padding: '0px',         // Remove padding
                                    marginLeft: 'auto', // Push to right side of grid cell
                                    gap: '5px'
                                }}
                        >
                            <Typography sx={{color: '#9F9F9F'}}>{patient.allergies.length === 0 ? 'None' : 'View Allergies'}</Typography>
                            <ArrowForwardIos sx={{fontSize: '14px'}}/>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%'}}>
                        <Typography sx={{textAlign: 'left'}}>Conditions: </Typography>
                        <Button sx={{
                                    textAlign: 'right',
                                    color: 'black',
                                    fontSize: '14px',
                                    textTransform: 'none',
                                    minWidth: '0px',        // Remove minimum width constraint
                                    padding: '0px',         // Remove padding
                                    marginLeft: 'auto', // Push to right side of grid cell
                                    gap: '5px'
                                }}
                        >
                            <Typography sx={{color: '#9F9F9F'}}>{patient.conditions.length === 0 ? 'None' : 'View Conditions'}</Typography>
                            <ArrowForwardIos sx={{fontSize: '14px'}}/>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%'}}>
                        <Typography sx={{textAlign: 'left'}}>Treatment Plan: </Typography>
                        <Button sx={{
                                    textAlign: 'right',
                                    color: 'black',
                                    fontSize: '14px',
                                    textTransform: 'none',
                                    minWidth: '0px',        // Remove minimum width constraint
                                    padding: '0px',         // Remove padding
                                    marginLeft: 'auto', // Push to right side of grid cell
                                    gap: '5px'
                                }}
                        >
                            <Typography sx={{color: '#9F9F9F'}}>{patient.treatmentPlan.length === 0 ? 'None' : 'View Treatment Plan'}</Typography>
                            <ArrowForwardIos sx={{fontSize: '14px'}}/>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%'}}>
                        <Typography sx={{textAlign: 'left'}}>Allergies: </Typography>
                        <Button sx={{
                                    textAlign: 'right',
                                    color: 'black',
                                    fontSize: '14px',
                                    textTransform: 'none',
                                    minWidth: '0px',        // Remove minimum width constraint
                                    padding: '0px',         // Remove padding
                                    marginLeft: 'auto', // Push to right side of grid cell
                                    gap: '5px'
                                }}
                        >
                            <Typography sx={{color: '#9F9F9F'}}>{patient.notes.length === 0 ? 'None' : 'View Notes'}</Typography>
                            <ArrowForwardIos sx={{fontSize: '14px'}}/>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%' }}>
                        <Typography sx={{textAlign: 'left'}}>Next Turn: </Typography>
                        <Typography sx={{
                            textAlign: 'right',
                            color: patient.nextTurn <= 0 ? 'red' :
                                    patient.nextTurn <= 30 ? '#8B8000' :
                                    'green'
                        }}>{patient.nextTurn} mins</Typography>
                    </Box>
                    {patient.needsAssistance ? (
                        <Typography sx={{ color: 'red', textAlign: 'left' }}>Needs assistance</Typography>
                    ) : (
                        <Typography sx={{ color: 'green', textAlign: 'left' }}>Does not need assistance</Typography>
                    )}
                    {patient.hasInquiry ? (
                        <Typography sx={{ color: '#8B8000', textAlign: 'left' }}>Has inquiry</Typography>
                    ) : (
                        <Typography sx={{ color: 'green', textAlign: 'left' }}>No inquiry</Typography>
                        )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '0px 20px 20px 20px', paddingTop: '20px', borderTop: '1px solid #CACACA' }}>
                    <img src='/data/heatmap.jpg' alt='heatmap' style={{ display: 'flex', flex: 1, width: '30vw' }}/>
                    <Box sx={{display: 'flex', flexDirection: 'column', flex: 3, gap: '10px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 1fr', width: '100%' }}>
                            <Typography sx={{textAlign: 'left'}}>Risk of Pressure Injury: </Typography>
                            <Typography sx={{
                                textAlign: 'right',
                                color: patient.pressureInjuryRisk === 'High' ? 'red' :
                                        patient.pressureInjuryRisk === 'Moderate' ? '#8B8000' :
                                        'green'
                            }}>{patient.pressureInjuryRisk}</Typography>
                        </Box>
                        <Button sx={{
                                    textAlign: 'left',
                                    color: 'black',
                                    fontSize: '14px',
                                    textTransform: 'none',
                                    minWidth: '0px',
                                    padding: '0px',
                                }}
                        >
                            <Typography sx={{marginRight: 'auto'}}>View Pressure Histogram</Typography>
                            <ArrowForwardIos sx={{fontSize: '14px'}}/>
                        </Button>
                        <Button sx={{
                                    textAlign: 'left',
                                    color: 'black',
                                    fontSize: '14px',
                                    textTransform: 'none',
                                    minWidth: '0px',
                                    padding: '0px',
                                }}
                        >
                            <Typography sx={{marginRight: 'auto'}}>View Average Pressure Map</Typography>
                            <ArrowForwardIos sx={{fontSize: '14px'}}/>
                        </Button>
                        <Button sx={{
                                    textAlign: 'left',
                                    color: 'black',
                                    fontSize: '14px',
                                    textTransform: 'none',
                                    minWidth: '0px',
                                    padding: '0px',
                                }}
                        >
                            <Typography sx={{marginRight: 'auto'}}>View Turn History</Typography>
                            <ArrowForwardIos sx={{fontSize: '14px'}}/>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}; 

export default PatientInfo;