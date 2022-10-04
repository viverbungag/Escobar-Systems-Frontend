import React from 'react'
import styles from './MenuOrderTabCard.module.scss'
import Image from "next/image";
import { Icon } from '@iconify/react';
import addCircle24Filled from '@iconify/icons-fluent/add-circle-24-filled';
import circleMinusFill from '@iconify/icons-akar-icons/circle-minus-fill';
import circleX from '@iconify/icons-akar-icons/circle-x';

const MenuOrderTabCard = ({title, price, quantity, quantityOnChange, handleDeleteItemButtonOnClick}) => {
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
  return (
        <div className={styles['MenuOrderTabCard']}>
          <div className={styles['Txt-Section']}>
            <div className={styles['Title-Section']}>
              <h2> {title}</h2>
                <div className={styles['Counter-Section']}>
                <button onClick={()=>quantityOnChange(title,  quantity, -1)}>
                  <Icon icon={circleMinusFill} height = "24" width="24" color = "#003049"/>

                </button>
                <h2> {quantity} </h2>
                <button onClick={()=>quantityOnChange(title, quantity, 1)}>
    
                  <Icon icon={addCircle24Filled} height = "26" width="26" color = "#003049" />
                </button>

              </div>
            </div>

            <div className={styles['Price-Section']}>
              <p> ₱ {price * quantity}</p>
                <div className={styles['Remove-Section']}>
                  <button onClick={()=>handleDeleteItemButtonOnClick(title)}>
                    <Icon icon={circleX} />


                  </button>           
                </div>
            </div>
          </div>
        </div>

  )
}

export default MenuOrderTabCard

