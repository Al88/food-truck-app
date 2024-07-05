import React, { useState, useEffect } from 'react';
 // Material UI for styling purpouses
import { Container, Typography, TextField, Grid, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import FoodTruckTable from './FoodTruckTable';
import FoodTruckMap from './FoodTruckMap';
import Papa from 'papaparse';

const StyledContainer = styled(Container)({
  marginTop: '20px',
});

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  // State to keep the truck selected if the name of a result is clicked
  const [selectedTruck, setSelectedTruck] = useState(null);

  useEffect(() => {
    // I would have implemented an API/Endopint in a backend with laravel/lumen if I had more time, I simply converted the csv into an array of objects

    fetch('./data/Mobile_Food_Facility_Permit.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            setData(result.data);
          }
        });
      });
  }, []);

  useEffect(() => {
    // not show any results if the searchterm is empty
    if (searchTerm === '') {
      setFilteredData([]);
      return;
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = data.filter(item => {

      // if at least one element of the data from csv meets the searchterm
      return Object.keys(item).some(key =>
        item[key] && item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });

    // show only 10 results
    setFilteredData(filtered.slice(0, 9));
  }, [searchTerm, data]);

  const handleSearch = () => {
    const filtered = data.filter(item => {
      return Object.keys(item).some(key =>
        item[key] && item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredData(filtered.slice(0, 9));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleIconClick = () => {
    handleSearch();
  };

  const handleCardClick = (truck) => {
    setSelectedTruck(truck);
  };

  return (
    <StyledContainer>
      <Typography variant="h3" gutterBottom>
        San Francisco Food Trucks
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for food trucks by name, address, dishes, etc..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: { marginBottom: '20px' }
        }}
      />
      {searchTerm && filteredData.length > 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <FoodTruckMap data={filteredData} selectedTruck={selectedTruck} />
          </Grid>
          <Grid item xs={12} md={12}>
            <FoodTruckTable data={filteredData} onCardClick={handleCardClick} />
          </Grid>
        </Grid>
      )}
    </StyledContainer>
  );
};

export default App;
