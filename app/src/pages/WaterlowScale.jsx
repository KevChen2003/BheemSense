import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PageTitle from '../components/PageTitle';
import { Box, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { } from '@mui/icons-material';


function WaterlowScale() {

    // following the given waterlow scale format for now, meaning that the start of the form does ask for DOB and sex
    // but the form still asks for age group and gender

    const [data, setData] = useState("");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        NHI: '',
        DOB: '',
        sex: '',
        BMI: '',
        weight: '',
        visualAssessment: [],
        mobility: '',
        continence: '',
        tissueMalnutrition: ''
    });

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

    const handleSubmit = () => {

    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value, // if of type "checkbox", including switch, store "checked", else store "value"
        })
    }

    const handleCheckboxChange = (event, item) => {
        const { name, checked } = event.target;
        // grab list from data
        let updatedList = [...formData[name]];
        if (checked) {
            updatedList.push(item);
        } else {
            // filter and keep items that aren't == item
            updatedList = updatedList.filter((i) => i !== item);
        }
        setFormData({
            ...data,
            [name]: updatedList
        })
    }

    return (
        <> 
            <PageTitle title={patient.name}/>
            <Box sx={{ display: 'flex', height: '86.4%', flexDirection: 'column', width: '100vw', overflow: 'scroll', padding: '20px', gap: '20px' }}>
                <Typography variant='h5' align='left'>Waterlow Scale Survey</Typography>
                <Box component='form' onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <TextField 
                            name='firstName'
                            label='First Name'
                            variant='outlined'
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <TextField 
                            name='lastName'
                            label='Last Name'
                            variant='outlined'
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <TextField 
                            name='NHI'
                            label='NHI'
                            variant='outlined'
                            value={formData.NHI}
                            onChange={handleChange}
                        />
                        <TextField 
                            name='DOB'
                            label='Date of Birth'
                            variant='outlined'
                            value={formData.DOB}
                            onChange={handleChange}
                        />
                        <TextField 
                            name='sex'
                            label='Sex'
                            variant='outlined'
                            value={formData.sex}
                            onChange={handleChange}
                        />
                    </Box>

                    <FormControl>
                        <FormLabel id="BMI-group-label" sx={{ textAlign: 'left' }}>BMI = weight/(height^2)</FormLabel>
                        <RadioGroup
                            aria-labelledby="BMI-group-label"
                            name="BMI"
                            value={formData.BMI}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="average" control={<Radio />} label="Average BMI 20-24.9" />
                            <FormControlLabel value="above average" control={<Radio />} label="Above average BMI 25-29.9" />
                            <FormControlLabel value="obese" control={<Radio />} label="Obese BMI > 30" />
                            <FormControlLabel value="below average" control={<Radio />} label="Below average BMI < 20" />
                        </RadioGroup>
                    </FormControl>

                    <TextField 
                            name='weight'
                            label='Weight'
                            variant='outlined'
                            value={formData.weight}
                            onChange={handleChange}
                    />

                    <FormControl>
                        <FormLabel id="VA-group-label" sx={{ textAlign: 'left' }}>
                            Visual Assessment of Risk Skin Area
                        </FormLabel>
                        <FormGroup aria-labelledby="VA-group-label">
                            {[
                            { value: 'healthy', label: 'Healthy - skin appears normal' },
                            { value: 'thin and fragile', label: 'Thin and fragile - looks transparent, tissue paper' },
                            { value: 'dry', label: 'Dry - skin flaky' },
                            { value: 'oedematous', label: 'Oedematous - skin appears puffy' },
                            { value: 'clammy', label: 'Clammy - skin moist, cool to touch' },
                            { value: 'discoloured: pressure injury stage 1', label: 'Discoloured: pressure injury stage 1 - non blanching erythema, dark skin will differ from surrounding skin' },
                            { value: 'broken: pressure injury stages 2, 3, 4', label: 'Broken: pressure injury stages 2, 3, 4 - unstageable, suspected deep tissue injury' },
                            ].map((option) => (
                            <FormControlLabel
                                key={option.value}
                                name='visualAssessment'
                                control={
                                <Checkbox
                                    checked={formData.visualAssessment.includes(option.value)}
                                    onChange={(e) => handleCheckboxChange(e, option.value)}
                                />
                                }
                                label={option.label}
                                sx={{ textAlign: 'left' }}
                            />
                            ))}
                        </FormGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="mobility-group-label" sx={{ textAlign: 'left' }}>Mobility (i.e. bed chair)</FormLabel>
                        <RadioGroup
                            aria-labelledby="mobility-group-label"
                            name="mobility"
                            value={formData.mobility}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="fully able to change position independently" control={<Radio />} label="Fully able to change position independently" sx={{ textAlign: 'left' }}/>
                            <FormControlLabel value="restless/fidgety" control={<Radio />} label="Restless/fidgety - prone to shear and friction" sx={{ textAlign: 'left' }}/>
                            <FormControlLabel value="apathetic" control={<Radio />} label="Apathetic e.g. sedated/depressed reluctant to move" sx={{ textAlign: 'left' }}/>
                            <FormControlLabel value="restricted" control={<Radio />} label="Restricted e.g. mobility restricted by disease, severe pain" sx={{ textAlign: 'left' }}/>
                            <FormControlLabel value="bedbound" control={<Radio />} label="Bedbount e.g. unable to change position self/traction" sx={{ textAlign: 'left' }}/>
                            <FormControlLabel value="chair bound/wheelchair" control={<Radio />} label="Chair bound/wheelchair - unable to leave chair without assistance" sx={{ textAlign: 'left' }}/>
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="continence-group-label" sx={{ textAlign: 'left' }}>Continence</FormLabel>
                        <RadioGroup
                            aria-labelledby="continence-group-label"
                            name="continence"
                            value={formData.continence}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="nocturia/continent/catheterised" control={<Radio />} label="Nocturia/Continent/Catheterised" sx={{ textAlign: 'left' }}/>
                            <FormControlLabel value="incontinent of urine" control={<Radio />} label="Incontinent of Urine - risk of excoriation" sx={{ textAlign: 'left' }}/>
                            <FormControlLabel value="incontinent of faeces" control={<Radio />} label="Incontinent of Faeces - risk of excoriation" sx={{ textAlign: 'left' }}/>
                            <FormControlLabel value="doubly incontinent" control={<Radio />} label="Doubly incontinent - high risk of excoriation" sx={{ textAlign: 'left' }}/>
                        </RadioGroup>
                    </FormControl>

                    <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '20px' }}>Submit</Button>
                </Box>
            </Box>
        </>
    );
}; 

export default WaterlowScale;