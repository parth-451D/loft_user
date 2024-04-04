import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Testimonials = () => {
  const initialValues = {
    full_name: "",
    city: "",
    rating: 5,
    description: "",
    image: "",
  };

  const addTestimonialSchema = Yup.object().shape({
    full_name: Yup.string()
      .required("full name is required")
      .min(3, "full name must be 3 characters at minimum")
      .max(100, "full name more then 100 character"),
    city: Yup.string()
      .required("city is required")
      .min(3, "city must be 3 characters at minimum")
      .max(100, "city more then 100 character"),
    rating: Yup.number()
      .required("rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    description: Yup.string()
      .required("description is required")
      .min(3, "description must be 3 characters at minimum")
      .max(10000, "description more then 10000 character"),
  });

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [images, setImages] = useState([]);
  const [imagesBuffer, setImagesBuffer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      }
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <Formik
        initialValues={initialValues}
        validationSchema={addTestimonialSchema}
        onSubmit={(values) => {
          userTestimonials(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
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
                    <p className="text-danger mt-2 mb-3">{errors.full_name}</p>
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
                    <p className="text-danger mt-2 mb-3">{errors.city}</p>
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
                    <p className="text-danger mt-2 mb-3">{errors.rating}</p>
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
                    <p className="text-danger mt-2 mb-3">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <div className="comman-grey">
                    <p>Images</p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    className="input-box mt-1"
                    placeholder="Upload Images"
                    onChange={handleImageChange}
                  />
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
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={onCloseModal}
                    className="btn btn-danger ms-3"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

export default Testimonials;
