import React from "react";
import styles from "./UnpaidPageCard.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";

const UnpaidPageCard = ({
	ordernum,
	quantity,
	price,
	isSelected,
	voidButtonOnClick,
	orderDate,
}) => {
	const [voidOpen, setVoidOpen] = React.useState(false);
	const handleVoidOpen = () => setVoidOpen(true);
	const handleVoidClose = () => setVoidOpen(false);

	const [payOpen, setPayOpen] = React.useState(false);
	const handlePayOpen = () => setPayOpen(true);
	const handlePayClose = () => setPayOpen(false);

	return (
		<div
			className={[
				styles["UnpaidPageCard"],
				isSelected && styles["UnpaidPageCard--selected"],
			].join(" ")}
		>
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
						<button onClick={handlePayOpen} className={styles["paybutton"]}>
							{" "}
							Pay{" "}
						</button>
						<button onClick={handleVoidOpen} className={styles["voidbutton"]}>
							{" "}
							Void{" "}
						</button>
					</div>

					<div>
						<Modal open={voidOpen} onClose={handleVoidClose}>
							<Box className={styles["Voidstyle"]}>
								<Button
									onClick={handleVoidClose}
									className={styles["Close_Button"]}
								>
									{" "}
									X{" "}
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
												onClick={handleVoidClose}
											>
												{" "}
												Cancel{" "}
											</button>
											<button
												className={styles["Confirm_Button"]}
												onClick={() => voidButtonOnClick(ordernum)}
											>
												{" "}
												Confirm{" "}
											</button>
										</div>
									</div>
								</div>
							</Box>
						</Modal>
					</div>

					<div>
						<Modal open={payOpen} onClose={handlePayClose}>
							<Box className={styles["Paystyle"]}>
								<Button
									onClick={handlePayClose}
									className={styles["Close_Button"]}
								>
									{" "}
									X{" "}
								</Button>
								<div className={styles["Wrapper"]}>
									<div className={styles["Text-Section"]}>
										<div className={styles["Input-Section--Payment"]}>
											<h1> Please input the Customer Payment : </h1>
											<input
												// value={customerPayment}
												// onChange={customerPaymentOnChange}
												type="text"
												id="first"
												className={styles["Input-Forms--Payment"]}
												placeholder="Input the money of the customer"
											/>
										</div>

										<div className={styles["Input-Section--Discount"]}>
											<h1> Input Discount Value : </h1>
											<input
												// value={discountPayment}
												// onChange={discountPaymentOnChange}
												type="text"
												id="first"
												className={styles["Input-Forms--Discount"]}
												placeholder="Input Percentage of the Discount"
											/>
											<h1 className={styles["Percentage"]}> % </h1>
										</div>
									</div>

									<div className={styles["Button-Section"]}>
										<button
											className={styles["Confirm_Button"]}
											onClick={() => voidButtonOnClick(ordernum)}
										>
											{" "}
											Confirm{" "}
										</button>
									</div>
								</div>
								{/* <div className={styles["Button-Section"]}>
     
                          </div> */}
							</Box>
						</Modal>
					</div>
					{/* <Modal open={open} onClose={handleClose}>
        <Box className={styles["style"]}>
          <Button onClick={handleClose} className={styles["Close_Button"]}>
            {" "}
            X{" "}
          </Button>
          <div className={styles["Wrapper"]}>
            <div className={styles["Text-Section"]}>
              <div className={styles["Input-Section--Payment"]}>
                <h1> Please input the Customer Payment : </h1>
                <input
                  value={customerPayment}
                  onChange={customerPaymentOnChange}
                  type="text"
                  id="first"
                  className={styles["Input-Forms--Payment"]}
                  placeholder="Input the money of the customer"
                />
              </div>

              {type === "new-user" ? (
                <div className={styles["Input-Section--Discount"]}>
                  <h1> Input Discount Value : </h1>
                  <input
                    value={discountPayment}
                    onChange={discountPaymentOnChange}
                    type="text"
                    id="first"
                    className={styles["Input-Forms--Discount"]}
                    placeholder="Input Percentage of the Discount"
                  />
                  <h1 className={styles["Percentage"]}> % </h1>
                </div>
              ) : (
                <h3>{`Discount: ${orderDiscount}%`}</h3>
              )}
            </div>
            <div className={styles["Button-Section"]}>
              <ChildModal
                className={styles["Confirm_Button"]}
                payButtonOnClick={payButtonOnClick}
                total={total}
                customerPayment={customerPayment}
                handleMainModalClose={handleClose}
                discountPayment={discountPayment}
                menuOnCategory={menuOnCategory}
                type={type}
                orderDiscount={orderDiscount}
              />
            </div>
          </div>
        </Box>
      </Modal> */}
				</div>
			</div>
		</div>
	);
};

export default UnpaidPageCard;
