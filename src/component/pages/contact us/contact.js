import axios from "axios";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";

const Contact = () => {
  const initialValues = {
    name: "",
    number: "",
    email: "",
    reason: "",
  };
  const contactUsSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    number: Yup.string()
      .required("Mobile Number is Required")
      .min(10, "mobile number must be 10 digits")
      .max(10, "mobile number must not be Greater than 10 digits"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    reason: Yup.string().required("Reason is required"),
  });

  const onSubmitForm = async (values, action) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/contact-us`,
        values
      );
      if (response.status === 200) {
        const data = response.data;
        SuccessAlert({ title: data.msg });
        action.resetForm();
      }
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
      action.resetForm();
    }
  };
  return (
    <>
      <div className="container mx-auto comman-padding">
        <div className="comman-header text-center">
          <p>How can we help?</p>
        </div>
        <div className="comman-grey text-center mt-4">
          <p>
            LOFTS@JC is centrally located in the heart of the Tri-Cities area,
            close to all major business and retail centers: a block away from
            the new Binghamton University Health Sciences Campus, blocks away
            from the UHS-Wilson Medical Center, and is a 5-10 minute driving
            distance from Downtown Binghamton and the Binghamton University Main
            Campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 top">
          <div className="col-span-12 lg:col-span-9">
            <div className="contact">
              <Formik
                initialValues={initialValues}
                validationSchema={contactUsSchema}
                enableReinitialize
                onSubmit={async (values, action) =>
                  onSubmitForm(values, action)
                }
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  /* and other goodies */
                }) => (
                  <form>
                    <div className="login-input">
                      <div className="comman-grey">
                        <p>Name</p>
                      </div>
                      <input
                        type="text"
                        name="name"
                        className="input-box mt-1"
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    </div>
                    <div className="text-red-600">
                      {errors.name && touched.name && errors.name}
                    </div>

                    <div className="flex items-center mt-4">
                      <div className="login-input flex flex-col">
                        <div className="comman-grey">
                          <p>E-mail</p>
                        </div>
                        <input
                          type="text"
                          name="email"
                          className="input-box mt-1"
                          placeholder="E-mail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
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
                          name="number"
                          className="input-box mt-1"
                          placeholder="Phone Number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.number}
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
                        name="reason"
                        className="text-area mt-1"
                        placeholder="Write here..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.reason}
                      />
                    </div>
                    <div className="text-red-600">
                      {errors.reason && touched.reason && errors.reason}
                    </div>

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
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col items-center justify-center">
              <div className="comman-midium-blue">
                <p>Contact Us</p>
              </div>

              <div className="flex mt-3 items-center">
                <div className="contact-box flex items-center justify-center">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40.4119 34.0664L33.11 27.4274C32.7649 27.1137 32.3113 26.9464 31.8451 26.9608C31.3789 26.9752 30.9366 27.1702 30.6114 27.5046L26.313 31.9252C25.2783 31.7277 23.1982 31.0792 21.0571 28.9434C18.9159 26.8005 18.2675 24.715 18.0753 23.6876L22.4923 19.3873C22.8271 19.0624 23.0224 18.62 23.0369 18.1536C23.0513 17.6873 22.8837 17.2336 22.5695 16.8887L15.9323 9.58862C15.618 9.24258 15.1813 9.03269 14.7147 9.00351C14.2482 8.97433 13.7886 9.12816 13.4337 9.43235L9.5358 12.7752C9.22524 13.0869 9.03988 13.5017 9.01488 13.941C8.98793 14.3901 8.4742 25.0276 16.7227 33.2796C23.9185 40.4737 32.9322 41 35.4147 41C35.7775 41 36.0002 40.9892 36.0595 40.9856C36.4987 40.961 36.9133 40.7749 37.2235 40.4629L40.5646 36.5632C40.87 36.2094 41.0249 35.7502 40.9964 35.2837C40.9679 34.8172 40.7581 34.3804 40.4119 34.0664Z"
                      fill="#1C445F"
                    />
                  </svg>
                </div>

                <div className="mx-4">
                  <p className="comman-blog-header">Phone</p>
                  <p className="comman-grey mt-2">(347) 915-3560</p>
                </div>
              </div>
              <div className="contact-line"></div>
              <div className="flex items-center">
                <div className="contact-box flex items-center justify-center">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M37.8 12.6738H12.2C10.44 12.6738 9.016 14.1138 9.016 15.8738L9 35.0738C9 36.8338 10.44 38.2738 12.2 38.2738H37.8C39.56 38.2738 41 36.8338 41 35.0738V15.8738C41 14.1138 39.56 12.6738 37.8 12.6738ZM37.16 19.4738L25.848 26.5458C25.336 26.8658 24.664 26.8658 24.152 26.5458L12.84 19.4738C12.6796 19.3838 12.5391 19.2621 12.427 19.1162C12.315 18.9702 12.2337 18.8031 12.1881 18.6248C12.1425 18.4466 12.1336 18.2609 12.1619 18.0791C12.1901 17.8973 12.2549 17.7231 12.3525 17.5671C12.45 17.4111 12.5781 17.2765 12.7292 17.1714C12.8802 17.0664 13.051 16.993 13.2312 16.9559C13.4114 16.9188 13.5973 16.9186 13.7775 16.9553C13.9578 16.9921 14.1287 17.0651 14.28 17.1698L25 23.8738L35.72 17.1698C35.8713 17.0651 36.0422 16.9921 36.2225 16.9553C36.4027 16.9186 36.5886 16.9188 36.7688 16.9559C36.949 16.993 37.1198 17.0664 37.2708 17.1714C37.4219 17.2765 37.55 17.4111 37.6476 17.5671C37.7451 17.7231 37.8099 17.8973 37.8382 18.0791C37.8664 18.2609 37.8575 18.4466 37.8119 18.6248C37.7663 18.8031 37.685 18.9702 37.573 19.1162C37.4609 19.2621 37.3204 19.3838 37.16 19.4738Z"
                      fill="#1C445F"
                    />
                  </svg>
                </div>

                <div className="ml-4">
                  <p className="comman-blog-header">E-mail</p>
                  <p className="comman-grey mt-2">info@loftsatjc.com</p>
                </div>
              </div>
              <div className="contact-line"></div>
              <div className="flex items-center" style={{marginRight:"18px"}}>
                <div className="contact-box flex items-center justify-center">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M37.8 12.6738H12.2C10.44 12.6738 9.016 14.1138 9.016 15.8738L9 35.0738C9 36.8338 10.44 38.2738 12.2 38.2738H37.8C39.56 38.2738 41 36.8338 41 35.0738V15.8738C41 14.1138 39.56 12.6738 37.8 12.6738ZM37.16 19.4738L25.848 26.5458C25.336 26.8658 24.664 26.8658 24.152 26.5458L12.84 19.4738C12.6796 19.3838 12.5391 19.2621 12.427 19.1162C12.315 18.9702 12.2337 18.8031 12.1881 18.6248C12.1425 18.4466 12.1336 18.2609 12.1619 18.0791C12.1901 17.8973 12.2549 17.7231 12.3525 17.5671C12.45 17.4111 12.5781 17.2765 12.7292 17.1714C12.8802 17.0664 13.051 16.993 13.2312 16.9559C13.4114 16.9188 13.5973 16.9186 13.7775 16.9553C13.9578 16.9921 14.1287 17.0651 14.28 17.1698L25 23.8738L35.72 17.1698C35.8713 17.0651 36.0422 16.9921 36.2225 16.9553C36.4027 16.9186 36.5886 16.9188 36.7688 16.9559C36.949 16.993 37.1198 17.0664 37.2708 17.1714C37.4219 17.2765 37.55 17.4111 37.6476 17.5671C37.7451 17.7231 37.8099 17.8973 37.8382 18.0791C37.8664 18.2609 37.8575 18.4466 37.8119 18.6248C37.7663 18.8031 37.685 18.9702 37.573 19.1162C37.4609 19.2621 37.3204 19.3838 37.16 19.4738Z"
                      fill="#1C445F"
                    />
                  </svg>
                </div>

                <div className="ml-4">
                  <p className="comman-blog-header">Address</p>
                  <p className="comman-grey mt-2">128 Grand Ave</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
