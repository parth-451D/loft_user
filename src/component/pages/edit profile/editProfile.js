import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { changePasswordShchema } from "../../validation/validation";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import * as Yup from "yup";
import Loader from "../../comman/loader";
import NoData from "../../comman/nodata";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("Edit-profile");
  const [isLoading, setIsLoading] = useState(false);
  const initialValue = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [userData, setUserData] = useState({});
  const [booking, setBooking] = useState([]);

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const token = localStorage.getItem("token");

  const [isCurrent, setIsCurrent] = useState("current");

  const handleButtonClick = (tab) => {
    setIsCurrent(tab);
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });

  const LogoutUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        SuccessAlert({ title: response.data.msg });
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      ErrorAlert({ title: error?.response?.data?.error });
    }
  };

  const changePassword = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/change-password`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.code === 200) {
        SuccessAlert({ title: res.data.msg });
        getProfile();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setUserData(res.data.result);
      if(res.data.result.profile_pic) setSelectedImage(res.data.result.profile_pic);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const userProfile = async (values) => {
    setIsLoading(true); // Set isLoading to true before making the API request
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/profile`,
        { ...values, profile_pic: selectedImage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.code === 200) {
        SuccessAlert({ title: res.data.msg });
        getProfile();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const getBooking = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/booking?type=${isCurrent}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setBooking(res.data.result);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getBooking();
  }, [isCurrent]);

  const [selectedImage, setSelectedImage] = useState("/images/profile.jpeg");

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    // const reader = new FileReader();

    // reader.onloadend = () => {
    //   setSelectedImage(reader.result);
    // };

    // if (file) {
    //   reader.readAsDataURL(file);
    // }

    setIsLoading(true);

    let formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/upload`,
        formData
      );
      setSelectedImage(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 top">
            <div className="col-span-12 lg:col-span-3">
              <div className="payment-info">
                <div className="comman-blog-header">
                  <p>Edit Profile</p>
                </div>

                <div
                  className={`comman-blue-font mt-3 profile-active ${
                    activeTab === "Edit-profile" ? "active-bg " : ""
                  }`}
                  onClick={() => handleTabClick("Edit-profile")}
                >
                  <p> Edit Profile</p>
                </div>

                <div
                  className={`comman-blue-font mt-3 profile-active ${
                    activeTab === "ChangePassword" ? "active-bg " : ""
                  }`}
                  onClick={() => handleTabClick("ChangePassword")}
                >
                  <p>Change Password</p>
                </div>

                <div
                  className={`comman-blue-font mt-3 profile-active ${
                    activeTab === "Bookings" ? "active-bg " : ""
                  }`}
                  onClick={() => handleTabClick("Bookings")}
                >
                  <p>My Bookings</p>
                </div>

                <div
                  onClick={() => LogoutUser()}
                  className="comman-blue-font mt-3 profile-active "
                >
                  <p>Logout</p>
                </div>
              </div>
            </div>
            {activeTab === "ChangePassword" && (
              <div className="col-span-12 lg:col-span-9">
                <div className="payment-info">
                  <div className="comman-midium-blue">
                    <p>Change Password</p>
                  </div>
                  <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      changePassword(values);
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
                      <form>
                        <div className="login-input mt-3">
                          <div className="comman-grey">
                            <p>Current Password</p>
                          </div>
                          <input
                            type="text"
                            name="currentPassword"
                            className="input-box mt-1"
                            placeholder="Current Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.currentPassword}
                          />
                        </div>
                        <div className="text-red-700">
                          {errors.currentPassword &&
                            touched.currentPassword &&
                            errors.currentPassword}
                        </div>
                        <div className="login-input mt-3">
                          <div className="comman-grey">
                            <p>New Password</p>
                          </div>
                          <input
                            type="text"
                            name="newPassword"
                            className="input-box mt-1"
                            placeholder="New Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPassword}
                          />
                        </div>
                        <div className="text-red-700">
                          {errors.newPassword &&
                            touched.newPassword &&
                            errors.newPassword}
                        </div>
                        <div className="login-input mt-3">
                          <div className="comman-grey">
                            <p>Confirm New Password</p>
                          </div>
                          <input
                            type="text"
                            name="confirmNewPassword"
                            className="input-box mt-1"
                            placeholder="Confirm New Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmNewPassword}
                          />
                        </div>
                        <div className="text-red-700">
                          {errors.confirmNewPassword &&
                            touched.confirmNewPassword &&
                            errors.confirmNewPassword}
                        </div>
                        <div className="mt-3">
                          <button
                            type="button"
                            class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                   focus:outline-none comman-bg w-full"
                            onClick={handleSubmit}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            )}

            {activeTab === "Bookings" && (
              <div className="col-span-12 lg:col-span-9">
                <div className="payment-info booking-container">
                  <div className="comman-midium-blue">
                    <p>My Bookings</p>
                  </div>
                  <div className="flex items-center mt-3 p-2 switch-btn justify-between">
                    <button
                      className={`px-10 py-2.5 ${
                        isCurrent === "current"
                          ? "comman-bg text-white"
                          : "switch-bg text-gray-500 "
                      } rounded-full`}
                      onClick={() => {
                        handleButtonClick("current");
                      }}
                    >
                      Current
                    </button>

                    <button
                      className={`px-10 py-2.5 ${
                        isCurrent === "past"
                          ? "comman-bg text-white"
                          : "switch-bg text-gray-700"
                      } rounded-full`}
                      onClick={() => {
                        handleButtonClick("past");
                      }}
                    >
                      Past
                    </button>
                  </div>

                  {booking.map((item, index) => (
                    <div className="payment-info top ">
                      <div className="flex items-center overflow-x-scroll">
                        <div className="box-payment">
                          <img src="/images/room.png" alt="" />
                        </div>

                        <div className="ml-5">
                          <div className="flex items-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_256_1127)">
                                <g opacity="0.5">
                                  <path
                                    d="M9.23503 0.0648804C8.4007 0.28532 7.66012 0.890354 7.28983 1.65485C6.98984 2.27865 6.98516 2.29272 6.98516 5.41169V8.22581L7.10234 8.46501C7.28045 8.81677 7.5195 8.96686 7.94135 8.98562C8.22259 8.99969 8.30696 8.98562 8.48507 8.88712C8.60225 8.82615 8.76162 8.68544 8.83662 8.57757L8.97723 8.37589L9.00067 5.58054C9.02411 2.97749 9.02879 2.76643 9.11316 2.60696C9.23035 2.36776 9.52095 2.11449 9.74594 2.05352C9.8725 2.02069 11.6818 2.01131 15.5956 2.016L21.2578 2.03007L21.4781 2.16139C21.6234 2.24582 21.7453 2.36776 21.8297 2.51316L21.9609 2.7336V11.9967V21.2598L21.8297 21.4803C21.7453 21.6257 21.6234 21.7476 21.4781 21.832L21.2578 21.9634L15.5956 21.9774C11.6818 21.9821 9.8725 21.9727 9.74594 21.9399C9.52095 21.8789 9.23035 21.6257 9.11316 21.3865C9.02879 21.227 9.02411 21.0159 9.00067 18.4223C8.97723 15.3877 8.98661 15.5003 8.71006 15.2517C8.48976 15.0453 8.30227 14.9891 7.94604 15.0078C7.51481 15.0266 7.27577 15.1767 7.10234 15.5378L6.98047 15.7817L6.99453 18.7084L7.00859 21.6351L7.13515 21.9774C7.45857 22.8686 8.09135 23.5064 8.9913 23.8582L9.30534 23.9801L15.3659 23.9942C22.0687 24.0083 21.7218 24.0224 22.3499 23.7034C22.964 23.3939 23.4186 22.9389 23.7092 22.3386C24.0186 21.7054 23.9998 22.4511 23.9998 11.9967C23.9998 1.41566 24.028 2.27396 23.6671 1.57981C23.3202 0.918495 22.7296 0.397884 22.0171 0.135233L21.6797 0.0132885L15.5862 0.00390816C10.3881 -0.00547218 9.45533 0.00390816 9.23503 0.0648804Z"
                                    fill="#555555"
                                  />
                                  <path
                                    d="M12.7399 8.02912C12.2853 8.15106 11.9993 8.52159 11.9993 8.98592C11.9993 9.38458 12.0931 9.52998 12.8337 10.271L13.5227 10.9652H7.19023C0.253111 10.9652 0.614029 10.9511 0.314045 11.2372C0.0984321 11.4436 0 11.6781 0 11.997C0 12.466 0.27186 12.8459 0.698399 12.9773C0.829642 13.0148 2.59673 13.0289 7.19492 13.0289H13.518L12.7868 13.7652C12.1165 14.45 12.0556 14.525 12.004 14.7502C11.9243 15.0691 11.9712 15.3224 12.154 15.5944C12.4024 15.9555 12.843 16.1056 13.2977 15.9837C13.5039 15.9274 13.6633 15.782 15.1726 14.2811C16.1054 13.3525 16.86 12.5645 16.9022 12.4707C17.0147 12.2409 17.0381 11.9407 16.9678 11.6828C16.9116 11.4764 16.7663 11.3169 15.2851 9.82546C14.3945 8.92495 13.5883 8.15106 13.4993 8.10885C13.2696 7.9916 12.9977 7.96346 12.7399 8.02912Z"
                                    fill="#555555"
                                  />
                                </g>
                              </g>
                              <defs>
                                <clipPath id="clip0_256_1127">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <p className="mx-2 comman-grey">Check-in</p>
                          </div>
                          <div className="comman-blue-font mt-2">
                            <p>{item?.start_date}</p>
                          </div>
                        </div>

                        <div className="ml-10">
                          <div className="flex items-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_256_1127)">
                                <g opacity="0.5">
                                  <path
                                    d="M9.23503 0.0648804C8.4007 0.28532 7.66012 0.890354 7.28983 1.65485C6.98984 2.27865 6.98516 2.29272 6.98516 5.41169V8.22581L7.10234 8.46501C7.28045 8.81677 7.5195 8.96686 7.94135 8.98562C8.22259 8.99969 8.30696 8.98562 8.48507 8.88712C8.60225 8.82615 8.76162 8.68544 8.83662 8.57757L8.97723 8.37589L9.00067 5.58054C9.02411 2.97749 9.02879 2.76643 9.11316 2.60696C9.23035 2.36776 9.52095 2.11449 9.74594 2.05352C9.8725 2.02069 11.6818 2.01131 15.5956 2.016L21.2578 2.03007L21.4781 2.16139C21.6234 2.24582 21.7453 2.36776 21.8297 2.51316L21.9609 2.7336V11.9967V21.2598L21.8297 21.4803C21.7453 21.6257 21.6234 21.7476 21.4781 21.832L21.2578 21.9634L15.5956 21.9774C11.6818 21.9821 9.8725 21.9727 9.74594 21.9399C9.52095 21.8789 9.23035 21.6257 9.11316 21.3865C9.02879 21.227 9.02411 21.0159 9.00067 18.4223C8.97723 15.3877 8.98661 15.5003 8.71006 15.2517C8.48976 15.0453 8.30227 14.9891 7.94604 15.0078C7.51481 15.0266 7.27577 15.1767 7.10234 15.5378L6.98047 15.7817L6.99453 18.7084L7.00859 21.6351L7.13515 21.9774C7.45857 22.8686 8.09135 23.5064 8.9913 23.8582L9.30534 23.9801L15.3659 23.9942C22.0687 24.0083 21.7218 24.0224 22.3499 23.7034C22.964 23.3939 23.4186 22.9389 23.7092 22.3386C24.0186 21.7054 23.9998 22.4511 23.9998 11.9967C23.9998 1.41566 24.028 2.27396 23.6671 1.57981C23.3202 0.918495 22.7296 0.397884 22.0171 0.135233L21.6797 0.0132885L15.5862 0.00390816C10.3881 -0.00547218 9.45533 0.00390816 9.23503 0.0648804Z"
                                    fill="#555555"
                                  />
                                  <path
                                    d="M12.7399 8.02912C12.2853 8.15106 11.9993 8.52159 11.9993 8.98592C11.9993 9.38458 12.0931 9.52998 12.8337 10.271L13.5227 10.9652H7.19023C0.253111 10.9652 0.614029 10.9511 0.314045 11.2372C0.0984321 11.4436 0 11.6781 0 11.997C0 12.466 0.27186 12.8459 0.698399 12.9773C0.829642 13.0148 2.59673 13.0289 7.19492 13.0289H13.518L12.7868 13.7652C12.1165 14.45 12.0556 14.525 12.004 14.7502C11.9243 15.0691 11.9712 15.3224 12.154 15.5944C12.4024 15.9555 12.843 16.1056 13.2977 15.9837C13.5039 15.9274 13.6633 15.782 15.1726 14.2811C16.1054 13.3525 16.86 12.5645 16.9022 12.4707C17.0147 12.2409 17.0381 11.9407 16.9678 11.6828C16.9116 11.4764 16.7663 11.3169 15.2851 9.82546C14.3945 8.92495 13.5883 8.15106 13.4993 8.10885C13.2696 7.9916 12.9977 7.96346 12.7399 8.02912Z"
                                    fill="#555555"
                                  />
                                </g>
                              </g>
                              <defs>
                                <clipPath id="clip0_256_1127">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <p className="mx-2 comman-grey">Check-in</p>
                          </div>
                          <div className="comman-blue-font mt-2">
                            <p>{item?.end_Date}</p>
                          </div>
                        </div>

                        <div className="ml-10">
                          <div className="flex items-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M6.75474 0.106276C5.61754 0.412445 4.73027 1.41843 4.56156 2.59937C4.52407 2.8743 4.49908 6.55458 4.49908 12.578V22.1255H3.0807C1.76855 22.1255 1.63733 22.138 1.44988 22.2505C1.17495 22.4192 1 22.7253 1 23.0502C1 23.3752 1.11872 23.6189 1.38115 23.8375L1.57485 24L12.1533 23.9875L22.7318 23.9688L22.9005 23.8125C23.4004 23.3439 23.3504 22.5879 22.7943 22.2505C22.6068 22.138 22.4756 22.1255 21.1697 22.1255H19.7451V12.578C19.7451 6.55458 19.7201 2.8743 19.6826 2.59937C19.5076 1.40593 18.6204 0.406197 17.4644 0.100027C16.9271 -0.0374374 7.27335 -0.031189 6.75474 0.106276ZM17.2957 2.087C17.4394 2.18073 17.6144 2.36818 17.6831 2.50564C17.8081 2.74933 17.8081 2.84306 17.8081 12.4405V22.1255H12.1221H6.43607V12.4405C6.43607 2.91179 6.43607 2.74933 6.56104 2.50564C6.68601 2.26821 6.9172 2.06201 7.19212 1.94954C7.28585 1.91205 9.23534 1.8933 12.1908 1.89955L17.0333 1.91205L17.2957 2.087Z"
                                  fill="#555555"
                                />
                                <path
                                  d="M14.9592 10.5648C14.753 10.6461 14.4467 11.0461 14.3967 11.2836C14.1967 12.3461 15.5655 12.9586 16.2217 12.0961C16.3655 11.9023 16.3967 11.7961 16.403 11.4961C16.403 11.0898 16.2905 10.8836 15.9342 10.6398C15.7155 10.4961 15.228 10.4523 14.9592 10.5648Z"
                                  fill="#555555"
                                />
                              </g>
                            </svg>

                            <p className="mx-2 comman-grey">Unit No.</p>
                          </div>
                          <div className="comman-blue-font mt-2">
                            <p>{item?.flatDetails?.unit_no}</p>
                          </div>
                        </div>

                        <div className="ml-10">
                          <div className="flex items-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M1.80747 4.34012C1.38423 4.45464 1.04564 4.65381 0.717012 4.98244C0.547718 5.15174 0.353527 5.40568 0.278838 5.55008C0.0248963 6.04801 0 6.25713 0 7.81564V9.25464L0.169295 9.42394C0.308714 9.56336 0.373444 9.59323 0.552697 9.59323C1.09046 9.59821 1.77759 9.86211 2.20083 10.2356C3.32614 11.2264 3.33112 13.0239 2.21079 14.0198C1.78257 14.4032 1.08548 14.6721 0.537759 14.6721C0.378423 14.6721 0.303734 14.7069 0.169295 14.8414L0 15.0107V16.4497C0 17.6945 0.00995851 17.9285 0.0946058 18.2173C0.323651 19.0488 0.985892 19.7061 1.81743 19.9252C2.07635 19.9899 3.27635 19.9999 12 19.9999C22.7851 19.9999 22.1328 20.0148 22.7154 19.721C23.049 19.5517 23.5519 19.0488 23.7212 18.7152C23.9751 18.2173 24 18.0082 24 16.4497V15.0107L23.8307 14.8414C23.6913 14.7019 23.6266 14.6721 23.4423 14.6721C23.1386 14.6721 22.6506 14.5476 22.3419 14.3932C20.7784 13.6065 20.4598 11.4903 21.7295 10.3003C22.2025 9.85713 22.8349 9.59323 23.4174 9.59323C23.6266 9.59323 23.6863 9.56834 23.8307 9.42394L24 9.25464V7.81564C24 6.57083 23.99 6.3368 23.9054 6.04801C23.6763 5.21647 23.0141 4.55921 22.1826 4.34012C21.9237 4.27539 20.7286 4.26543 11.9751 4.27041C3.61494 4.27041 2.02656 4.28535 1.80747 4.34012ZM5.17842 12.1376V18.9592L3.64979 18.9443L2.11618 18.9293L1.86722 18.7949C1.54855 18.6256 1.32946 18.3966 1.18506 18.0829C1.0805 17.8538 1.07054 17.7542 1.0556 16.7783L1.03568 15.7227L1.18008 15.6878C1.61328 15.5932 1.7527 15.5434 2.11618 15.3692C3.03734 14.926 3.7444 14.0746 4.01826 13.0688C4.14274 12.6256 4.14274 11.575 4.01328 11.1617C3.70456 10.1459 3.02739 9.33431 2.11618 8.89614C1.7527 8.72186 1.61328 8.67207 1.18008 8.57747L1.03568 8.54261L1.0556 7.46211C1.07552 6.27705 1.10041 6.17747 1.39917 5.8339C1.82739 5.35091 1.96681 5.32103 3.74938 5.31605L5.17842 5.31108V12.1376ZM17.527 6.05796C17.527 6.86958 17.5618 7.01896 17.7809 7.13348C18.0149 7.25298 18.2639 7.22311 18.4282 7.05879L18.5726 6.91439V6.10776V5.3061L20.2307 5.32103L21.8838 5.33597L22.1328 5.47041C22.4515 5.63971 22.6705 5.86875 22.8149 6.18244C22.9195 6.41149 22.9295 6.51108 22.9444 7.48701L22.9643 8.54261L22.8199 8.57249C22.3568 8.67207 21.8241 8.8812 21.4954 9.10029C19.5834 10.3551 19.3046 13.0588 20.9178 14.6771C21.4108 15.175 22.088 15.5335 22.8199 15.6928L22.9643 15.7227L22.9444 16.7783C22.9295 17.7542 22.9195 17.8538 22.8149 18.0829C22.6705 18.3966 22.4515 18.6256 22.1328 18.7949L21.8838 18.9293L20.2307 18.9443L18.5726 18.9592V18.1575V17.3509L18.4282 17.2065C18.2689 17.0472 18.0349 17.0173 17.8008 17.1219C17.5668 17.2264 17.527 17.3858 17.527 18.2073V18.9542H11.8755H6.22407V12.1327V5.31108H11.8755H17.527V6.05796Z"
                                  fill="#555555"
                                />
                                <path
                                  d="M9.66443 9.93154C9.59472 9.98133 9.49015 10.2104 9.39057 10.5141L9.23123 11.012L8.68351 11.0369C8.09098 11.0618 7.95654 11.1116 7.84202 11.3357C7.67273 11.6593 7.77729 11.8685 8.31007 12.2519C8.53414 12.4112 8.71339 12.5556 8.71339 12.5755C8.71339 12.5954 8.64866 12.8095 8.56401 13.0535C8.48434 13.2975 8.41463 13.5415 8.41463 13.5963C8.41463 13.7805 8.59389 14.0095 8.78808 14.0743C9.0221 14.1539 9.1665 14.0992 9.62957 13.7556L9.99804 13.4817L10.4063 13.7755C10.8893 14.1241 11.0337 14.1689 11.2926 14.0394C11.4321 13.9747 11.4918 13.9 11.5466 13.7506C11.6113 13.5564 11.6063 13.5216 11.457 13.0734C11.3723 12.8145 11.3026 12.5905 11.3026 12.5755C11.3026 12.5556 11.4918 12.4062 11.7258 12.2369C12.0744 11.983 12.1541 11.8934 12.2038 11.734C12.2487 11.5797 12.2487 11.505 12.1989 11.3855C12.0893 11.1216 11.9449 11.0668 11.3325 11.0369L10.7897 11.012L10.6204 10.5141C10.5159 10.1954 10.4163 9.98631 10.3416 9.93154C10.1922 9.81204 9.80385 9.81204 9.66443 9.93154ZM10.0976 12.0278C10.2121 12.0975 10.1474 12.2569 10.008 12.2569C9.92833 12.2569 9.87853 12.227 9.86858 12.1622C9.85364 12.0826 9.92833 11.983 10.008 11.983C10.0229 11.983 10.0628 12.0029 10.0976 12.0278Z"
                                  fill="#555555"
                                />
                                <path
                                  d="M17.846 10.7089C17.5373 10.8483 17.5273 10.8931 17.5273 12.1379C17.5273 13.1935 17.5323 13.2732 17.6269 13.3927C17.7464 13.5421 18.0253 13.6467 18.1846 13.6018C18.2493 13.5819 18.3589 13.5072 18.4385 13.4375L18.573 13.3081V12.133V10.9579L18.4336 10.8234C18.2643 10.6591 18.0502 10.6193 17.846 10.7089Z"
                                  fill="#555555"
                                />
                              </g>
                            </svg>

                            <p className="mx-2 comman-grey">Booking Status</p>
                          </div>
                          {item.status === "Approved" && (
                            <div className=" mt-2 susscess-font">
                              <p>{item?.status}</p>
                            </div>
                          )}

                          {item.status === "Rejected" && (
                            <div
                              className=" mt-2 susscess-font"
                              style={{
                                color: "#F32C2C",
                                background: "rgba(243, 44, 44, 0.06)",
                              }}
                            >
                              <p>Rejected</p>
                            </div>
                          )}

                          {item.status === "Requested" && (
                            <div
                              className=" mt-2 susscess-font"
                              style={{
                                color: "rgb(223 212 44)",
                                background: "rgb(247 255 16 / 15%)",
                              }}
                            >
                              <p>{item?.status}</p>
                            </div>
                          )}
                        </div>

                        <div className="ml-10">
                          <div className="flex items-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.87519 5.71406C4.20019 5.92969 3.61425 6.40312 3.31425 6.975C2.98144 7.60781 3.00019 7.34062 3.00019 12C3.00019 16.6594 2.98144 16.3922 3.31425 17.025C3.61894 17.6062 4.23769 18.0984 4.91738 18.3C5.14707 18.3656 5.88769 18.375 12.0002 18.375C18.1127 18.375 18.8533 18.3656 19.083 18.3C19.7627 18.0984 20.3814 17.6062 20.6861 17.025C21.0189 16.3922 21.0002 16.6594 21.0002 11.9859V7.77656L20.883 7.42031C20.6064 6.60469 20.0205 6.01875 19.2049 5.74219L18.8486 5.625L11.9908 5.62969C5.56425 5.62969 5.11894 5.63437 4.87519 5.71406ZM18.7736 7.23281C19.2564 7.44844 19.4533 7.80469 19.4908 8.51719L19.5143 9H12.0002H4.48613L4.50957 8.51719C4.53769 7.97812 4.61738 7.74375 4.84238 7.50937C5.02988 7.3125 5.21738 7.20937 5.46113 7.16719C5.56425 7.14844 8.55957 7.13906 12.1174 7.14375C18.2393 7.14844 18.5955 7.15312 18.7736 7.23281ZM19.4908 13.6031C19.4768 15.8812 19.4721 15.9703 19.3783 16.1719C19.2611 16.425 18.9705 16.7016 18.7221 16.7859C18.4502 16.8844 5.55019 16.8844 5.27832 16.7859C5.02988 16.7016 4.73925 16.425 4.62207 16.1719C4.52832 15.9703 4.52363 15.8812 4.50957 13.6031L4.4955 11.25H12.0002H19.5049L19.4908 13.6031Z"
                                fill="#C0C0C0"
                              />
                              <path
                                d="M16.7578 13.5891C16.35 13.7766 16.125 14.1516 16.125 14.6344C16.1297 15.3 16.5797 15.75 17.25 15.75C17.925 15.75 18.375 15.3 18.375 14.625C18.375 14.1375 18.1266 13.7484 17.7094 13.575C17.4656 13.4719 16.9922 13.4812 16.7578 13.5891Z"
                                fill="#C0C0C0"
                              />
                              <path
                                d="M5.9625 14.0156C5.73281 14.1562 5.625 14.3672 5.625 14.6766C5.625 14.9859 5.74219 15.1969 6 15.3469C6.15938 15.4406 6.225 15.4453 8.625 15.4453C11.025 15.4453 11.0906 15.4406 11.25 15.3469C11.5078 15.1969 11.625 14.9859 11.625 14.6766C11.625 14.3672 11.5172 14.1562 11.2875 14.0156C11.1375 13.9266 11.0438 13.9219 8.625 13.9219C6.20625 13.9219 6.1125 13.9266 5.9625 14.0156Z"
                                fill="#C0C0C0"
                              />
                            </svg>

                            <p className="mx-2 comman-grey">Payment Status</p>
                          </div>
                          {item.status === "Approved" && (
                            <div className=" mt-2 susscess-font">
                              <p>Successfull</p>
                            </div>
                          )}

                          {item.status === "Rejected" && (
                            <div
                              className=" mt-2 susscess-font"
                              style={{
                                color: "#F32C2C",
                                background: "rgba(243, 44, 44, 0.06)",
                              }}
                            >
                              <p>Cancelled</p>
                            </div>
                          )}

                          {item.status === "Requested" && (
                            <div
                              className=" mt-2 susscess-font"
                              style={{
                                color: "rgb(223 212 44)",
                                background: "rgb(247 255 16 / 15%)",
                              }}
                            >
                              <p>Hold</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {booking.length === 0 && <NoData />}
                </div>
              </div>
            )}

            {activeTab === "Edit-profile" && (
              <div className="col-span-12 lg:col-span-9">
                <div className="payment-info">
                  <div className="comman-midium-blue">
                    <p>Edit Profile your account information</p>
                  </div>

                  <div className="top">
                    <div className=" flex items-center justify-center">
                      <div className="image relative">
                        <img
                          src={selectedImage}
                          alt="No Image"
                          className="edit-image"
                        />
                        <label
                          htmlFor="fileInput"
                          className="comman-bg profile-edit absolute bottom-0 right-0 cursor"
                        >
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileInputChange}
                          />
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.4499 0.0349582C12.3267 0.0529662 12.0806 0.117687 11.9029 0.178868C11.1973 0.421745 11.4387 0.199339 6.05302 5.56834C3.34415 8.26884 1.09311 10.526 1.05076 10.5842C0.949424 10.7235 0.00595377 15.0237 0.000328009 15.3719C-0.00267753 15.5569 0.0143539 15.6336 0.0770849 15.7182C0.198347 15.8816 0.395441 16 0.546296 16C0.689869 16 5.1326 15.062 5.29648 14.9971C5.35042 14.9757 7.6334 12.7209 10.3697 9.98629C13.9622 6.39616 15.3878 4.94721 15.4993 4.77271C16.0937 3.84261 16.1634 2.68779 15.684 1.71193C15.0875 0.497702 13.8116 -0.163899 12.4499 0.0349582ZM13.2324 1.26516C14.4484 1.46117 15.1193 2.79891 14.5593 3.91079C14.4518 4.12423 14.3021 4.29508 13.6768 4.91793L12.9238 5.66807L11.6235 4.36876L10.3232 3.0695L11.0939 2.30681C11.926 1.48325 12.0607 1.3881 12.5411 1.28409C12.851 1.21698 12.9215 1.21506 13.2324 1.26516ZM8.37396 10.2123L4.70989 13.8714L3.06825 14.2229C2.16536 14.4162 1.42276 14.5704 1.41802 14.5657C1.41328 14.5609 1.56837 13.8168 1.76265 12.9121L2.11592 11.2671L5.77628 7.61174L9.43669 3.95631L10.7374 5.25477L12.0381 6.55323L8.37396 10.2123Z"
                              fill="white"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="top">
                    <Formik
                      initialValues={userData}
                      enableReinitialize
                      // validationSchema={validationSchema}
                      onSubmit={(values) => {
                        userProfile(values);
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
                        <form>
                          <div className="login-input mt-3">
                            <div className="comman-grey">
                              <p>email</p>
                            </div>
                            <input
                              type="text"
                              name="email"
                              className="input-box mt-1"
                              placeholder="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                          </div>
                          <div className="text-red-700">
                            {errors.email && touched.email && errors.email}
                          </div>
                          <div className="login-input mt-3">
                            <div className="comman-grey">
                              <p>full name</p>
                            </div>
                            <input
                              type="text"
                              name="full_name"
                              className="input-box mt-1"
                              placeholder="full name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.full_name}
                            />
                          </div>
                          <div className="text-red-700">
                            {errors.full_name &&
                              touched.full_name &&
                              errors.full_name}
                          </div>
                          <div className="login-input mt-3">
                            <div className="comman-grey">
                              <p>mobile number</p>
                            </div>
                            <input
                              type="text"
                              name="mobile_number"
                              className="input-box mt-1"
                              placeholder="mobile number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.mobile_number}
                            />
                          </div>
                          <div className="text-red-700">
                            {errors.mobile_number &&
                              touched.mobile_number &&
                              errors.mobile_number}
                          </div>
                          <div className="mt-3">
                            <button
                              type="button"
                              class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                            focus:outline-none comman-bg w-full"
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
