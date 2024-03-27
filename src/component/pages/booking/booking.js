import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";

const Booking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imagebuffer, setImageBuffer] = useState(null);

  const [myData, setMyData] = useState({
    full_name: "",
    email: "",
    number: "",
    reason: "",
    id_proof: "",
  });

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    number: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Mobile number is required"),
    reason: Yup.string().required("Reason is required"),
    // id_proof: Yup.mixed().required("ID proof is required"),
  });

  const submitPaymentInfo = async (values) => {
    setIsLoading(true);

    let formData = new FormData();
    formData.append("image", imagebuffer);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/upload`,
        formData
      );
      setImage(res.result);

      if (res.data.code === 200) {
        localStorage.setItem(
          "values",
          JSON.stringify({ ...values, id_proof: res.data.result })
        );
        navigate("/payment");
      }
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (e) => {
    setImageBuffer(e.target.files[0]);
  };

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
            <div className="comman-blog-header mx-2">
              <p> Book Property</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 top">
            <div className="col-span-12 lg:col-span-6">
              <Formik
                initialValues={myData}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  submitPaymentInfo(values);
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
                }) => (
                  <div className="payment-info">
                    <div className="login-input">
                      <div className="comman-grey">
                        <p>Name</p>
                      </div>
                      <input
                        type="text"
                        className="input-box mt-1"
                        placeholder="Name"
                        value={values.full_name}
                        name="full_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="text-red-600">
                      {errors.full_name &&
                        touched.full_name &&
                        errors.full_name}
                    </div>

                    <div className="flex items-center mt-4">
                      <div className="login-input flex flex-col">
                        <div className="comman-grey">
                          <p>E-mail</p>
                        </div>
                        <input
                          type="email"
                          className="input-box mt-1"
                          placeholder="E-mail"
                          value={values.email}
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="text-red-600">
                          {errors.email && touched.email && errors.email}
                        </div>
                      </div>

                      <div className="login-input ml-4 flex flex-col">
                        <div className="comman-grey">
                          <p>Phone Number</p>
                        </div>
                        <input
                          type="number"
                          className="input-box mt-1"
                          placeholder="Phone Number"
                          value={values.number}
                          name="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="text-red-600">
                          {errors.number && touched.number && errors.number}
                        </div>
                      </div>
                    </div>

                    <div className="login-input mt-4">
                      <div className="comman-grey">
                        <p>Reason to stay</p>
                      </div>
                      <textarea
                        type="text"
                        className="text-area mt-1"
                        value={values.reason}
                        name="reason"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Write here..."
                      />
                    </div>
                    <div className="text-red-600">
                      {errors.reason && touched.reason && errors.reason}
                    </div>

                    <div className="login-input mt-3">
                      <div className="comman-grey">
                        <p>Upload ID Proof</p>
                      </div>
                      <input
                        type="file"
                        className="input-box mt-1"
                        placeholder="Phone Number"
                        onChange={uploadImage}
                      />
                    </div>
                    {/* <div className="text-red-600">
                      {errors.id_proof && touched.id_proof && errors.id_proof}
                    </div> */}

                    <div className="mt-3">
                      <button
                        type="button"
                        class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                      focus:outline-none comman-bg w-full"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="payment-info">
                <div className="flex items-center">
                  <div className="box-payment">
                    <img
                      src="/images/room.png"
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="mx-3">
                    <p className="comman-blog-header">Premium Luxury</p>
                    <p>Unit No. 101</p>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 top">
                  <div className="col-span-4 lg:col-span-4 payment-checkIn">
                    <div className="comman-grey">
                      <p>Check-in</p>
                    </div>
                    <div className="comman-grey mt-2">
                      <p>11/23/2022</p>
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-4 payment-checkIn">
                    <div className="comman-grey">
                      <p>Check-out</p>
                    </div>
                    <div className="comman-grey mt-2">
                      <p>11/25/2022</p>
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-4 payment-checkIn">
                    <div className="comman-grey">
                      <p>Total length of stay:</p>
                    </div>
                    <div className="comman-grey mt-2">
                      <p>2 nights</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="top payment-info">
                <div className="comman-blog-header">
                  <p>Premium Luxury</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>$101.88 * 8 Days</p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>$815.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>Clean and Dry</p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>$815.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>Deposit</p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>$815.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>Tax</p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>$815.00</p>
                  </div>
                </div>

                <div class="border-b border-solid border-grey-500 mt-3"></div>

                <div className="flex justify-between items-center mt-3">
                  <div className="comman-blue-font">
                    <p>Total</p>
                  </div>
                  <div className="comman-blue-font">
                    <p>$5000.00</p>
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

export default Booking;
