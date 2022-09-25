import Link from 'next/link';
import React from 'react';
import styles from './MediumButton.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function MediumButton({ label, type }) {
  if(type == "inactivate"){
    console.log("inactive")
    return (
      <div className={styles.container}>
          {label}
      </div>
    )

  }
  // else if(type == 'add'){
  //   return (
  //     <div className={styles.container}>
  //        <AddCircleIcon sx={{ color: 'green'}} /> {label}
  //     </div>
  //   )
  // }
  else{
    return (
      <div className={styles.container}>
          {label}
      </div>
    )

  }
}