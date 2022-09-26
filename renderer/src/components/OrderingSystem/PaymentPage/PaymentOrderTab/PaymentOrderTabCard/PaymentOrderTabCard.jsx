import React from 'react'
import styles from './PaymentOrderTabCard.module.scss';

const PaymentOrderTabCard = ({title, quantity, price}) => {
  return (
    <div className={styles['PaymentOrderTabCard']}>
        <h2 className={styles['Title']}> {title} </h2>
        <h2 className={styles['Quantity']}>  {quantity} </h2>
        <h2 className={styles['Price']}>  {quantity * price} </h2>
    </div>
  )
}

export default PaymentOrderTabCard

