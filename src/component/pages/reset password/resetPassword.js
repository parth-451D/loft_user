import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import LinkExpire from "../link expired/LinkExpire";
import LinkUsed from "../link expired/LinkUsed";

const ResetPassword = () => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const token = url.searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const [used, setUsed] = useState(false);

  const checkToken = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/token-check`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": 0,
          },
        }
      );
      if (res.data.code === 200) {
        if (res.data.result.isExpired) setExpired(true);
        if (res.data.result.isUsed) setUsed(true);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, [currentUrl]);

  const resetPassSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 16 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const userResetPassword = async (values) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/reset-password`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
          {!expired && !used && (
            <div className="h-full">
              <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                  <img
                    src="/images/reset.png"
                    className="w-full hidden md:block"
                    alt="Sample_image"
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

                  <div className="comman-header mt-3">
                    <p>Create New Password</p>
                  </div>

                  <div className="comman-grey mt-3">
                    <p>Enter your new password</p>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={resetPassSchema}
                    onSubmit={(values) => {
                      userResetPassword(values);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <form className="top">
                        <div className="login mt-3">
                          <div className="comman-grey">
                            <p>Password</p>
                          </div>
                          <input
                            type="password"
                            className="input-box mt-1"
                            placeholder="New Password"
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="text-red-600">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </div>

                        <div className="login-input mt-3">
                          <div className="comman-grey">
                            <p>Confirm Password</p>
                          </div>
                          <input
                            type="text"
                            className="input-box mt-1"
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="text-red-600">
                          {errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword}
                        </div>

                        <div className="mt-3">
                          <button
                            type="button"
                            class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                          focus:outline-none comman-bg w-full"
                            onClick={handleSubmit}
                          >
                            Reset Password
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          )}
          {expired && <LinkExpire />}
          {used && <LinkUsed />}
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
