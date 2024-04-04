import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import DatePicker from "react-datepicker";
import moment from "moment";

const PropertyDetails = () => {
  const [open, setOpen] = useState(false);
  const [unitData, setUnitData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const id =
    location?.state?.id ||
    JSON.parse(localStorage.getItem("bookingDetails"))?.unitId;
  const dateInfo = JSON.parse(localStorage.getItem("dateInfo"));
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const localCheckinDate =
    dateInfo?.checkInDate && dateInfo?.checkOutDate
      ? new Date(dateInfo?.checkInDate)
      : null;
  const localCheckoutDate =
    dateInfo?.checkInDate && dateInfo?.checkOutDate
      ? new Date(dateInfo?.checkOutDate)
      : null;
  const [checkInDate, setCheckInDate] = useState(
    localCheckinDate && localCheckoutDate ? localCheckinDate : today
  );
  const [checkOutDate, setCheckOutDate] = useState(
    localCheckinDate && localCheckoutDate ? localCheckoutDate : tomorrow
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const getUnitData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/units/flats/${id}?start_date=${moment(checkInDate).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(checkOutDate).format("YYYY-MM-DD")}`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );
      setUnitData(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUnitData();
  }, [checkInDate, checkOutDate]);

  const checkInDateDiff = moment(checkInDate);
  const checkOutDateDiff = moment(checkOutDate);

  const diffInDays = checkOutDateDiff.diff(checkInDateDiff, "days");

  const onSubmitHandler = async () => {
    if (!token) {
      localStorage.setItem(
        "bookingDetails",
        JSON.stringify({
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          unitId: id,
        })
      );
      navigate("/login");
    } else {
      setIsLoading(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/units/flats/check-availability/${id}`,
          {
            start_date: moment(checkInDate).format("YYYY-MM-DD"),
            end_date: moment(checkOutDate).format("YYYY-MM-DD"),
          }
        );
        if (res.data.code === 200) {
          localStorage.setItem(
            "bookingDetails",
            JSON.stringify({
              checkInDate: checkInDate,
              checkOutDate: checkOutDate,
              unitId: id,
            })
          );
          SuccessAlert({ title: res.data.msg });
          navigate("/booking");
        }
      } catch (error) {
        ErrorAlert({ title: error?.response?.data?.error });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="flex items-center">
            <div className="comman-midium-grey">
              <p>Floor {unitData?.floor} /</p>
            </div>
            <div className="comman-blog-header mx-2">
              <p> Unit {unitData?.unit_no}</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 top">
            <div className="col-span-12 lg:col-span-6">
              <img
                src={unitData?.images[0]}
                alt=""
                className="h-full rounded-lg"
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="image">
                <img src={unitData?.images[1]} alt="" className="rounded-lg" />
                <div className="w-full flex mt-2">
                  <div className="w-1/2">
                    <img
                      src={unitData?.images[2]}
                      alt=""
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="w-1/2 mx-2 relative">
                    <img
                      src={unitData?.images[3]}
                      alt=""
                      className="w-full rounded-lg"
                    />
                    <button
                      type="button"
                      class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  
                    focus:outline-none bg-white  absolute bottom-0 right-2 theme-color"
                      onClick={onOpenModal}
                    >
                      Show all photos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal open={open} onClose={onCloseModal} center>
            <div className="comman-blog-header">
              <p>photos</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              {unitData?.images?.map((img) => {
                return (
                  <div className="col-span-6 lg:col-span-3">
                    <img src={img} alt="" className="h-full" />
                  </div>
                );
              })}
            </div>
          </Modal>

          <div className="grid grid-cols-12 gap-4 top">
            <div className="col-span-12 lg:col-span-6">
              <div className="comman-blog-header">
                <p>UNIT NO. {unitData?.unit_no}</p>
              </div>
              <div className="comman-header mt-3">
                <p>{unitData?.unitType.name}</p>
              </div>
              <div className="mt-3 comman-blog-header">
                <p>Property Details:</p>
              </div>
              <div className="mt-3 comman-grey">
                <p>{unitData?.description}</p>
              </div>
              <div className="mt-3 comman-blog-header">
                <p>Bedrooms & Bathrooms</p>
              </div>
              <div className="grid grid-cols-12 gap-4 top">
                <div className="col-span-12 lg:col-span-6">
                  {/* <div className="comman-blue-font">
                    <p>
                      Bedrooms: {unitData?.bedrooms} 
                    </p>
                  </div> */}
                  <div className="flex mt-2">
                    <div className="property-box">
                      <div className="comman-grey">
                        <p>Bedroom : {unitData?.bedrooms}</p>
                      </div>
                      <div className="comman-grey mt-3">
                        <p>Bunk | King Bed</p>
                      </div>
                      <div className="comman-grey mt-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_313_450)">
                            <path
                              opacity="0.7"
                              d="M0 0H2.18182V7.7037H9.81818V1.10053H19.6364C22.0364 1.10053 24 3.08148 24 5.50265V23.1111H21.8182V20.9101H2.18182V23.1111H0V0ZM12 3.30159V7.7037H21.8182V5.50265C21.8182 4.29206 20.8364 3.30159 19.6364 3.30159H12ZM2.18182 9.90476V18.709H9.81818V12.1058H19.6364C20.4 12.1058 21.1636 12.3259 21.8182 12.7661V9.90476H2.18182ZM6 12.1058C7.52727 12.1058 8.72727 13.3164 8.72727 14.8571C8.72727 16.3979 7.52727 17.6085 6 17.6085C4.47273 17.6085 3.27273 16.3979 3.27273 14.8571C3.27273 13.3164 4.47273 12.1058 6 12.1058ZM6 13.8667C5.45455 13.8667 5.01818 14.3069 5.01818 14.8571C5.01818 15.4074 5.45455 15.8476 6 15.8476C6.54545 15.8476 6.98182 15.4074 6.98182 14.8571C6.98182 14.3069 6.54545 13.8667 6 13.8667ZM12 14.3069V18.709H21.8182V16.5079C21.8182 15.2974 20.8364 14.3069 19.6364 14.3069H12ZM6 1.10053C7.52727 1.10053 8.72727 2.31111 8.72727 3.85185C8.72727 5.39259 7.52727 6.60317 6 6.60317C4.47273 6.60317 3.27273 5.39259 3.27273 3.85185C3.27273 2.31111 4.47273 1.10053 6 1.10053ZM6 2.86138C5.45455 2.86138 5.01818 3.30159 5.01818 3.85185C5.01818 4.40212 5.45455 4.84233 6 4.84233C6.54545 4.84233 6.98182 4.40212 6.98182 3.85185C6.98182 3.30159 6.54545 2.86138 6 2.86138Z"
                              fill="#555555"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_313_450">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  {/* <div className="comman-blue-font">
                    <p>Bathrooms: </p>
                  </div> */}
                  <div className="flex mt-2">
                    <div className="property-box">
                      <div className="comman-grey">
                        <p>Bathroom : {unitData?.bathrooms}</p>
                      </div>
                      <div className="comman-grey mt-3">
                        <p>Toilet | Shower</p>
                      </div>
                      <div className="comman-grey mt-3 flex">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_313_478)">
                            <path
                              opacity="0.7"
                              d="M22.9646 1.51147C22.5938 1.03956 22.1166 0.657684 21.5703 0.395536C21.0239 0.133388 20.4231 -0.00195967 19.8146 2.14385e-05H19.1816L16.3185 10.8H1V12.4C1 14.7241 1.95177 16.8063 3.6799 18.2629C5.31508 19.641 7.55892 20.4 9.99827 20.4H11.9474L11.5384 24H21.8596V11.702L23.6701 4.87277C23.8247 4.29717 23.8416 3.69444 23.7192 3.11145C23.5969 2.52846 23.3386 1.98094 22.9646 1.51147ZM20.2236 22.4H13.3663L13.7753 18.8H9.99827C5.66351 18.8 2.63605 16.1682 2.63605 12.4H20.2236V22.4ZM22.0864 4.47122L20.4086 10.8H18.0086L20.4269 1.67822C21.0237 1.8365 21.5326 2.21849 21.8433 2.74135C22.154 3.26421 22.2414 3.88577 22.0865 4.47122H22.0864Z"
                              fill="#555555"
                              stroke="#555555"
                              stroke-width="0.5"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_313_478">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-2"
                        >
                          <g clip-path="url(#clip0_313_480)">
                            <path
                              opacity="0.7"
                              d="M22.8 14.4V15.6C22.8 17.892 21.516 19.884 19.62 20.892L20.4 24H18L17.4 21.6H6.6L6 24H3.6L4.38 20.892C3.41902 20.3822 2.61517 19.6202 2.05487 18.6877C1.49457 17.7553 1.19902 16.6878 1.2 15.6V14.4H0V12H21.6V3.6C21.6 3.28174 21.4736 2.97652 21.2485 2.75147C21.0235 2.52643 20.7183 2.4 20.4 2.4C19.8 2.4 19.344 2.808 19.2 3.348C19.956 3.996 20.4 4.956 20.4 6H13.2C13.2 5.04522 13.5793 4.12955 14.2544 3.45442C14.9295 2.77928 15.8452 2.4 16.8 2.4H17.004C17.496 1.008 18.828 0 20.4 0C21.3548 0 22.2705 0.379285 22.9456 1.05442C23.6207 1.72955 24 2.64522 24 3.6V14.4H22.8ZM20.4 14.4H3.6V15.6C3.6 16.5548 3.97929 17.4705 4.65442 18.1456C5.32955 18.8207 6.24522 19.2 7.2 19.2H16.8C17.7548 19.2 18.6705 18.8207 19.3456 18.1456C20.0207 17.4705 20.4 16.5548 20.4 15.6V14.4Z"
                              fill="#555555"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_313_480">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 comman-blog-header">
                <p>Layout / Floor Plan:</p>
              </div>
              <div className="image mt-3">
                <img
                  src={
                    unitData?.floorplan_image
                      ? unitData?.floorplan_image
                      : "/images/property-img.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="payment-info">
                <div className="comman-blog-header">
                  <p>Payment Info</p>
                </div>
                <div className="grid grid-cols-12 gap-4 top">
                  <div className="col-span-6 lg:col-span-6 payment-checkIn">
                    <div className="comman-grey">
                      <p>Check-in</p>
                    </div>
                    <div className="comman-grey mt-2">
                      <DatePicker
                        className="cursor"
                        selected={checkInDate}
                        onChange={handleCheckInChange}
                        placeholderText="Check-in"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                      />
                    </div>
                  </div>
                  <div className="col-span-6 lg:col-span-6 payment-checkIn">
                    <div className="comman-grey">
                      <p>Check-out</p>
                    </div>
                    <div className="comman-grey mt-2 cursor">
                      <DatePicker
                        className="cursor"
                        selected={checkOutDate}
                        onChange={handleCheckOutChange}
                        placeholderText="Check-out"
                        dateFormat="dd/MM/yyyy"
                        minDate={
                          checkInDate
                            ? moment(checkInDate).add(1, "days").toDate()
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>
                      $
                      {unitData?.newPrice
                        ? unitData?.newPrice
                        : unitData?.price}
                      {" "} * {diffInDays} Days
                    </p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>
                      $
                      {unitData?.newPrice
                        ? unitData?.newPrice * diffInDays
                        : unitData?.price * diffInDays}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>Clean and Dry</p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>${unitData?.cleaning_fees}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="comman-grey">
                    <p>Deposit</p>
                  </div>
                  <div className="comman-grey mt-2">
                    <p>${unitData?.deposit | 0}</p>
                  </div>
                </div>

                <div class="border-b border-solid border-grey-500 mt-3"></div>

                <div className="flex justify-between items-center mt-3">
                  <div className="comman-blue-font">
                    <p>Total</p>
                  </div>
                  <div className="comman-blue-font">
                    <p>
                      ${" "}
                      {unitData?.newPrice
                        ? unitData?.newPrice * diffInDays
                        : unitData?.price * diffInDays +
                          (unitData?.cleaning_fees || 0) + // Added parentheses to ensure proper addition
                          (unitData?.deposit || 0)}{" "}
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => onSubmitHandler()}
                    class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                   focus:outline-none comman-bg w-full"
                  >
                    {token ? "Check Availability" : "Login to Continue"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
