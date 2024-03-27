import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";

const ForgotPassword = () => {
  const initialValue = {
    email: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const userForgotPassword = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/forget-password`,
        values
      );

      console.log(res.data, "res.data");
      if (res.data.code === 200) {
        SuccessAlert({ title: res.data.msg });
        navigate("/recover-password");
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
          {isLoading ? (
            <Loader />
          ) : (
            <div className="h-full">
              <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                  <img
                    src="/images/forgot.png"
                    className="w-full hidden md:block" // Hide on mobile, show on medium and larger screens
                    alt="Sample_image"
                  />
                </div>
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                  <div className="image">
                    <img src="/images/loftslogo 2.png" alt="" />
                  </div>

                  <div className="comman-header mt-3">
                    <p>Forget Password</p>
                  </div>

                  <div className="comman-grey mt-3">
                    <p>Enter your email id associated with your account </p>
                  </div>
                  <Formik
                    initialValues={initialValue}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={(values) => {
                      userForgotPassword(values);
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
                      <form className="top">
                        <div className="login-input">
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

                        <div className="mt-3">
                          <button
                            type="button"
                            class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                          focus:outline-none comman-bg w-full"
                            onClick={handleSubmit}
                          >
                            Send Link
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;
