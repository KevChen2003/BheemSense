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
    return (
        <> 
            <PageTitle title={data.patients[patientID-1].name}/>
        </>
    );
}; 

export default Dashboard;