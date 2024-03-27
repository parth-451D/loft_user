import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import moment from "moment";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [unitData, setUnitData] = useState(null);
  const navigate = useNavigate();
  const [myData, setMyData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const storedValues = JSON.parse(localStorage.getItem("values"));
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
  const checkInDateDiff = moment(bookingDetails?.checkInDate);
  const checkOutDateDiff = moment(bookingDetails?.checkOutDate);

  const diffInDays = checkOutDateDiff.diff(checkInDateDiff, "days");

  const paymentSchema = Yup.object().shape({
    cardHolderName: Yup.string().required("card Holder Name is Required"),

    cardNumber: Yup.string()
      .required("card Number is Required")
      .min(16, "card Number must be at 16 digits")
      .max(16, "card Number must be at 16 digits"),
    expiryDate: Yup.string()
      .required("expiry Date is Required")
      .min(4, "expiry Date be at 4 digits")
      .max(4, "expiry Date be at 4 digits"),
    cvv: Yup.string()
      .required("cvv is Required")
      .min(3, "CVV must be at 3 digits")
      .max(3, "CVV must be at 3 digits"),
  });

  const getUnitData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/units/flats/${
          bookingDetails.unitId
        }?start_date=${moment(bookingDetails.checkInDate).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(bookingDetails.checkOutDate).format(
          "YYYY-MM-DD"
        )}`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );
      setUnitData(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const userPayment = async (values) => {
    values.expiryDate = values.expiryDate.replace(/\D/g, "");

    const paylod = {
      ...values,
      ...storedValues,
      flatId: unitData?.id,
      price_per_day: unitData.newPrice ? unitData.newPrice : unitData.price,
      cleaning_fees: unitData?.cleaning_fees || 0,
      start_date: moment(bookingDetails?.checkInDate).format("YYYY-MM-DD"),
      end_date: moment(bookingDetails?.checkOutDate).format("YYYY-MM-DD"),
      deposit: unitData?.cleaning_fees || 0,
      amount: unitData.newPrice
        ? unitData.newPrice * diffInDays
        : unitData.price * diffInDays +
          (unitData?.cleaning_fees || 0) +
          (unitData?.deposit || 0),
    };

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/booking/book-flat`,
        paylod,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.code === 200) {
        SuccessAlert({ title: res.data.msg });
        localStorage.removeItem("bookingDetails");
        localStorage.removeItem("values");
        navigate("/home");
      }
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUnitData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="flex items-center">
            <div className="comman-midium-grey">
              <p>Floor 1 /</p>
            </div>
            <div className="comman-midium-grey mx-2">
              <p>Unit 102 /</p>
            </div>
            <div className="comman-midium-grey mx-2">
              <p>Book Property /</p>
            </div>
            <div className="comman-blog-header mx-2">
              <p> Payment</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 top">
            <div className="col-span-12 lg:col-span-6">
              <Formik
                initialValues={myData}
                // validationSchema={paymentSchema}
                onSubmit={(values) => {
                  userPayment(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <div className="payment-info">
                    <div className="login-input">
                      <div className="comman-grey">
                        <p>Card Number </p>
                      </div>
                      <input
                        type="number"
                        className="input-box mt-1"
                        placeholder="Card Number "
                        value={values.cardNumber}
                        name="cardNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="text-red-600">
                      {errors.cardNumber &&
                        touched.cardNumber &&
                        errors.cardNumber}
                    </div>

                    <div className="flex items-center mt-4">
                      <div className="login-input flex flex-col">
                        <div className="comman-grey">
                          <p>Exp. Date</p>
                        </div>
                        <input
                          type="text"
                          className="input-box mt-1"
                          placeholder="MM/YY"
                          value={values.expiryDate}
                          name="expiryDate"
                          onChange={(e) => {
                            const { value } = e.target;
                            const onlyNumbers = value.replace(/\D/g, "");
                            if (onlyNumbers.length <= 4) {
                              const formatted = onlyNumbers.replace(
                                /(\d{2})(\d{0,2})/,
                                "$1/$2"
                              );
                              handleChange({
                                target: {
                                  name: "expiryDate",
                                  value: formatted,
                                },
                              });
                            }
                          }}
                          onBlur={handleBlur}
                        />

                        <div className="text-red-600">
                          {errors.expiryDate &&
                            touched.expiryDate &&
                            errors.expiryDate}
                        </div>
                      </div>

                      <div className="login-input ml-4">
                        <div className="comman-grey">
                          <p>CVV</p>
                        </div>
                        <input
                          type="number"
                          className="input-box mt-1"
                          placeholder="CVV"
                          value={values.cvv}
                          name="cvv"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="text-red-600">
                          {errors.cvv && touched.cvv && errors.cvv}
                        </div>
                      </div>
                    </div>

                    <div className="login-input mt-3">
                      <div className="comman-grey">
                        <p>Card Holder Name</p>
                      </div>
                      <input
                        type="text"
                        className="input-box mt-1"
                        placeholder="Card Holder Name"
                        value={values.cardHolderName}
                        name="cardHolderName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="text-red-600">
                      {errors.cardHolderName &&
                        touched.cardHolderName &&
                        errors.cardHolderName}
                    </div>

                    <div className="mt-3">
                      <button
                        type="button"
                        class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                      focus:outline-none comman-bg w-full"
                        onClick={handleSubmit}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className=" payment-info">
                <div className="comman-blog-header">
                  <p>Premium Luxury</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>
                      ${" "}
                      {unitData?.newPrice
                        ? unitData?.newPrice
                        : unitData?.price}
                      * {diffInDays} Days
                    </p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>
                      {" "}
                      <p>
                        ${" "}
                        {unitData?.newPrice
                          ? unitData?.newPrice * diffInDays
                          : unitData?.price * diffInDays}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>Clean and Dry</p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>${unitData?.cleaning_fees}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>Deposit</p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>${unitData?.deposit | 0}</p>
                  </div>
                </div>

                <div class="border-b border-solid border-grey-500 mt-3"></div>

                <div className="flex justify-between items-center mt-3">
                  <div className="comman-blue-font">
                    <p>Total</p>
                  </div>
                  <div className="comman-blue-font">
                    <p>
                      ${" "}
                      {unitData?.newPrice
                        ? unitData?.newPrice * diffInDays
                        : unitData?.price * diffInDays +
                          (unitData?.cleaning_fees || 0) + // Added parentheses to ensure proper addition
                          (unitData?.deposit || 0)}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
