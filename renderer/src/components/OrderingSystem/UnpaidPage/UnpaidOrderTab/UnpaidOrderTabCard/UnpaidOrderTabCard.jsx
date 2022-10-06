import React from 'react'
import styles from './UnpaidOrderTabCard.module.scss';

const UnpaidOrderTabCard = ({title, quantity, price}) => {
  return (
    <div className={styles['UnpaidOrderTabCard']}>
        <h2 className={styles['UnpaidOrderTabCard__row']}> {title} </h2>
        <h2 className={styles['UnpaidOrderTabCard__row']}>  {quantity} </h2>
        <h2 className={styles['UnpaidOrderTabCard__row']}>  {quantity * price} </h2>
    </div>
  )
}

export default UnpaidOrderTabCard

