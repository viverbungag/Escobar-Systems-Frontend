import Link from 'next/link';
import React from 'react';
import styles from './BigButton.module.scss';

export default function BigButton({ label }) {
  return (
    <div className={styles.container}>
      {label}
    </div>
  )
}