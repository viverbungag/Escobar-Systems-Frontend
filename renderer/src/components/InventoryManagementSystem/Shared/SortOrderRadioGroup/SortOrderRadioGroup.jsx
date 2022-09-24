import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const SortOrderRadioGroup = ({ sortOrder, handleChange }) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={sortOrder}
        onChange={handleChange}
      >
        <FormControlLabel
          value={"Ascending"}
          control={<Radio />}
          label="Ascending"
        />
        <FormControlLabel
          value={"Descending"}
          control={<Radio />}
          label="Descending"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SortOrderRadioGroup;
