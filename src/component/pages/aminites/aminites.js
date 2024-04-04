import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import { useNavigate } from "react-router-dom";

const Aminites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="comman-header text-center top">
            <p>Amenities</p>
          </div>
          <div className="aminites-main w-full top">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-4">
                <div className="comman-white">
                  <p>We do our best facilities provide you</p>
                </div>
                <div className="comman-white-sm mt-3">
                  <p>
                    LOFTS@JC is centrally located in the heart of the Tri-Cities
                    area, close to all major business and retail centers: a
                    block away from the new Binghamton University Health
                    Sciences Campus, blocks away from the UHS-Wilson Medical
                    Center, and is a 5-10 minute driving distance from Downtown
                    Binghamton and the Binghamton University Main Campus.
                  </p>
                </div>

                <button
                  type="button"
                  class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                   focus:outline-none bg-white mt-3 theme-color"
                  onClick={() => {
                    navigate("/animites");
                  }}
                >
                  View All Amenities
                </button>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <div className="grid grid-cols-12 gap-4">
                  {amenities.slice(0, 7).map((item, index) => (
                    <div className="col-span-6 lg:col-span-3">
                      <div className="icon-box flex  items-center justify-center flex-col">
                        {/* <svg
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M42.9502 2.10985C42.4517 2.27313 42.1595 2.48798 41.8845 2.89189C41.7556 3.08954 40.7845 5.43566 39.7275 8.11694L37.8111 12.9982H30.5836H23.3562L22.9093 13.2045C22.1101 13.5826 21.7148 14.3561 21.7835 15.4131C21.8609 16.4358 22.4796 17.1834 23.425 17.3811C23.7429 17.4413 26.3039 17.467 31.9586 17.4499C39.9767 17.4241 40.0283 17.4241 40.415 17.2436C40.6298 17.1405 40.9048 16.9514 41.0252 16.8139C41.1712 16.6506 42.0564 14.5537 43.6033 10.6779C45.915 4.88566 45.958 4.78253 45.9494 4.18956C45.9494 3.49345 45.7432 3.02079 45.2963 2.64266C44.6689 2.10985 43.6549 1.87781 42.9502 2.10985Z"
                            fill="#1C445F"
                          />
                          <path
                            d="M3.63283 15.2255C3.00548 15.4145 2.4125 15.8786 2.17188 16.3598C2.05156 16.5919 2 16.8669 2 17.3138C2 17.6575 2.48126 21.8685 3.07423 26.6639C4.14846 35.3179 4.16565 35.3866 4.43206 35.9452C4.73284 36.5554 5.22269 36.9937 5.7641 37.1483C5.94457 37.1913 7.07896 37.2343 8.42819 37.2343H10.7657V39.3827V41.5312H9.1157C8.20475 41.5312 7.31099 41.5742 7.13912 41.6171C6.96724 41.6687 6.71802 41.832 6.5977 41.9781L6.37426 42.2445L6.40005 43.8687L6.42583 45.5016L6.70942 45.7508L6.98443 46H13.0001H19.0158L19.2908 45.7508L19.5744 45.5016L19.6002 43.8687L19.626 42.2445L19.4025 41.9781C19.2822 41.832 19.033 41.6687 18.8611 41.6171C18.6892 41.5742 17.7955 41.5312 16.8931 41.5312H15.2345V39.3827V37.2343H17.6236C20.3049 37.2343 20.4424 37.1999 21.1041 36.564C21.6455 36.0483 21.8088 35.6616 21.8002 34.9139C21.8002 33.9858 21.4479 33.3928 20.6486 32.9717C20.365 32.8171 20.0127 32.8085 14.4009 32.7827L8.44538 32.7569L8.40241 32.5678C8.38522 32.4647 7.92116 28.8725 7.37974 24.5927C6.48598 17.5286 6.37426 16.7638 6.17661 16.377C5.94457 15.9044 5.47191 15.4489 5.04222 15.2684C4.73284 15.1395 3.98518 15.1223 3.63283 15.2255Z"
                            fill="#1C445F"
                          />
                          <path
                            d="M16.695 21.8427C16.1021 22.0232 15.6466 22.4099 15.3544 22.9685C15.2341 23.192 15.1997 23.4584 15.1997 23.9998C15.1997 25.0053 15.5177 25.581 16.3083 26.0021C16.6435 26.1826 16.7466 26.1912 20.3302 26.217L23.9998 26.2428V35.3522C23.9998 45.3984 23.9654 44.7797 24.5412 45.3898C24.6959 45.5445 24.9709 45.7508 25.16 45.8367C25.4865 45.9914 25.9334 46 34.9999 46C44.0664 46 44.5133 45.9914 44.8399 45.8367C45.0289 45.7508 45.3039 45.5445 45.4586 45.3898C46.0344 44.7797 46 45.5531 46 33.9085V23.3552L45.7938 22.917C45.5703 22.4357 45.1578 22.0748 44.6508 21.8857C44.3844 21.7912 41.8578 21.774 30.6171 21.774C23.0803 21.7826 16.8153 21.8083 16.695 21.8427Z"
                            fill="#1C445F"
                          />
                        </svg> */}

                        <img
                          src={item.image}
                          alt="amenities"
                          style={{ height: "90px", width: "90px" }}
                        />

                        <p className="mt-2 comman-blue-font">{item?.title}</p>
                      </div>
                    </div>
                  ))}

                  <div
                    className="col-span-6 lg:col-span-3"
                    onClick={() => {
                      navigate("/animites");
                    }}
                  >
                    <div className="icon-box flex  items-center justify-center flex-col cursor">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.1139 8.11037C9.62696 8.54378 8.50009 9.69732 8.12002 11.1642C7.95999 11.771 7.95999 19.1323 8.12002 19.7458C8.50009 21.2127 9.77365 22.4796 11.2206 22.8197C11.8474 22.9664 19.1087 22.9664 19.7354 22.8197C20.9156 22.5396 21.9958 21.6661 22.5359 20.5526C22.9493 19.7124 22.9493 19.7124 22.9493 15.4517C22.9493 11.1109 22.956 11.1709 22.4759 10.2441C21.9825 9.30391 21.1424 8.56378 20.1288 8.19038L19.6488 8.01702L15.5814 8.00368C11.874 7.99034 11.4806 8.00368 11.1139 8.11037Z"
                          fill="#1C445F"
                        />
                        <path
                          d="M28.1837 8.11037C26.6968 8.54378 25.5699 9.69732 25.1898 11.1642C25.0298 11.771 25.0298 19.1323 25.1898 19.7458C25.5699 21.2127 26.8435 22.4796 28.2904 22.8197C28.9172 22.9664 36.1785 22.9664 36.8053 22.8197C37.9855 22.5396 39.0657 21.6661 39.6058 20.5526C40.0192 19.7124 40.0192 19.7124 40.0192 15.4517C40.0192 11.1109 40.0258 11.1709 39.5458 10.2441C39.0523 9.30391 38.2122 8.56378 37.1987 8.19038L36.7186 8.01702L32.6512 8.00368C28.9439 7.99034 28.5504 8.00368 28.1837 8.11037Z"
                          fill="#1C445F"
                        />
                        <path
                          d="M11.1139 25.1807C9.62696 25.6141 8.50009 26.7676 8.12002 28.2346C7.95999 28.8413 7.95999 36.2027 8.12002 36.8161C8.50009 38.283 9.77365 39.5499 11.2206 39.89C11.8474 40.0367 19.1087 40.0367 19.7354 39.89C20.9156 39.6099 21.9958 38.7364 22.5359 37.6229C22.9493 36.7828 22.9493 36.7828 22.9493 32.522C22.9493 28.1812 22.956 28.2412 22.4759 27.3144C21.9825 26.3742 21.1424 25.6341 20.1288 25.2607L19.6488 25.0873L15.5814 25.074C11.874 25.0607 11.4806 25.074 11.1139 25.1807Z"
                          fill="#1C445F"
                        />
                        <path
                          d="M28.1837 25.1807C26.6968 25.6141 25.5699 26.7676 25.1898 28.2346C25.0298 28.8413 25.0298 36.2027 25.1898 36.8161C25.5699 38.283 26.8435 39.5499 28.2904 39.89C28.9172 40.0367 36.1785 40.0367 36.8053 39.89C37.9855 39.6099 39.0657 38.7364 39.6058 37.6229C40.0192 36.7828 40.0192 36.7828 40.0192 32.522C40.0192 28.1812 40.0258 28.2412 39.5458 27.3144C39.0523 26.3742 38.2122 25.6341 37.1987 25.2607L36.7186 25.0873L32.6512 25.074C28.9439 25.0607 28.5504 25.074 28.1837 25.1807Z"
                          fill="#1C445F"
                        />
                      </svg>

                      <p className="mt-2 comman-blue-font">Other</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden col-span-12">
                {/* Content for the mobile view */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Aminites;
