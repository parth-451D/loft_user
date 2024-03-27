import axios from "axios";
import React, { useEffect, useState } from "react";
import { ErrorAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Property = () => {
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [allUnits, setAllUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bathrooms, setBathroom] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const dateInfo = JSON.parse(localStorage.getItem("dateInfo"));
  const navigate = useNavigate();

  const increament = (type) => {
    if (type === "bathroom") {
      setBathroom(bathrooms + 1);
    } else {
      setBedrooms(bedrooms + 1);
    }
  };

  const decrement = (type) => {
    if (type === "bathroom") {
      setBathroom(bathrooms - 1);
    } else {
      setBedrooms(bedrooms - 1);
    }
  };

  const toggleFilterBox = () => {
    setShowFilterBox(!showFilterBox);
  };

  const getUnits = async () => {
    setIsLoading(true);
    try {
      // const { checkInDate, checkOutDate, guests }
      let url;
      if (dateInfo) {
        url = `${
          process.env.REACT_APP_BASE_URL
        }/units/flats?start_date=${moment(dateInfo?.checkInDate).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(dateInfo?.checkInDate).format(
          "YYYY-MM-DD"
        )}&guests=${dateInfo.guests}`;
      } else {
        url = `${process.env.REACT_APP_BASE_URL}/units/flats`;
      }
      const res = await axios.get(url, {
        headers: {
          "ngrok-skip-browser-warning": 0,
        },
      });
      setAllUnits(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredUnits = async () => {
    setShowFilterBox(!showFilterBox);
    setIsLoading(true);
    try {
      let url;
      if (dateInfo) {
        url = `${
          process.env.REACT_APP_BASE_URL
        }/units/flats?start_date=${moment(dateInfo?.checkInDate).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(dateInfo?.checkInDate).format(
          "YYYY-MM-DD"
        )}&guests=${
          dateInfo.guests
        }&bathrooms=${bathrooms}&bedrooms=${bedrooms}`;
      } else {
        url = `${process.env.REACT_APP_BASE_URL}/units/flats?bathrooms=${bathrooms}&bedrooms=${bedrooms}`;
      }
      const res = await axios.get(url, {
        headers: {
          "ngrok-skip-browser-warning": 0,
        },
      });
      setAllUnits(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  return (
    <>
      <div className="container mx-auto comman-padding ">
        <div className="flex justify-between items-center">
          <div>
            {/* <ul class="flex flex-nowrap overflow-x-auto text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li class="me-2">
                <a
                  class="inline-block px-4 py-3 text-white comman-bg rounded-lg active"
                  aria-current="page"
                >
                  Floor 1
                </a>
              </li>
              <li class="me-2">
                <a class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                  Floor 2
                </a>
              </li>
              <li class="me-2">
                <a class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                  Floor 3
                </a>
              </li>
            </ul>  */}
          </div>
          <div className="relative">
            <button
              type="button"
              class="text-white  font-medium rounded-lg text-sm px-2 py-2.5 focus:outline-none comman-bg flex items-center"
              onClick={toggleFilterBox}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7H9M7 7H4M20 17H9M7 17H4M15 12H4M20 12H17M8 5C8.26522 5 8.51957 5.10536 8.70711 5.29289C8.89464 5.48043 9 5.73478 9 6V8C9 8.26522 8.89464 8.51957 8.70711 8.70711C8.51957 8.89464 8.26522 9 8 9C7.73478 9 7.48043 8.89464 7.29289 8.70711C7.10536 8.51957 7 8.26522 7 8V6C7 5.73478 7.10536 5.48043 7.29289 5.29289C7.48043 5.10536 7.73478 5 8 5V5ZM8 15C8.26522 15 8.51957 15.1054 8.70711 15.2929C8.89464 15.4804 9 15.7348 9 16V18C9 18.2652 8.89464 18.5196 8.70711 18.7071C8.51957 18.8946 8.26522 19 8 19C7.73478 19 7.48043 18.8946 7.29289 18.7071C7.10536 18.5196 7 18.2652 7 18V16C7 15.7348 7.10536 15.4804 7.29289 15.2929C7.48043 15.1054 7.73478 15 8 15ZM16 10C16.2652 10 16.5196 10.1054 16.7071 10.2929C16.8946 10.4804 17 10.7348 17 11V13C17 13.2652 16.8946 13.5196 16.7071 13.7071C16.5196 13.8946 16.2652 14 16 14C15.7348 14 15.4804 13.8946 15.2929 13.7071C15.1054 13.5196 15 13.2652 15 13V11C15 10.7348 15.1054 10.4804 15.2929 10.2929C15.4804 10.1054 15.7348 10 16 10V10Z"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="mx-2">Fliter</p>
            </button>
            {showFilterBox && (
              <div className="filter-box absolute top-16 right-0">
                <div className="comman-grey">
                  <p className="comman-blue-font">Filter</p>
                </div>
                <div className="mt-2 comman-grey flex items-center justify-between">
                  <div>
                    <p>Bedroom</p>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="increment cursor"
                      onClick={() => decrement("bethroom")}
                    >
                      <button
                        disabled={bedrooms === 1 ? true : false}
                        className="cursor"
                      >
                        -
                      </button>
                    </div>
                    <p className="mx-3">{bedrooms}</p>
                    <div
                      className="increment cursor"
                      onClick={() => increament("bethroom")}
                    >
                      <button
                        disabled={bedrooms === 3 ? true : false}
                        className="cursor"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 comman-grey flex items-center justify-between">
                  <div>
                    <p>Bathroom</p>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="increment cursor"
                      onClick={() => decrement("bathroom")}
                    >
                      <button
                        disabled={bathrooms === 1 ? true : false}
                        className="cursor"
                      >
                        -
                      </button>
                    </div>
                    <p className="mx-3">{bathrooms}</p>
                    <div
                      className="increment cursor"
                      onClick={() => increament("bathroom")}
                    >
                      <button
                        disabled={bathrooms === 3 ? true : false}
                        className="cursor"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    getFilteredUnits();
                  }}
                  class="text-white  font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none comman-bg mt-2"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-12 gap-4 top">
            {allUnits?.map((unit) => {
              return (
                <div
                  className="col-span-12 lg:col-span-4 relative cursor"
                  onClick={() =>
                    navigate(`/property-details`, { state: { id: unit.id } })
                  }
                >
                  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                      <img
                        class="rounded-t-lg"
                        src={
                          unit && unit.images[0]
                            ? unit.images[0]
                            : "images/gallary.png"
                        }
                        alt=""
                      />
                    </div>
                    <div class="p-2 flex items-center justify-between">
                      <h5 class="mb-2 text-2xl comman-blog-header">
                        {unit.unitType.name}
                      </h5>
                      <button
                        type="button"
                        class="text-white  font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2  focus:outline-none comman-bg"
                      >
                        Book Now
                      </button>
                    </div>

                    <div className="p-2 comman-grey">{unit.description}</div>

                    <div className="p-2">
                      <div class="border-b border-solid border-grey "></div>
                    </div>

                    <div className="p-2 flex items-center">
                      <div className="flex items-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.7"
                            d="M24 12.3077C24 11.0022 22.92 9.93407 21.6 9.93407V6.37363C21.6 5.06813 20.52 4 19.2 4H4.8C3.48 4 2.4 5.06813 2.4 6.37363V9.93407C1.08 9.93407 0 11.0022 0 12.3077V18.2418H1.596L2.4 20.6154H3.6L4.404 18.2418H19.608L20.4 20.6154H21.6L22.404 18.2418H24V12.3077ZM19.2 9.93407H13.2V6.37363H19.2V9.93407ZM4.8 6.37363H10.8V9.93407H4.8V6.37363ZM2.4 12.3077H21.6V15.8681H2.4V12.3077Z"
                            fill="#555555"
                          />
                        </svg>
                        <p className="mx-3 comman-grey">
                          {unit.bedrooms} Bedroom
                        </p>
                      </div>
                      <div className="flex items-center mx-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.7"
                            d="M21 14V15C21 16.91 19.93 18.57 18.35 19.41L19 22H17L16.5 20H7.5L7 22H5L5.65 19.41C4.84919 18.9852 4.17931 18.3501 3.71239 17.5731C3.24548 16.7961 2.99919 15.9065 3 15V14H2V12H20V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4C18.5 4 18.12 4.34 18 4.79C18.63 5.33 19 6.13 19 7H13C13 6.20435 13.3161 5.44129 13.8787 4.87868C14.4413 4.31607 15.2044 4 16 4H16.17C16.58 2.84 17.69 2 19 2C19.7956 2 20.5587 2.31607 21.1213 2.87868C21.6839 3.44129 22 4.20435 22 5V14H21ZM19 14H5V15C5 15.7956 5.31607 16.5587 5.87868 17.1213C6.44129 17.6839 7.20435 18 8 18H16C16.7956 18 17.5587 17.6839 18.1213 17.1213C18.6839 16.5587 19 15.7956 19 15V14Z"
                            fill="#555555"
                          />
                        </svg>

                        <p className="mx-3 comman-grey">
                          {unit.bathrooms} Bathroom
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-5 property-box comman-blue-font">
                    <p>Unit No {unit.unit_no}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Property;
