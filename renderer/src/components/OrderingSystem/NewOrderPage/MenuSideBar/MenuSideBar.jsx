import React, { useState, useEffect } from 'react';
import styles from './MenuSideBar.module.scss'
import Image from "next/image";
import  MenuSideBarCategory from './MenuSideBarCategory/MenuSideBarCategory.jsx';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import arrowBack from '@iconify/icons-bx/arrow-back';

const MenuSideBar = ({items, categoryOnChange, currentMenuCategory}) => {

  return (
    <div className={styles['MenuSideBar']}>
        <div className={styles['back-section']} >
        <Link href = "/OrderingSystem/dashboard"> 
        <button>
          <Icon icon={arrowBack}  height = "24" width = "24" color = "#003049"/>
        </button>
        </Link>
        <p> Back </p>
        </div>
        <div className={styles['img-section']}>
        <Image
            src="/OrderingSystem/images/logo.png" 
            alt="Escobar Logo"
            width = '85'
            height = '85'
            objectFit='contain'
            draggable = 'false'
        /> 
        </div>

        {items.map((item) =>{
            return(
              <div key={item} className={styles['wrapper']} onClick={()=>categoryOnChange(item)}>
                <MenuSideBarCategory Title={item} isSelected={item === currentMenuCategory}/>
              </div>
            )
          })}
      </div>        

     
  )
}

export default MenuSideBar

