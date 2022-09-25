import React from 'react'
import styles from './SidebarCategory.module.scss'

const SidebarCategory = ({Title, isActive}) => {
  return (
    <div className={[styles["SidebarCategory"], isActive && styles["Selected"]].join(" ")}>
      <p> {Title} </p>
    </div>
  )
}

export default SidebarCategory

