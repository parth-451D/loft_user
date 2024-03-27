import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import moment from "moment";
import Loader from "../../comman/loader";
import TruncateTextLimited from "../../comman/trancateLimited";

const BlogDetails = () => {
  const location = useLocation();
  const id = location?.state?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/blogs/${id}`,
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

  const getAllBlogs = async () => {
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

      setBlogData(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const Navigation = (id) => {
    navigate("/blog-Details", { state: { id: id } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    getBlogs();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="comman-header">
            <p>{blog?.title}</p>
          </div>
          <div className="mt-2 comman-grey">
            {/* <p>{blog?.description}</p> */}
            <p className="mt-1 large-font comman-blue-font">{blog?.author}</p>
            <p className="mt-1 comman-grey">
              {moment(blog?.date).format("DD MMMM, YYYY")}
            </p>
          </div>
          <div className="mt-3">
            <Carousel autoPlay infiniteLoop>
              {blog?.images?.map((img) => {
                return (
                  <div>
                    <img
                      src={img || "/images/gallary.png"}
                      alt="blogImg"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>

          <div className="top">
            <p className="common-gray mt-1 semi-large-font"></p>
            <p className="comman-midium-blue mb-1">Description</p>

            <p className="comman-grey mt-1">{blog.description}</p>
          </div>

          <div className="top text-center comman-header">
            <p>Read More Blogs</p>
          </div>

          <div className="grid grid-cols-12 gap-4 top">
            {blogData
              .filter((item) => item.id !== id)
              .slice(0, 3)
              .map((item, index) => (
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
          <div className="text-center mt-3">
            <button
              type="button"
              class="text-white  font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2  focus:outline-none comman-bg"
              onClick={() => {
                navigate("/blog");
              }}
            >
              View All
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
