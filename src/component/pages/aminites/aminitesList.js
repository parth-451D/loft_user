import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";
import { useNavigate } from "react-router-dom";
import TruncateText from "../../comman/trancate";

const AnimitesList = () => {
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
                <div className="comman-blog-header mt-2">
                  <p>{item?.title}</p>
                </div>
                <div className="comman-grey mt-2">
                  <p>
                    <TruncateText text={item?.description} maxLength={100} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimitesList;
