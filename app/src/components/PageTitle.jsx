import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search, FilterAltOutlined, ArrowBackIos } from "@mui/icons-material";
import PropTypes from 'prop-types';

function PageTitle({ title }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    // show back arrow only if in patient screen
    const showBackArrow = location.pathname.includes("/patient");

    return (
        <> 
            <Box sx={{
                backgroundColor: `${theme.palette.secondary.main}`,
                width: '100vw',
                height: '50px',
                boxShadow: 3,
                alignContent: 'center',
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Box sx={{flex: 1, textAlign: 'left', paddingLeft: '5px', fontSize: '30px' }}>
                    { showBackArrow && (
                        <IconButton onClick={() => {navigate(-1)}}>
                            <ArrowBackIos />
                        </IconButton>
                    )}
                </Box>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '30px',
                    flex: 1
                }}>{title}</Typography>
                <Box sx={{
                    flex: 1,
                    alignContent: 'center',
                }}>
                    <Search sx={{ fontSize: '30px', marginRight: '20px' }} />
                    <FilterAltOutlined sx={{ fontSize: '30px' }} />
                </Box>
            </Box>
        </>
    );
}; 

// make it so that the title prop is required every time you use it, otherwise it will throw an error on the console when viewing the page
PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

export default PageTitle;