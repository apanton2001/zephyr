import React from 'react';
import { Typography, Box } from '@mui/material';

const ProductsList: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      <Typography>
        Products list will be implemented here
      </Typography>
    </Box>
  );
};

export default ProductsList;