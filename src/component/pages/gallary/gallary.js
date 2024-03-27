import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import { useNavigate } from "react-router-dom";

const Gallary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gallary, setGallary] = useState([]);
  const navigate = useNavigate();

  const getGallary = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/gallery-home`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setGallary(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const Navigation = (id) => {
    navigate("/blog-Details", { state: { id: id } });
  };

  useEffect(() => {
    getGallary();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="comman-header text-center top">
            <p>Gallery</p>
          </div>

          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 top">
            <div className="lg:col-span-6">
              <img
                src={gallary[0]?.image}
                alt="Image 2"
                className="w-full rounded-lg h-full"
              />
            </div>
            <div className="lg:col-span-6 grid grid-cols-4 gap-2">
              <div className="lg:col-span-6 flex">
                <div className="lg:w-1/2 pr-1">
                  <img
                    src={gallary[1]?.image}
                    alt="Image 3"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="lg:w-1/2 pl-1">
                  <img
                    src={gallary[2]?.image}
                    alt="Image 4"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 flex mt-2">
                <div className="lg:w-1/2 pr-1">
                  <img
                    src={gallary[3]?.image}
                    alt="Image 5"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="lg:w-1/2 pl-1">
                  <img
                    src={gallary[4]?.image}
                    alt="Image 6"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 grid grid-cols-4 gap-4 mt-4">
            {gallary.slice(5, 9).map((item, index) => (
              <div className="lg:col-span-1" key={index}>
                <img
                  src={item?.image}
                  alt="Image 6"
                  className="w-full rounded-lg"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <button
              type="button"
              class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none comman-bg"
              onClick={() => {
                navigate("/gallary");
              }}
            >
              View More Photos
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallary;
