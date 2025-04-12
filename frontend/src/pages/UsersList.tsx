import React from 'react';
import { Typography, Box } from '@mui/material';

const UsersList: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      <Typography>
        Users list will be implemented here
      </Typography>
    </Box>
  );
};

export default UsersList;