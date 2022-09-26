import React from 'react'
import styles from './MenuSideBarCategory.module.scss'

const MenuSideBarCategory = ({Title, isSelected}) => {
  return (
        <div className={[styles['MenuSideBarCategory'], isSelected && styles["MenuSideBarCategory--selected"]].join(" ")}>
            <p> {Title} </p>
        </div>
  )
}

export default MenuSideBarCategory


