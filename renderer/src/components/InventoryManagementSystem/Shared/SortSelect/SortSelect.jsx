import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SortSelect = ({ sortItems, selectedSort, handleChange }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Sort</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectedSort}
        label="Sort"
        onChange={handleChange}
      >
        <MenuItem value="None">
          <em>None</em>
        </MenuItem>
        {sortItems.map((sortItem, index) => {
          return (
            <MenuItem key={sortItem.label + index} value={sortItem.label}>
              {sortItem.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SortSelect;
