import React from 'react'
import styles from './PaymentOrderTabCard.module.scss';

const PaymentOrderTabCard = ({title, quantity, price}) => {
  return (
    <div className={styles['PaymentOrderTabCard']}>
        <h2 className={styles['PaymentOrderTabCard__row']}> {title} </h2>
        <h2 className={styles['PaymentOrderTabCard__row']}>  {quantity} </h2>
        <h2 className={styles['PaymentOrderTabCard__row']}>  {quantity * price} </h2>
    </div>
  )
}

export default PaymentOrderTabCard

