import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import { useNavigate } from "react-router-dom";

const Units = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState([]);
  const navigate = useNavigate();

  const getUnits = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/unit-details`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setUnit(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const Navigation = (id) => {
    navigate("/unit-Details", { state: { id: id } });
  };

  useEffect(() => {
    getUnits();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="comman-header text-center top">
            <p>Unit Details</p>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-6">
              {unit.slice(0, 3).map((item, index) => (
                <div
                  className="unit relative mb-10 cursor"
                  key={index}
                  onClick={() => {
                    Navigation(item.id);
                  }}
                >
                  <div className="image">
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="object-fit rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="unit-text p-3 flex justify-between w-full">
                      <p className="comman-blog-header">{item?.title}</p>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="23"
                          stroke="#1C445F"
                          stroke-width="2"
                        />
                        <path
                          d="M25.6779 30.3844C25.456 30.1606 25.3495 29.8901 25.3584 29.573C25.368 29.2558 25.4838 28.9853 25.7057 28.7615L28.8399 25.5995H16.4693C16.155 25.5995 15.8913 25.4921 15.6783 25.2772C15.466 25.063 15.3599 24.7974 15.3599 24.4802C15.3599 24.1631 15.466 23.8971 15.6783 23.6822C15.8913 23.468 16.155 23.361 16.4693 23.361H28.8399L25.6779 20.171C25.456 19.9471 25.3451 19.6811 25.3451 19.3729C25.3451 19.0655 25.456 18.7999 25.6779 18.576C25.8998 18.3522 26.1635 18.2402 26.469 18.2402C26.7737 18.2402 27.037 18.3522 27.2589 18.576L32.3348 23.6967C32.4457 23.8087 32.5245 23.9299 32.5711 24.0605C32.6169 24.1911 32.6399 24.331 32.6399 24.4802C32.6399 24.6295 32.6169 24.7694 32.5711 24.9C32.5245 25.0305 32.4457 25.1518 32.3348 25.2637L27.2312 30.4124C27.0278 30.6176 26.7737 30.7202 26.469 30.7202C26.1635 30.7202 25.8998 30.6083 25.6779 30.3844Z"
                          fill="#1C445F"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="unit relative mt-10">
                <div className="image">
                  <img src="/images/unit.png" alt="" className="object-fit" />
                </div>
                <div>
                  <div className="unit-text p-3 flex justify-between w-full">
                    <p className="comman-blog-header">Bedroom</p>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r="23"
                        stroke="#1C445F"
                        stroke-width="2"
                      />
                      <path
                        d="M25.6779 30.3844C25.456 30.1606 25.3495 29.8901 25.3584 29.573C25.368 29.2558 25.4838 28.9853 25.7057 28.7615L28.8399 25.5995H16.4693C16.155 25.5995 15.8913 25.4921 15.6783 25.2772C15.466 25.063 15.3599 24.7974 15.3599 24.4802C15.3599 24.1631 15.466 23.8971 15.6783 23.6822C15.8913 23.468 16.155 23.361 16.4693 23.361H28.8399L25.6779 20.171C25.456 19.9471 25.3451 19.6811 25.3451 19.3729C25.3451 19.0655 25.456 18.7999 25.6779 18.576C25.8998 18.3522 26.1635 18.2402 26.469 18.2402C26.7737 18.2402 27.037 18.3522 27.2589 18.576L32.3348 23.6967C32.4457 23.8087 32.5245 23.9299 32.5711 24.0605C32.6169 24.1911 32.6399 24.331 32.6399 24.4802C32.6399 24.6295 32.6169 24.7694 32.5711 24.9C32.5245 25.0305 32.4457 25.1518 32.3348 25.2637L27.2312 30.4124C27.0278 30.6176 26.7737 30.7202 26.469 30.7202C26.1635 30.7202 25.8998 30.6083 25.6779 30.3844Z"
                        fill="#1C445F"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="unit relative mt-10">
                <div className="image">
                  <img src="/images/unit.png" alt="" className="object-fit" />
                </div>
                <div>
                  <div className="unit-text p-3 flex justify-between w-full">
                    <p className="comman-blog-header">Bathroom</p>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r="23"
                        stroke="#1C445F"
                        stroke-width="2"
                      />
                      <path
                        d="M25.6779 30.3844C25.456 30.1606 25.3495 29.8901 25.3584 29.573C25.368 29.2558 25.4838 28.9853 25.7057 28.7615L28.8399 25.5995H16.4693C16.155 25.5995 15.8913 25.4921 15.6783 25.2772C15.466 25.063 15.3599 24.7974 15.3599 24.4802C15.3599 24.1631 15.466 23.8971 15.6783 23.6822C15.8913 23.468 16.155 23.361 16.4693 23.361H28.8399L25.6779 20.171C25.456 19.9471 25.3451 19.6811 25.3451 19.3729C25.3451 19.0655 25.456 18.7999 25.6779 18.576C25.8998 18.3522 26.1635 18.2402 26.469 18.2402C26.7737 18.2402 27.037 18.3522 27.2589 18.576L32.3348 23.6967C32.4457 23.8087 32.5245 23.9299 32.5711 24.0605C32.6169 24.1911 32.6399 24.331 32.6399 24.4802C32.6399 24.6295 32.6169 24.7694 32.5711 24.9C32.5245 25.0305 32.4457 25.1518 32.3348 25.2637L27.2312 30.4124C27.0278 30.6176 26.7737 30.7202 26.469 30.7202C26.1635 30.7202 25.8998 30.6083 25.6779 30.3844Z"
                        fill="#1C445F"
                      />
                    </svg>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center">
              {unit.slice(3, 4).map((item, index) => (
                <div
                  className="unit relative mobile-top cursor"
                  key={index}
                  onClick={() => {
                    Navigation(item.id);
                  }}
                >
                  <div className="image">
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="object-fit rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="unit-text p-3 flex justify-between w-full ">
                      <p className="comman-blog-header">{item?.title}</p>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="23"
                          stroke="#1C445F"
                          stroke-width="2"
                        />
                        <path
                          d="M25.6779 30.3844C25.456 30.1606 25.3495 29.8901 25.3584 29.573C25.368 29.2558 25.4838 28.9853 25.7057 28.7615L28.8399 25.5995H16.4693C16.155 25.5995 15.8913 25.4921 15.6783 25.2772C15.466 25.063 15.3599 24.7974 15.3599 24.4802C15.3599 24.1631 15.466 23.8971 15.6783 23.6822C15.8913 23.468 16.155 23.361 16.4693 23.361H28.8399L25.6779 20.171C25.456 19.9471 25.3451 19.6811 25.3451 19.3729C25.3451 19.0655 25.456 18.7999 25.6779 18.576C25.8998 18.3522 26.1635 18.2402 26.469 18.2402C26.7737 18.2402 27.037 18.3522 27.2589 18.576L32.3348 23.6967C32.4457 23.8087 32.5245 23.9299 32.5711 24.0605C32.6169 24.1911 32.6399 24.331 32.6399 24.4802C32.6399 24.6295 32.6169 24.7694 32.5711 24.9C32.5245 25.0305 32.4457 25.1518 32.3348 25.2637L27.2312 30.4124C27.0278 30.6176 26.7737 30.7202 26.469 30.7202C26.1635 30.7202 25.8998 30.6083 25.6779 30.3844Z"
                          fill="#1C445F"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}

              {unit?.slice(4, 5).map((item) => (
                <div
                  className="unit relative mobile-top top"
                  onClick={() => {
                    Navigation(item.id);
                  }}
                >
                  <div className="image object-fit cursor">
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="object-fit rounded-lg "
                    />
                  </div>
                  <div>
                    <div className="unit-text p-3 flex justify-between w-full">
                      <p className="comman-blog-header">{item?.title}</p>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="23"
                          stroke="#1C445F"
                          stroke-width="2"
                        />
                        <path
                          d="M25.6779 30.3844C25.456 30.1606 25.3495 29.8901 25.3584 29.573C25.368 29.2558 25.4838 28.9853 25.7057 28.7615L28.8399 25.5995H16.4693C16.155 25.5995 15.8913 25.4921 15.6783 25.2772C15.466 25.063 15.3599 24.7974 15.3599 24.4802C15.3599 24.1631 15.466 23.8971 15.6783 23.6822C15.8913 23.468 16.155 23.361 16.4693 23.361H28.8399L25.6779 20.171C25.456 19.9471 25.3451 19.6811 25.3451 19.3729C25.3451 19.0655 25.456 18.7999 25.6779 18.576C25.8998 18.3522 26.1635 18.2402 26.469 18.2402C26.7737 18.2402 27.037 18.3522 27.2589 18.576L32.3348 23.6967C32.4457 23.8087 32.5245 23.9299 32.5711 24.0605C32.6169 24.1911 32.6399 24.331 32.6399 24.4802C32.6399 24.6295 32.6169 24.7694 32.5711 24.9C32.5245 25.0305 32.4457 25.1518 32.3348 25.2637L27.2312 30.4124C27.0278 30.6176 26.7737 30.7202 26.469 30.7202C26.1635 30.7202 25.8998 30.6083 25.6779 30.3844Z"
                          fill="#1C445F"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Units;
