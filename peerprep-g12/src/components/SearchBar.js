import React, { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';


const SearchBar = ({ categories, handleFilterQuestion }) => {
  const [difficulty, setDifficulty] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState('');

  // Predefined difficulties
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (difficulty) {
      params.append('difficulty', difficulty);
    }
    
    if (selectedCategories && Array.isArray(selectedCategories)) {
        selectedCategories.forEach(category => {
        params.append('category', category); 
        });
    }
  
    if (title) {
      params.append('title', title);
    }
    handleFilterQuestion(params.toString());
    setDifficulty("");
    setSelectedCategories([]);
    setTitle("");
  };

  return (
    <div
      component="form"
      className='search-bar'
      sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Title Input */}
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Two Sum"
        fullWidth
      />

      {/* Difficulty Dropdown */}
      <FormControl fullWidth className='search-select'>
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          labelId="difficulty-label"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          label="Difficulty"
        >
          {difficulties.map((diff) => (
            <MenuItem key={diff} value={diff}>
              {diff}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Category Dropdown */}
      <FormControl fullWidth margin='normal' className='search-select'>
        <InputLabel id="questionCategory">Question Category</InputLabel>
        <Select
            id='questionCategory'
            label='Question Category'
            multiple
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}

            renderValue={(selected) => (
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {selected.map((value) => (
                    <Chip key={value} label={value} style={{margin: 2}}/>
                ))}
                </div>
            )}
        >
        {categories.map((category) => (
            <MenuItem key={category._id} value={category.name}>
                {category.name}
            </MenuItem>
        ))}
        </Select>
    </FormControl>

      {/* Search Button */}
      <button type="submit" onClick={handleSearch} variant="contained" color="primary" fullWidth>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
