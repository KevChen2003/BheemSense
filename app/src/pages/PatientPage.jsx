import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import PageTitle from '../components/PageTitle';
import { Box, Typography, IconButton } from '@mui/material';
import { PersonOutlineOutlined, BookmarkBorderOutlined, CheckBoxOutlined } from '@mui/icons-material';


function Dashboard() {
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
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '90%', alignItems: 'center' }}>
                <img src='/data/heatmap.jpg' alt='heatmap' style={{ display: 'flex', flex: 1, width: '50vw' }}/>
                <Box sx={{ display: 'flex', flex: 1 }}>
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
                </Box>
            </Box>
        </>
    );
}; 

export default Dashboard;