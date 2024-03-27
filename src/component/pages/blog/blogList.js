import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import moment from "moment";
import Loader from "../../comman/loader";
import { useNavigate } from "react-router-dom";
import TruncateTextLimited from "../../comman/trancateLimited";

const BlogList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/blogs`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setBlog(res.data.result);
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
    getBlogs();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="grid grid-cols-12 gap-4 top">
            {blog.map((item, index) => (
              <div
                className="col-span-12 lg:col-span-4 cursor"
                key={index}
                onClick={() => {
                  Navigation(item.id);
                }}
              >
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a>
                    <img
                      class="rounded-t-lg"
                      src="/images/gallary.png"
                      alt=""
                    />
                  </a>
                  <div class="p-5">
                    <a>
                      <h5 class="mb-2 text-2xl comman-blue-font">
                        {item?.title}
                      </h5>
                    </a>
                    <p class="mb-3 comman-grey">
                      <TruncateTextLimited
                        text={item?.description}
                        maxLength={70}
                      />
                    </p>
                  </div>

                  <div className="flex justify-between p-3 mx-2 items-center">
                    <p className="comman-blue-font">{item?.author}</p>
                    <p className="comman-grey">
                      {moment(item.date).format("DD MMMM, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogList;
