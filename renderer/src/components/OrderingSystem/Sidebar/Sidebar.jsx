import React from 'react'
import styles from './Sidebar.module.scss'
import Image from "next/image";
import SidebarCategory from "./SidebarCategory/SidebarCategory.jsx";
import Link from 'next/link';
import { useRouter } from "next/router";

const Sidebar= ({page}) => {

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  };

  return (
  
      <div className={styles['sidenav']}>
        <div className={styles['wrapper']}>
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

        <Link href="/OrderingSystem/neworder">
        <div className={styles['wrapper']}>
        <SidebarCategory Title = 'New Order'/>
        </div>
        </Link>

        <Link href="/OrderingSystem/dashboard">
        <div className={styles['wrapper']}>
        <SidebarCategory isActive = {page==="dashboard"} Title = 'Dashboard'/>
        </div>
        </Link>

        <Link href="/OrderingSystem/unpaid">
        <div className={styles['wrapper']}>
        <SidebarCategory isActive = {page==="unpaid"} Title = 'Unpaid'/>
        </div>
        </Link>

        <Link href="/OrderingSystem/payment">
        <div className={styles['wrapper']}>
        <SidebarCategory isActive = {page==="paymentpage"} Title = 'Paid'/>
        </div>
        </Link>


        <div className={styles['wrapper']}>
        <SidebarCategory Title = 'Back' onClick = {handleBackButtonOnClick} />
        </div>


        </div>
  )
}

export default Sidebar

