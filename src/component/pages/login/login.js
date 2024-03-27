import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";

const Login = () => {
  const myData = {
    email: "",
    password: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const userLogin = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        values
      );

      if (res.data.code === 200) {
        SuccessAlert({ title: res.data.msg });
        localStorage.setItem("token", res.data.result.token);
        if (localStorage.getItem("bookingDetails")) {
          navigate("/property-details");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          <section className="h-screen">
            <div className="h-full">
              <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                  <img
                    src="/images/gallary.png"
                    className="w-full hidden md:block" // Hide on mobile, show on medium and larger screens
                    alt="Sample"
                  />
                </div>
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                  <div
                    className="image cursor"
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    <img src="/images/loftslogo 2.png" alt="" />
                  </div>
                  <div className="comman-blue-font mt-3">
                    <p>Welcome Back 👋🏻 </p>
                  </div>
                  <div className="comman-header mt-3">
                    <p>Login</p>
                  </div>

                  <div className="comman-grey flex items-center mt-3">
                    <p>Don’t have an account? </p>
                    <p
                      className="comman-blue-font cursor mx-1"
                      onClick={() => {
                        navigate("/sign-up");
                      }}
                    >
                      Sign Up
                    </p>
                  </div>
                  <Formik
                    initialValues={myData}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                      userLogin(values);
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
                        <div className="login ">
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

                        <div className="login mt-3">
                          <div className="comman-grey">
                            <p>Password</p>
                          </div>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="input-box mt-1"
                              placeholder="Password"
                              value={values.password}
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {!showPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                onClick={togglePasswordVisibility}
                                className="cursor show-hide"
                              >
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                                onClick={togglePasswordVisibility}
                                className="cursor show-hide"
                              >
                                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="text-red-600">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          {/* <div className="flex items-center">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                            />

                            <p className="mx-2 comman-grey">Remember me</p>
                          </div> */}
                          <a
                            className="comman-blue-font cursor"
                            onClick={() => {
                              navigate("/forgot-password");
                            }}
                          >
                            Forgot password?
                          </a>
                        </div>
                        <div className="mt-3">
                          <button
                            type="button"
                            class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                   focus:outline-none comman-bg w-full"
                            onClick={handleSubmit}
                          >
                            Login
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
      )}
    </>
  );
};

export default Login;
