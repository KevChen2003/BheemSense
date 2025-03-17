import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search, FilterAltOutlined } from "@mui/icons-material";
import PropTypes from 'prop-types';

function PageTitle({ title }) {
    const theme = useTheme();

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
                <Box sx={{flex: 1}}/>
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