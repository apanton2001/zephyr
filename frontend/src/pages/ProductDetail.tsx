import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Detail
      </Typography>
      <Typography>
        Product detail for ID: {id}
      </Typography>
    </Box>
  );
};

export default ProductDetail;