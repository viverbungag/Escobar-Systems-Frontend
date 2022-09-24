import FilterSelect from "./FilterSelect";
import React, { useState, useEffect } from 'react';


const items = [
    'Menu Category 1',
    'Menu Category 2',
    'Menu Category 3',
    'Menu Category 4',
    'Menu Category 5',
    'Menu Category 6',
];

const FilterSelectWrapper = () =>{
    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setSelectedItems(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      return (<FilterSelect items={items} selectedItems={selectedItems} handleChange={handleChange}/>)
}


export default{
    title: "Components/Menu Category/Filter Select",
    component: FilterSelectWrapper
}

export const Basic = {
    args:{}
}