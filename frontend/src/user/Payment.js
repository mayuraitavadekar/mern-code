import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import "../assets/css/payment.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getCourseByName } from "../core/helper/coreapicalls";
import {
  createPaymentOrder,
  verifyPayment,
} from "../core/helper/paymentapicalls";
import {
  createOrder,
  pushOrderInUserPurchaseList,
} from "./helper/userapicalls";

// loadscript function
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const __DEV__ = document.domain === "localhost";

const Payment = ({ match, history, location }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    _id: "",
    name: "",
    price: "",
    category: "",
    error: false,
    loading: false,
    success: false,
  });

  const { _id, name, loading, price, category } = values;

  const [payButtonValues, setPayButtonValues] = useState({
    status: "Pay Now", // initiated.. processing.. not verified.. verified..
    isDisabled: false,
  });

  const [modalShow, setModalShow] = useState(false);

  const preload = (courseName) => {
    setValues({ ...values, loading: true });
    courseName = courseName.replace(/%20/g, " ");
    getCourseByName({ courseName })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            _id: data._id,
            name: data.name,
            price: data.price,
            category: data.category.name,
            success: true,
            error: false,
            loading: false,
          });
        }
      })
      .catch((err) => console.log("error in getCourseByName in the frontend"));
  };

  useEffect(() => {
    preload(match.params.courseName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayRazorpay = async () => {
    setPayButtonValues({
      ...payButtonValues,
      isDisabled: true,
      status: "initiated",
    });
    let res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert(
        "Payment page is not loading. Please check your internet connection."
      );
      return;
    }

    createPaymentOrder(user._id, token, { price }).then((data) => {
      setPayButtonValues({
        ...payButtonValues,
        isDisabled: true,
        status: "processing",
      });
      if (data.error) {
        console.log("error in creating payment order in frontend");
      } else {
        const options = {
          key: __DEV__ ? "rzp_test_AWveoT5JKWrAYF" : "PRODUCTION_KEY",
          currency: "INR",
          amount: parseInt(price) * 100,
          order_id: data.id,
          name: "educulture.co.in",
          description: `${name}`,
          image: "",
          handler: function (response) {
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_signature);

            let order_id = response.razorpay_order_id;
            let payment_id = response.razorpay_payment_id;
            let signature = response.razorpay_signature;

            verifyPayment(user._id, token, {
              razorpay_order_id: order_id,
              razorpay_payment_id: payment_id,
              razorpay_signature: signature,
            })
              .then((data) => {
                // console.log("verified : ", data);
                if (data.error) {
                  setPayButtonValues({
                    ...payButtonValues,
                    isDisabled: true,
                    status: "not verified",
                  });
                } else {
                  setPayButtonValues({
                    ...payButtonValues,
                    isDisabled: true,
                    status: "verified",
                  });

                  // create order into the database //TODO: this is gonna take more entities in upcoming time
                  const orderData = {
                    user: user._id,
                    course: name,
                    amount: price,
                    razorpay_order_id: order_id,
                    razorpay_payment_id: payment_id,
                    razorpay_signature: signature,
                    payment_status: "verified",
                  };

                  createOrder(user, token, orderData).then((data) => {
                    if (data.error) {
                      console.log(
                        "error in storing order data in the database"
                      );
                    } else {
                      console.log(
                        "data has been successfully stored in the database."
                      );
                    }
                  });
                  setModalShow(true);
                }
              })
              .catch((err) =>
                console.log("error in verifying payment in front", err)
              );
            // push order in the purchase list
            pushOrderInUserPurchaseList(user, token, _id, {
              name,
              category,
              price,
              payment_id,
            })
              .then((data) => {
                if (data.error) {
                  console.log("error in pushing order in user purchase list");
                } else {
                  console.log(
                    "order has been successfully pushed in user purchase list."
                  );
                }
              })
              .catch((err) =>
                console.log("erro in pushOrderInPurchaseList in frontend", err)
              );
          },
          prefill: {
            name: user.name + " " + user.lastname,
            email: user.email,
            contact: "8975399519",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    });
  };

  const PrintModal = () => {
    return (
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="m-auto" id="contained-modal-title-vcenter">
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            You have purchased{" "}
            <span>
              <b>{name}</b>
            </span>{" "}
            successfully. Thank you for your enrollment. Click on{" "}
            <span>
              <b>Your Enrollments</b>
            </span>{" "}
            to start watching the course content.
          </p>
        </Modal.Body>
        <Modal.Footer className="m-auto">
          <Button as={Link} to="/user/courses">
            Your Enrollments
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const PaymentReceipt = () => {
    return (
      <div id="payment-receipt">
        <Base />
        <Container className="border mt-2">
          <h3 className="text-left m-2">Invoice</h3>
          <hr className="" />
          <Row>
            <Col>
              <p className="font-weight-bold text-left p-2">Billed to</p>
              <p className="text-left p-2">
                Name: {user.name + " " + user.lastname}
              </p>
              <p className="text-left p-2">Email: {user.email}</p>
              <p className="text-left p-2">Expires on: 21/11/2021</p>
            </Col>
            <Col>
              <p className="font-weight-bold text-right p-2">Payment Method</p>
              <p className="font-weight-bold text-right p-2">
                Razorpay online payment gateway
              </p>
            </Col>
          </Row>
          <hr className="" />
          <Card className="mb-2" style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title className="text-center font-weight-bold mt-2">
                Order Details
              </Card.Title>
              <hr className="" />
              <Card.Text as={Col}>
                <Row>
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <p className="text-left p-2">Course Name </p>
                    <p className="text-left p-2">Item Total </p>
                    <p className="text-left p-2">Discount </p>
                    <p className="text-left p-2">Total</p>
                    <hr className="" />
                    <p className="text-left p-2 font-weight-bold">
                      Amount Payable
                    </p>
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8}>
                    <p className="text-right p-2">{name}</p>
                    <p className="text-right p-2">₹{price}</p>
                    <p className="text-right p-2">₹0</p>

                    <p className="text-right p-2">₹{price}</p>
                    <hr className="" />
                    <p className="text-right p-2 font-weight-bold">₹{price}</p>
                  </Col>
                </Row>
              </Card.Text>
              <Row>
                <Col className="text-center">
                  {payButtonValues.status !== "verified" ? (
                    <div>
                      <Button
                        disabled={payButtonValues.isDisabled}
                        className="pay-btn p-2"
                        onClick={displayRazorpay}
                      >
                        {payButtonValues.status}
                      </Button>
                      <p className="secure-connection">
                        <i
                          className="fa fa-lock fa-fw p-2"
                          aria-hidden="true"
                        ></i>
                        &nbsp;You have secure connection.
                      </p>
                    </div>
                  ) : (
                    <p className="secure-connection">
                      <i
                        className="fa fa-lock fa-fw p-2"
                        aria-hidden="true"
                      ></i>
                      &nbsp;Payment has been verified. Thank you.
                    </p>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  };

  //TODO: main payment component
  return (
    <div>
      {!loading ? (
        <div>
          {PaymentReceipt()}
          {PrintModal()}
        </div>
      ) : (
        <div className="text-center spinner">
          <Spinner animation="border" variant="primary" />
          <p>Loading.. Please Wait.</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
