import React from 'react';
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    fontFamily: 'Inter, sans-serif', 
    palette: {
        primary: {
            main: '#0094AE'
        },
        secondary: {
            main: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: 'Inter, sans-serif'
    }
});

export default theme;