import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PageTitle from '../components/PageTitle';
import { Typography } from '@mui/material';


function Allergies() {

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
            <Typography sx={{ fontSize: '30px' }}>Allergies:</Typography>
            {patient.allergies.length === 0 ? (
                <Typography>No allergies</Typography>
            ) : (
                patient.allergies.map((allergy, index) => (
                    <Typography key={index} sx={{ marginBottom: '5px' }}>{allergy}</Typography>
                ))
            )}
        </>
    );
}; 

export default Allergies;