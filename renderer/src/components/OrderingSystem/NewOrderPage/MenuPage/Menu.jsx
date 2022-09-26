import React, {useState} from 'react'
import styles from './Menu.module.scss'
import MenuCard from './MenuCard/MenuCard.jsx';
import shortid from 'shortid';

const Menu = ({menus, cartOnChange}) => {

  return (
        <div className={styles['Menu']}>
          {menus && menus.map(menu => {
            return (
              <div className={styles['MenuCardContainer']} key={shortid.generate()} onClick={()=>cartOnChange(menu)}>
                <MenuCard name = {menu.menuName} price ={menu.menuPrice} servings ={menu.numberOfServingsLeft} />
              </div>
            )
          })}
        </div>
  )
}

export default Menu

