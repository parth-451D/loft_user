import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import INLoader from "../../comman/inLoader";
import * as Yup from "yup";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const initialValues = {
    full_name: "",
    city: "",
    rating: "",
    description: "",
    image: "",
    number: "",
    email: "",
  };

  const addTestimonialSchema = Yup.object().shape({
    full_name: Yup.string()
      .required("Full name is required")
      .min(3, "full name must be 3 characters at minimum")
      .max(100, "full name more then 100 character"),
    city: Yup.string()
      .required("City is required")
      .min(3, "city must be 3 characters at minimum")
      .max(100, "city more then 100 character"),
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    description: Yup.string()
      .required("Description is required")
      .min(3, "description must be 3 characters at minimum")
      .max(10000, "description more then 10000 character"),
    number: Yup.number().required("Number is required").max(5),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  const [images, setImages] = useState([]);
  const [imagesBuffer, setImagesBuffer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setImages([]);
    setImagesBuffer([]);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImagesBuffer(selectedImages);
    // Display preview for each selected image
    const imagePreviews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    setImages(imagePreviews);
  };

  const removeImage = (index, e) => {
    e.preventDefault();
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImagesBuffer(droppedFiles);
    const droppedImagePreviews = droppedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...droppedImagePreviews]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadImages = async () => {
    try {
      const uploadedUrls = await Promise.all(
        imagesBuffer.map(async (image) => {
          const formData = new FormData();
          formData.append("image", image);

          try {
            const res = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/upload`,
              formData
            );

            return res.data.result;
          } catch (error) {
            console.error("Error uploading image:", error);
            throw error; // Rethrow error to handle it later
          }
        })
      );
      return uploadedUrls[0]; // Return the array of uploaded URLs
    } catch (error) {
      console.error("Error uploading images:", error);
      return []; // Return an empty array in case of error
    }
  };

  const userTestimonials = async (values) => {
    setIsLoading(true); // Set isLoading to true before making the API request
    try {
      const uploadedUrls = await uploadImages();

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/webapp/testimonials`,
        { ...values, image: [uploadedUrls] }
      );

      if (res.data.code === 200) {
        SuccessAlert({ title: res.data.msg });
        onCloseModal();
      }
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <footer className="comman-bg top">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
            <div className="">
              <div className="image">
                <img src="/images/white-logo.png" alt="" />
              </div>

              <div className="mt-2 text-white">
                LOFTS@JC offers luxury housing with no compromises! LOFTS@JC has
                beautiful one, two and three bedroom units, each with full
                bathroom / bedroom parity, modern furnishings, stainless steel,
                top-of-the-line appliances, and other amenities galore.
              </div>

              <div className="flex mt-10">
                <div className="footer-icon flex items-center justify-center">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.397 21.7155V13.4939H16.162L16.573 10.2749H13.397V8.22449C13.397 7.2956 13.655 6.65962 14.984 6.65962H16.668V3.78968C15.8487 3.70159 15.0251 3.65906 14.201 3.66228C11.757 3.66228 10.079 5.15894 10.079 7.9065V10.2689H7.33203V13.4879H10.085V21.7155H13.397Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="footer-icon flex items-center justify-center mx-2">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0001 9.55498C10.2798 9.55498 8.87589 10.9633 8.87589 12.689C8.87589 14.4146 10.2798 15.8229 12.0001 15.8229C13.7204 15.8229 15.1243 14.4146 15.1243 12.689C15.1243 10.9633 13.7204 9.55498 12.0001 9.55498ZM21.3704 12.689C21.3704 11.3912 21.3821 10.1051 21.3095 8.80969C21.2368 7.305 20.8946 5.96959 19.7978 4.86929C18.6985 3.76663 17.3696 3.42573 15.8696 3.35284C14.5759 3.27996 13.2939 3.29171 12.0025 3.29171C10.7087 3.29171 9.42667 3.27996 8.13527 3.35284C6.63527 3.42573 5.30402 3.76898 4.20714 4.86929C3.10792 5.97194 2.76808 7.305 2.69542 8.80969C2.62277 10.1075 2.63449 11.3935 2.63449 12.689C2.63449 13.9844 2.62277 15.2728 2.69542 16.5682C2.76808 18.0729 3.11027 19.4083 4.20714 20.5086C5.30636 21.6113 6.63527 21.9522 8.13527 22.0251C9.42902 22.098 10.711 22.0862 12.0025 22.0862C13.2962 22.0862 14.5782 22.098 15.8696 22.0251C17.3696 21.9522 18.7009 21.6089 19.7978 20.5086C20.897 19.406 21.2368 18.0729 21.3095 16.5682C21.3845 15.2728 21.3704 13.9868 21.3704 12.689ZM12.0001 17.511C9.33995 17.511 7.19308 15.3574 7.19308 12.689C7.19308 10.0205 9.33995 7.86691 12.0001 7.86691C14.6603 7.86691 16.8071 10.0205 16.8071 12.689C16.8071 15.3574 14.6603 17.511 12.0001 17.511ZM17.004 8.79558C16.3829 8.79558 15.8814 8.29245 15.8814 7.66942C15.8814 7.04638 16.3829 6.54325 17.004 6.54325C17.6251 6.54325 18.1267 7.04638 18.1267 7.66942C18.1269 7.81736 18.0979 7.96388 18.0416 8.1006C17.9852 8.23732 17.9026 8.36154 17.7983 8.46615C17.694 8.57076 17.5701 8.65371 17.4339 8.71023C17.2976 8.76676 17.1515 8.79577 17.004 8.79558Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="lg:ml-10">
              <h2 className="mb-6 text-sm  uppercase text-white font-extrabold ">
                Links
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4 cursor" onClick={scrollToTop}>
                  <Link to={"/home"} className="text-white text-sm">
                    Home
                  </Link>
                </li>
                <li className="mb-4 cursor" onClick={scrollToTop}>
                  <Link to={"/about"} className="text-white text-sm">
                    About us
                  </Link>
                </li>
                <li className="mb-4 cursor" onClick={scrollToTop}>
                  <Link to={"/gallery"} className="text-white text-sm">
                    Gallery
                  </Link>
                </li>
                <li className="mb-4 cursor" onClick={scrollToTop}>
                  <Link to={"/blog"} className="text-white text-sm">
                    Blogs
                  </Link>
                </li>
                <li className="mb-4 cursor" onClick={scrollToTop}>
                  <Link to={"/animites"} className="text-white text-sm">
                    Animites
                  </Link>
                </li>
                <li className="mb-4 cursor" onClick={scrollToTop}>
                  <Link to={"/contact"} className="text-white text-sm">
                    Contact us
                  </Link>
                </li>
                <li className="mb-4 cursor" onClick={onOpenModal}>
                  <p className="text-white text-sm">Review & Feedback</p>
                </li>
              </ul>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
              <Formik
                initialValues={initialValues}
                validationSchema={addTestimonialSchema}
                onSubmit={(values) => {
                  userTestimonials(values);
                }}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <>
                    <h2 className="text-center" style={{ fontSize: "25px" }}>
                      Review & Feedback
                    </h2>
                    <div className="d-flex ms-5">
                      <form className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="comman-grey">
                              <p>Full Name</p>
                            </div>
                            <input
                              type="text"
                              name="full_name"
                              className="input-box mt-1"
                              placeholder="Enter full name"
                              onChange={handleChange}
                              value={values.full_name}
                            />
                            {errors.full_name && touched.full_name && (
                              <p className="text-red-600 mt-2 mb-3">
                                {errors.full_name}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="comman-grey">
                              <p>City</p>
                            </div>
                            <input
                              type="text"
                              name="city"
                              className="input-box mt-1"
                              placeholder="Enter city"
                              onChange={handleChange}
                              value={values.city}
                            />
                            {errors.city && touched.city && (
                              <p className="text-red-600 mt-2 mb-3">
                                {errors.city}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="comman-grey">
                              <p>Number</p>
                            </div>
                            <input
                              type="number"
                              name="number"
                              className="input-box mt-1"
                              placeholder="Enter number"
                              onChange={handleChange}
                              value={values.number}
                            />
                            {errors.number && touched.number && (
                              <p className="text-red-600 mt-2 mb-3">
                                {errors.number}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="comman-grey">
                              <p>Email</p>
                            </div>
                            <input
                              type="email"
                              name="email"
                              className="input-box mt-1"
                              placeholder="Enter email"
                              onChange={handleChange}
                              value={values.email}
                            />
                            {errors.email && touched.email && (
                              <p className="text-red-600 mt-2 mb-3">
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="comman-grey">
                              <p>Rating</p>
                            </div>
                            <input
                              type="number"
                              name="rating"
                              className="input-box mt-1"
                              placeholder="Provide Rating"
                              onChange={handleChange}
                              value={values.rating}
                            />
                            {errors.rating && touched.rating && (
                              <p className="text-red-600 mt-2 mb-3">
                                {errors.rating}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <div className="form-group">
                            <div className="comman-grey">
                              <p>Description</p>
                            </div>
                            <input
                              type="text"
                              className="input-box mt-1"
                              placeholder="Description"
                              name="description"
                              onChange={handleChange}
                              value={values.description}
                            />
                            {errors.description && touched.description && (
                              <p className="text-red-600 mt-2 mb-3">
                                {errors.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          className="col-xs-12 col-sm-12 col-md-12"
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                        >
                          <div className="form-group">
                            <div className="comman-grey">
                              <p>Profile Picture</p>
                            </div>
                            {images.length === 0 && (
                              <div
                                style={{
                                  border: "2px dashed #ccc",
                                  padding: "20px",
                                  borderRadius: "5px",
                                  height: "160px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                  marginTop: "10px",
                                }}
                              >
                                <p>
                                  Drag and drop your images here or click to
                                  select
                                </p>
                                <input
                                  type="file"
                                  name="image"
                                  className="input-box mt-1"
                                  placeholder="Upload Images"
                                  onChange={handleImageChange}
                                />
                              </div>
                            )}
                            <div className="preview-container d-flex align-items-center gap-2 mt-3">
                              {images.map((image, index) => (
                                <div key={index} className="preview-container">
                                  <img
                                    src={image}
                                    alt={`Preview ${index}`}
                                    className="image-preview"
                                  />
                                  <button
                                    className="remove-button"
                                    onClick={(e) => removeImage(index, e)}
                                  >
                                    ❌
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {isLoading ? (
                          <INLoader />
                        ) : (
                          <div className="mt-3">
                            <button
                              type="button"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                            font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                             dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              onClick={onCloseModal}
                              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 
                            focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5
                             py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </>
                )}
              </Formik>
            </Modal>
            <div>
              <h2 className="mb-6 text-sm  uppercase text-white font-extrabold ">
                Contact Info
              </h2>

              <div className="flex">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.223 4.32832C12.9947 4.11246 12.6924 3.99219 12.3782 3.99219C12.064 3.99219 11.7617 4.11246 11.5334 4.32832L5.57673 9.95787C5.39434 10.1305 5.24911 10.3385 5.14994 10.5692C5.05078 10.7999 4.99975 11.0484 5 11.2995V18.1489C5.00033 18.6379 5.19481 19.1067 5.54069 19.4524C5.88657 19.798 6.35555 19.9922 6.84455 19.9922H8.68909C9.17829 19.9922 9.64746 19.7979 9.99338 19.4519C10.3393 19.106 10.5336 18.6368 10.5336 18.1476V15.0734C10.5336 14.9103 10.5984 14.7539 10.7137 14.6386C10.829 14.5233 10.9854 14.4586 11.1485 14.4586H13.6079C13.7709 14.4586 13.9273 14.5233 14.0426 14.6386C14.1579 14.7539 14.2227 14.9103 14.2227 15.0734V18.1476C14.2227 18.6368 14.4171 19.106 14.763 19.4519C15.1089 19.7979 15.5781 19.9922 16.0673 19.9922H17.9118C18.401 19.9922 18.8702 19.7979 19.2161 19.4519C19.562 19.106 19.7564 18.6368 19.7564 18.1476V11.2982C19.7563 11.0472 19.705 10.7989 19.6056 10.5684C19.5062 10.338 19.3609 10.1302 19.1784 9.95787L13.223 4.32832Z"
                    fill="white"
                  />
                </svg>
                <p className="mx-3 text-white">
                  Address: 128 Grand Ave, Johnson City, NY 13790
                </p>
              </div>

              <div className="flex mt-2">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.7059 16.7266L16.055 13.4071C15.8824 13.2502 15.6557 13.1665 15.4226 13.1737C15.1895 13.1809 14.9683 13.2785 14.8057 13.4457L12.6565 15.656C12.1392 15.5572 11.0991 15.233 10.0285 14.1651C8.95796 13.0936 8.63373 12.0509 8.53763 11.5371L10.7461 9.387C10.9136 9.22455 11.0112 9.00333 11.0184 8.77017C11.0256 8.537 10.9418 8.31017 10.7848 8.13769L7.46616 4.48767C7.30902 4.31465 7.09063 4.2097 6.85736 4.19511C6.62409 4.18052 6.39432 4.25744 6.21685 4.40953L4.2679 6.08096C4.11262 6.2368 4.01994 6.44421 4.00744 6.66385C3.99397 6.88839 3.7371 12.2071 7.86134 16.3332C11.4593 19.9302 15.9661 20.1934 17.2073 20.1934C17.3888 20.1934 17.5001 20.188 17.5298 20.1862C17.7494 20.1739 17.9567 20.0808 18.1118 19.9248L19.7823 17.975C19.935 17.7981 20.0125 17.5685 19.9982 17.3352C19.9839 17.102 19.8791 16.8835 19.7059 16.7266Z"
                    fill="white"
                  />
                </svg>

                <p className="mx-3 text-white">Phone: (347) 915-3560</p>
              </div>
              <div className="flex mt-2">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.4 6.31836H5.6C4.72 6.31836 4.008 7.03836 4.008 7.91836L4 17.5184C4 18.3984 4.72 19.1184 5.6 19.1184H18.4C19.28 19.1184 20 18.3984 20 17.5184V7.91836C20 7.03836 19.28 6.31836 18.4 6.31836ZM18.08 9.71836L12.424 13.2544C12.168 13.4144 11.832 13.4144 11.576 13.2544L5.92 9.71836C5.83978 9.67333 5.76954 9.61249 5.71351 9.53952C5.65749 9.46656 5.61685 9.38298 5.59406 9.29386C5.57127 9.20473 5.5668 9.11191 5.58093 9.021C5.59505 8.9301 5.62747 8.84301 5.67623 8.765C5.72498 8.68699 5.78906 8.61968 5.86458 8.56716C5.9401 8.51463 6.0255 8.47797 6.1156 8.4594C6.2057 8.44083 6.29863 8.44073 6.38876 8.45912C6.4789 8.4775 6.56437 8.51399 6.64 8.56636L12 11.9184L17.36 8.56636C17.4356 8.51399 17.5211 8.4775 17.6112 8.45912C17.7014 8.44073 17.7943 8.44083 17.8844 8.4594C17.9745 8.47797 18.0599 8.51463 18.1354 8.56716C18.2109 8.61968 18.275 8.68699 18.3238 8.765C18.3725 8.84301 18.405 8.9301 18.4191 9.021C18.4332 9.11191 18.4287 9.20473 18.4059 9.29386C18.3832 9.38298 18.3425 9.46656 18.2865 9.53952C18.2305 9.61249 18.1602 9.67333 18.08 9.71836Z"
                    fill="white"
                  />
                </svg>

                <p className="mx-3 text-white">Email: info@loftsatjc.com</p>
              </div>
            </div>

            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2959.8744900363163!2d-75.9562685232088!3d42.11015877121728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89daeef969ab6ffb%3A0x11082d4814a2309e!2s128%20Grand%20Ave%2C%20Johnson%20City%2C%20NY%2013790%2C%20USA!5e0!3m2!1sen!2sin!4v1705810704938!5m2!1sen!2sin"
                width="300"
                height="250"
                style={{ borderRadius: "10px" }}
                className="ifream"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
