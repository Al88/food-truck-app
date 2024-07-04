import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const FoodTruckTable = ({ data, onCardClick }) => {

    const [selectedTruck, setSelectedTruck] = useState(null);
    const handleClick = (truck) => {
        setSelectedTruck(truck);
        onCardClick(truck);
      };

  return (
    <Grid container spacing={2}>
      {data.map((truck, index) => (
        <Grid item xs={12}  key={index}>
          <Card className="food-truck-card">
            <CardContent>
            <Typography variant="h5" component="div" onClick={() => handleClick(truck)} className="link">
                <span>{truck.Applicant} - {truck.FacilityType}</span>
              </Typography>
              <Typography variant="body1">
                <span>{truck.Address}</span>
              </Typography>
              <Typography variant="body2">
                 <span>{truck.FoodItems}</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FoodTruckTable;
