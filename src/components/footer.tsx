import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Footer = () => {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          py: 3,
          width: '100%',
          textAlign: 'left',
          position: 'fixed',
          bottom: 0
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1">&copy; {new Date().getFullYear()}</Typography>
        </Container>
      </Box>
    );
  };

  export default Footer;
