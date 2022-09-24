import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({selected, handleChange}) {


  return (
    <Box sx={{ minWidth: 120, maxWidth: 145}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Rows</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          onChange={handleChange}
          label="Rows"
        >
          <MenuItem value={5}>5 per page</MenuItem>
          <MenuItem value={10}>10 per page</MenuItem>
          <MenuItem value={25}>25 per page</MenuItem>
          <MenuItem value={50}>50 per page</MenuItem>
          <MenuItem value={100}>100 per page</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}