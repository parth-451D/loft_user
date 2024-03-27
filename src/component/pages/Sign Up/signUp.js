import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";

const SignUp = () => {
  const initialValues = {
    full_name: "",
    email: "",
    password: "",
    address: "",
    mobile_number: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const SigninSchema = Yup.object().shape({
    full_name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 16 characters")
      .required("Password is required"),
    address: Yup.string().required("address is Required"),
    mobile_number: Yup.string()
      .required("Mobile Number is Required")
      .min(10, "mobile number must be 10 digits")
      .max(10, "mobile number must not be Greater than 10 digits"),
  });

  const userRagister = async (values) => {
    setIsLoading(true); // Set isLoading to true before making the API request
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        values
      );

      if (res.data.code === 200) {
        SuccessAlert({ title: res.data.msg });
        navigate("/login");
      }
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <section className="h-screen">
          <div className="h-full">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img
                  src="/images/room.png"
                  className="w-full hidden md:block" // Hide on mobile, show on medium and larger screens
                  alt="Sample image"
                />
              </div>
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <div className="image">
                  <img
                    src="/images/loftslogo 2.png"
                    alt=""
                    onClick={() => {
                      navigate("/home");
                    }}
                  />
                </div>
                <div className="comman-blue-font mt-3">
                  <p>Hello there !! 👋🏻 </p>
                </div>
                <div className="comman-header mt-3">
                  <p>Sign Up</p>
                </div>

                <div className="comman-grey flex items-center mt-3">
                  <p>Already have an account? </p>
                  <p
                    className="comman-blue-font cursor mx-1"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </p>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={SigninSchema}
                  onSubmit={(values) => {
                    userRagister(values);
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
                    <form className="mt-3">
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

                      <div className="login- mt-3">
                        <div className="comman-grey">
                          <p>E-mail</p>
                        </div>
                        <input
                          type="text"
                          className="input-box mt-1"
                          placeholder="E-mail"
                          value={values.email}
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="text-red-600">
                        {errors.email && touched.email && errors.email}
                      </div>

                      <div className="login- mt-3">
                        <div className="comman-grey">
                          <p>Phone Number</p>
                        </div>
                        <input
                          type="text"
                          className="input-box mt-1"
                          placeholder="Phone Number"
                          value={values.mobile_number}
                          name="mobile_number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="text-red-600">
                        {errors.mobile_number &&
                          touched.mobile_number &&
                          errors.mobile_number}
                      </div>

                      <div className="login- mt-3">
                        <div className="comman-grey">
                          <p>address</p>
                        </div>
                        <input
                          type="text"
                          className="input-box mt-1"
                          placeholder="Address"
                          value={values.address}
                          name="address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="text-red-600">
                        {errors.address && touched.address && errors.address}
                      </div>

                      <div className="login- mt-3">
                        <div className="comman-grey">
                          <p>Password</p>
                        </div>
                        <input
                          type="password"
                          className="input-box mt-1"
                          placeholder="Password"
                          value={values.password}
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="text-red-600">
                        {errors.password && touched.password && errors.password}
                      </div>
                      <div className="mt-3">
                        <button
                          type="button"
                          class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                         focus:outline-none comman-bg w-full"
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;
