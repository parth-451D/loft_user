import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import { Modal } from "react-responsive-modal";
import Loader from "../../comman/loader";
import { useNavigate } from "react-router-dom";
import TruncateText from "../../comman/trancate";
import { Carousel } from "react-responsive-carousel";

const AnimitesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();

  const getAmenities = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/amenities`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setAmenities(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAmenities();
  }, []);

  return (
    <>
      <div className="container mx-auto comman-padding">
        <div className="comman-header text-center">
          <p>Amenities</p>
        </div>
        <div className="grid grid-cols-12 gap-4 top">
          {amenities.map((item, index) => (
            <div className="col-span-12 lg:col-span-4" key={index}>
              <div className="amenities-box">
                <div className="image flex items-center justify-center">
                  <img
                    src={item.image}
                    alt="No Image"
                    style={{ maxHeight: "200px", maxWidth: "200px" }}
                  />
                </div>
                <div className="aminites-card p-3 mt-3">
                  <p>{item?.title}</p>
                  <button
                    class="text-white  font-medium rounded-lg text-sm px-5 py-2.5
                   focus:outline-none comman-bg"
                    onClick={onOpenModal}
                  >
                    Read More
                  </button>
                </div>

                {/* <div className="comman-blog-header mt-2">
                  <p>{item?.title}</p>
                </div> */}
                {/* <div className="comman-grey mt-2">
                  <p>
                    <TruncateText text={item?.description} maxLength={100} />
                  </p>
                </div> */}
              </div>
              <Modal open={open} onClose={onCloseModal} center>
                <Carousel
                  autoPlay
                  infiniteLoop
                  showIndicators={false}
                  showArrows={false}
                >
                  <div>
                    <img src="/images/gallary1.png" />
                    <p className="comman-grey mt-2">{item?.description}</p>
                  </div>
                  <div>
                    <img src="/images/gallary1.png" />
                  </div>
                </Carousel>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimitesList;
