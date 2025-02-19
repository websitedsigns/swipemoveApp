import React, { useState } from 'react';
import { Button, Box, Typography, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './SearchFilters.css';

interface SearchFiltersProps {
  onSearch: (filters: { minPrice: number; maxPrice: number; minBedrooms: number; maxBedrooms: number; type: string }) => void;
  onClose: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, onClose }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [maxBedrooms, setMaxBedrooms] = useState(0);
  const [type, setType] = useState('');

  const handleSearch = () => {
    if (maxPrice > 0 && maxPrice < minPrice) {
      alert("Max price must be greater than Min price.");
      return;
    }
    if (maxBedrooms > 0 && maxBedrooms < minBedrooms) {
      alert("Max bedrooms must be greater than Min bedrooms.");
      return;
    }
    onSearch({ minPrice, maxPrice, minBedrooms, maxBedrooms, type });

    // Close modal after search
    onClose();
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(0);
    setMinBedrooms(0);
    setMaxBedrooms(0);
    setType('');
  };

  // Options
  const priceOptions = Array.from({ length: 101 }, (_, i) => i * 10000);
  const bedroomOptions = [0, 1, 2, 3, 4, 5];
  const propertyTypes = ['House', 'Flat'];

  return (
    <>
      {/* Blurred background overlay */}
      <div className="search-modal-overlay" onClick={onClose}></div>

      <Box className="search-modal">
        {/* Close button */}
        <IconButton onClick={onClose} className="close-btn" aria-label="Close filter modal">
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" className="search-filters-title" gutterBottom>
          Search Properties
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', overflowY: 'auto' }}>
          <FormControl fullWidth className="search-filters-form-control">
            <InputLabel>Min Price</InputLabel>
            <Select value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))}>
              {priceOptions.map((price) => (
                <MenuItem key={price} value={price}>£{price.toLocaleString()}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className="search-filters-form-control">
            <InputLabel>Max Price</InputLabel>
            <Select value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}>
              {priceOptions.map((price) => (
                <MenuItem key={price} value={price}>£{price.toLocaleString()}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className="search-filters-form-control">
            <InputLabel>Min Bedrooms</InputLabel>
            <Select value={minBedrooms} onChange={(e) => setMinBedrooms(Number(e.target.value))}>
              {bedroomOptions.map((bedrooms) => (
                <MenuItem key={bedrooms} value={bedrooms}>{bedrooms}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className="search-filters-form-control">
            <InputLabel>Max Bedrooms</InputLabel>
            <Select value={maxBedrooms} onChange={(e) => setMaxBedrooms(Number(e.target.value))}>
              {bedroomOptions.map((bedrooms) => (
                <MenuItem key={bedrooms} value={bedrooms}>{bedrooms}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className="search-filters-form-control">
            <InputLabel>Property Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as string)}>
              {propertyTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
          <Button variant="contained" onClick={handleSearch} className="search-filters-button">
            Search
          </Button>

          <Button variant="outlined" onClick={handleReset} className="search-filters-button">
            Reset
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SearchFilters;
