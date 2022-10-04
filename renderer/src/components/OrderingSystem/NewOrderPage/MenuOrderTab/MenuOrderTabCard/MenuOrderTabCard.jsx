import React from 'react'
import styles from './MenuOrderTabCard.module.scss'
import Image from "next/image";

const MenuOrderTabCard = ({title, price, quantity, quantityOnChange, handleDeleteItemButtonOnClick}) => {

  return (
        <div className={styles['MenuOrderTabCard']}>
          <div className={styles['Txt-Section']}>
            <div className={styles['Title-Section']}>
              <h2> {title}</h2>
                <div className={styles['Counter-Section']}>
                <button onClick={()=>quantityOnChange(title,  quantity, -1)}>
                <Image
                  src="/OrderingSystem/images/counter.svg"
                  alt="minus icon"
                  width="25"
                  height="25"
                  objectFit="cover"
                  draggable = 'false'
                />  
                </button>
                <h2> {quantity} </h2>
                {/* <button onClick={()=>quantityOnChange(title, quantity, 1)}>
                <Image

                />      
                <Icon 
                icon="carbon:add-filled" 
                />
    
                </button> */}
                <button onClick={()=>quantityOnChange(title, quantity, 1)}>
                <Image
                  src="/OrderingSystem/images/counter-add.svg"
                  alt="add icon"
                  width="25"
                  height="25"
                  objectFit="cover"
                  draggable = 'false'
                />      
                </button>
              </div>
            </div>

            <div className={styles['Price-Section']}>
              <p> ₱ {price * quantity}</p>
                <div className={styles['Remove-Section']}>
                  <button onClick={()=>handleDeleteItemButtonOnClick(title)}>
                    <Image
                      src="/OrderingSystem/images/remove.svg"
                      alt="remove icon"
                      width="15"
                      height="15"
                      objectFit="cover"
                      draggable = 'false'
                    />  
                  </button>           
                </div>
            </div>
          </div>
        </div>

  )
}

export default MenuOrderTabCard

