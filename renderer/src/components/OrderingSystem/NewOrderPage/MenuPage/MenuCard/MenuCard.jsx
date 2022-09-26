import React from 'react'
import styles from './MenuCard.module.scss'
import Image from "next/image";

const MenuCard = ({name, price, servings}) => {
  
  return (
        <div className={styles['MenuCard']} >
                <div className={[styles["wrapper"], servings===0 && styles["wrapper--zeroserving"]].join(" ")}>
                    <p> ₱ {price}  </p>
                    <h1> {name}</h1>
                    <p className={[styles["servings"], servings===0 && styles["servings--zeroserving"]].join(" ")}>Servings Left: {servings} </p>
            </div>
        </div> 

  )
}

export default MenuCard

