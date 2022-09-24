import RowSelect from "./RowSelect";
import React, { useState } from 'react';


const RowSelectWrapper = () => {
    const [selected, setSelected] = React.useState(5);

    const handleChange = (event) => {
      setSelected(event.target.value);
    };

    return <RowSelect selected={selected} handleChange={handleChange}/>
}

export default{
    title: "Components/Shared/Row Select",
    component:RowSelectWrapper
}

export const Basic = {
    args:{

    }
}