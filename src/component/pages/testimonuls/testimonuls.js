import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { ErrorAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";

const Testimonuls = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/testimonials`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );
      setTestimonials(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <div className="container mx-auto comman-padding">
      <div className="comman-header text-center top">
        <p>Testimonials</p>
      </div>
      <div className=" top  test testimonuls-bg ">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-6 ">
            <div className="flex items-center justify-center h-full">
              <div className="comman-test">Customer Reviews</div>
            </div>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="col-span-12 lg:col-span-6 p-8">
              <Carousel autoPlay infiniteLoop showIndicators={false}>
                {testimonials &&
                  testimonials.map((item) => {
                    return (
                      <div className="p-6 bg-test">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="image flex items-center justify-center">
                              <img
                                src={
                                  item.image
                                    ? item.image
                                    : "/images/Ellipse 8.png"
                                }
                                alt="testimonial"
                                className="rounded-full testimonuls-img"
                              />
                            </div>
                            <p className="mx-2">{item.full_name}</p>
                          </div>

                          <div className="flex items-center">
                            {Array.from(
                              { length: item?.rating },
                              (_, index) => (
                                <svg
                                  width="24"
                                  height="22"
                                  viewBox="0 0 24 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.59 22L6.54 13.8658L0 8.39474L8.64 7.67105L12 0L15.36 7.67105L24 8.39474L17.46 13.8658L19.41 22L12 17.6868L4.59 22Z"
                                    fill="#FFBC00"
                                  />
                                </svg>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-grey">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonuls;
