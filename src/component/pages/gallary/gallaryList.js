import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import NoData from "../../comman/nodata";

const GallaryList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gallaryType, setGallaryType] = useState([]);
  const [gallaryData, setGallaryData] = useState([]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [typeId, setTypeId] = useState(null);

  const handleItemClick = (index, id) => {
    setTypeId(id);
    setActiveIndex(index === activeIndex ? null : index); // Toggle active index
  };

  const getGallaryType = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/gallery-type`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setGallaryType(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const getGallary = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/gallery?type=${
          typeId ? typeId : "All"
        }`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setGallaryData(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGallaryType();
    getGallary();
  }, []);

  useEffect(() => {
    getGallary();
  }, [typeId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="comman-header text-center top">
            <p>Gallery</p>
          </div>
          <div class="flex overflow-x-scroll items-center justify-center">
            <ul class="flex flex-nowrap overflow-x-auto text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li class="me-2">
                <a
                  className={`inline-block px-4 py-3 rounded-lg ${
                    activeIndex === null
                      ? "text-white comman-bg rounded-lg active"
                      : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor"
                  }`}
                  onClick={() => handleItemClick(null)} // Handle click event for "All"
                >
                  All
                </a>
              </li>
              {gallaryType.map((item, index) => (
                <li class="me-2" key={index}>
                  <a
                    className={`inline-block px-4 py-3 rounded-lg ${
                      activeIndex === index
                        ? "text-white comman-bg rounded-lg active"
                        : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor"
                    }`}
                    onClick={() => handleItemClick(index, item.id)} // Handle click event
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="grid grid-cols-12 gap-4 mt-5 top">
            {gallaryData.map((item, index) => (
              <div class="lg:col-span-3 col-span-6" key={index}>
                <img src={item?.image} alt="No Image" className="rounded-lg h-full w-full" style={{maxHeight:"200px"}}/>
              </div>
            ))}
          </div>
          {gallaryData.length === 0 && <NoData />}
        </div>
      )}
    </>
  );
};

export default GallaryList;
