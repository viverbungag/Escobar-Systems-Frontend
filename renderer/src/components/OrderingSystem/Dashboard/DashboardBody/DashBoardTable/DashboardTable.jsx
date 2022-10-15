import React, { useState } from "react";
import styles from "./DashBoardTable.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";

const DashboardTable = ({ unavailableMenu }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectMenu, setSelectedMenu] = useState([]);

  const handleOnClickModal = (unavailableMenu) => {
    setSelectedMenu(unavailableMenu);
    handleOpen();
  };

  return (
    <div className={styles["container"]}>
      <h1 className={styles["Title"]}> Out of Stock Items </h1>
      <table>
        <thead>
          <tr>
            <th> Item </th>
            <th> Status </th>
          </tr>
        </thead>
        <tbody>
          {unavailableMenu &&
            unavailableMenu.map((unavailableMenu) => (
              <tr key={unavailableMenu.menuId}>
                <td>
                  <button
                    onClick={() => {
                      handleOnClickModal(unavailableMenu);
                    }}
                    className={styles["column__clickable"]}
                  >
                    {unavailableMenu.menuName}
                    dsadasdasdasdasdasdasdasdasddsadasdasdasdasdasdasdasdasd
                  </button>
                  <div>
                    <Modal open={open} onClose={handleClose}>
                      <Box className={styles["style"]}>
                        <Button
                          onClick={handleClose}
                          className={styles["Close_Button"]}
                        >
                          {" "}
                          X{" "}
                        </Button>
                        <div className={styles["Image-Section"]}>
                          <Image
                            src="/OrderingSystem/images/logo.png"
                            alt="Escobar Logo"
                            width="40"
                            height="40"
                            objectFit="contain"
                          />
                        </div>
                        <div className={styles["Wrapper"]}>
                          <div className={styles["Text-Section"]}>
                            <h1> Menu Id: {selectMenu.menuId} </h1>
                            <h1> Menu Name: {selectMenu.menuName} </h1>
                            <h1> Menu Price: {selectMenu.menuPrice} </h1>
                            <h1>
                              {" "}
                              Menu Category: {selectMenu.menuCategoryName}{" "}
                            </h1>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </td>
                <td>
                  <p className={styles["column__unclickable"]}>Out of Stock</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
