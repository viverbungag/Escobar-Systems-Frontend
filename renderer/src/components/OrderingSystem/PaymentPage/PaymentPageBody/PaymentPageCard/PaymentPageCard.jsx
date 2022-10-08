import React, {useState, useEffect} from 'react'
import styles from './PaymentPageCard.module.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Image from "next/image";
import AdminPasswordModal from '../../../../Shared/AdminPasswordModal/AdminPasswordModal';

const PaymentPageCard = ({
  ordernum,
  quantity,
  price,
  isSelected,
  voidButtonOnClick,
  orderDate,
  voidPassword
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [adminPasswordModalOpen, setAdminPasswordModalOpen] = useState(false);
  const handleAdminPasswordModalOpen = () => setAdminPasswordModalOpen(true);
  const handleAdminPasswordModalClose = () => setAdminPasswordModalOpen(false);

  return (
    <div
      className={[
        styles["PaymentPageCard"],
        isSelected && styles["PaymentPageCard--selected"],
      ].join(" ")}
    >
      <AdminPasswordModal
        openModal={adminPasswordModalOpen}
        handleCloseModal={handleAdminPasswordModalClose}
        voidButtonOnClick={voidButtonOnClick}
        ordernum={ordernum}
        voidPassword={voidPassword}
      />
      <div className={styles["Section"]}>
        <div className={styles["First-Section"]}>
          <h3> Order # {ordernum} </h3>
          <div className={styles["Quantity-Section"]}>
            <h3> Number of Items: {quantity} </h3>
          </div>
        </div>

        <div className={styles["Second-Section"]}>
          <h4 className={styles["Order-Time"]}>
            {" "}
            Order Time: {orderDate.split("T").join(" – ")}{" "}
          </h4>
          <div className={styles["Price-Section"]}>
            <button onClick={handleOpen}> Void </button>
          </div>
          <div>
            <Modal open={open} onClose={handleClose}>
              <Box className={styles["style"]}>
                <Button
                  onClick={handleClose}
                  className={styles["Close_Button"]}
                >
                  X
                </Button>
                <div className={styles["Wrapper"]}>
                  <div className={styles["Image-Section"]}>
                    <Image
                      src="/OrderingSystem/images/logo.png"
                      alt="Escobar Logo"
                      width="100"
                      height="100"
                      objectFit="contain"
                    />
                  </div>

                  <div className={styles["Text-Section"]}>
                    <h1> Are You Sure You want to Delete the Order? </h1>
                    <div className={styles["Button-Section"]}>
                      <button
                        className={styles["Cancel_Button"]}
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        className={styles["Confirm_Button"]}
                        onClick={handleAdminPasswordModalOpen}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPageCard

