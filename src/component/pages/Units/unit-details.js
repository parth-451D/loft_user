import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import { Carousel } from "react-responsive-carousel";
import Loader from "../../comman/loader";
import { useLocation } from "react-router-dom";

const UnitDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const [unitData, setUnitData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState([]);

  const Unitid = location?.state?.id;

  const handleItemClick = async (index, id) => {
    await getUnitDetail(id);
    setActiveIndex(index === activeIndex ? null : index); // Toggle active index
  };

  const getUnitDetailsList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/unit-details-list`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setUnits(res.data.result);

      const initialActiveIndex = res.data.result.findIndex(
        (unit) => unit.id === Unitid
      );
      setActiveIndex(initialActiveIndex);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUnitDetailsList();
  }, []);

  const getUnitDetail = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/unit-details/${
          id ? id : Unitid
        }`,
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
    getUnitDetail();
  }, [Unitid]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="comman-header text-center top">
            <p>Unit Details</p>
          </div>

          <ul class="flex flex-nowrap overflow-x-auto text-sm font-medium text-center text-gray-500 dark:text-gray-400 top">
            {units.map((item, index) => (
              <li className="me-2" key={index}>
                <p
                  className={`inline-block px-4 py-3 rounded-lg whitespace-nowrap ${
                    activeIndex === index
                      ? "text-white comman-bg rounded-lg active"
                      : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor"
                  }`}
                  onClick={() => handleItemClick(index, item.id)}
                >
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
          {/* <div className="flex items-center justify-center h-auto mt-3">
          <img src="/images/main.png" alt="" className="w-full md:h-[515px]" />
        </div> */}
          <div className="mt-3">
            <Carousel autoPlay infiniteLoop showThumbs={false}>
              {unitData?.images?.map((img, index) => (
                <div key={index}>
                  <img src={img} alt="" className="w-full md:h-[515px]" />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="comman-midium-blue top">
            <p>
              {unitData?.title}{" "}
              <span className="comman-small-blue">{unitData?.dimentions}</span>
            </p>
          </div>

          <div className="font-bold top text-gray-600">
            <p>{unitData?.subtitle}</p>
          </div>

          <div className="mt-2 comman-grey">
            <p>{unitData?.description}</p>
          </div>

          <div className="top">
            <p className="comman-blog-header">Services we provide:</p>
          </div>

          <div className="top flex flex-wrap">
            {unitData?.features?.map((item, index) => (
              <div className="unit-box mr-5" key={index}>
                <p className="comman-blue-font">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UnitDetails;
