import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./ItemsSelect";

const ItemsSelect = ({ label, items, selectedItem, itemOnChange }) => {
  return (
    <div className={styles["items-select"]}>
      <FormControl variant="standard" sx={{ minWidth: 230 }}>
        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedItem}
          onChange={itemOnChange}
          label="Age"
          fullWidth
          disabled={items.length <= 0 && selectedItem === undefined}
        >
          {items.length > 0 ? (
            items.map((item, index) => {
              return (
                <MenuItem key={item + index} value={item}>
                  {item}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={selectedItem}>{selectedItem}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default ItemsSelect;
