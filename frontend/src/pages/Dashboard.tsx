import React from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Card, 
  CardContent, 
  CircularProgress 
} from '@mui/material';
import { 
  Inventory as InventoryIcon, 
  Warning as WarningIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { useQuery } from 'react-query';
import { getProducts, getLowStockProducts } from '../api/productApi';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Fetch products
  const { data: productsData, isLoading: productsLoading } = useQuery(
    'products', 
    () => getProducts()
  );
  
  // Fetch low stock products
  const { data: lowStockProducts, isLoading: lowStockLoading } = useQuery(
    'lowStockProducts', 
    getLowStockProducts
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Overview cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <InventoryIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  {productsLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    productsData?.total || 0
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Products
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <WarningIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  {lowStockLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    lowStockProducts?.length || 0
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Low Stock Items
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <TimelineIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  {/* This would typically be actual data from your backend */}
                  24
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recent Transactions
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Low stock products */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Low Stock Items
        </Typography>
        
        {lowStockLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : lowStockProducts && lowStockProducts.length > 0 ? (
          <Grid container spacing={2}>
            {lowStockProducts.slice(0, 5).map((product) => (
              <Grid item xs={12} key={product._id}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {product.name}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        SKU: {product.sku}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">
                        Quantity: {product.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">
                        Min Stock: {product.minimumStock}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography>No low stock items found</Typography>
          </Box>
        )}
      </Paper>
      
      {/* Recent activity */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Recent Activity
        </Typography>
        
        {/* This would typically be actual data from your backend */}
        <Typography variant="body2">
          No recent activity to display
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;