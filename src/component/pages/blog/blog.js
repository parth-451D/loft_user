import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorAlert } from "../../comman/sweetalert";
import moment from "moment";
import Loader from "../../comman/loader";
import { useNavigate } from "react-router-dom";
import TruncateText from "../../comman/trancate";
import TruncateTextLimited from "../../comman/trancateLimited";

const Blog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/limited-blogs`,
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

  useEffect(() => {
    getBlogs();
  }, []);

  const Navigation = (id) => {
    navigate("/blog-Details", { state: { id: id } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto comman-padding">
          <div className="comman-header text-center top">
            <p>Blog</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 top">
            <div className="lg:col-span-6">
              <img src="/images/gallary.png" alt="Image_2" className="w-full" />
              <div className="mt-1 comman-blog-header">
                <p>{blog[0]?.title}</p>
                <p className="mt-1 comman-grey">{blog[0]?.description}</p>

                <p className="mt-1">{blog[0]?.author}</p>

                <p className="mt-1 comman-grey">
                  {moment(blog[0]?.date).format("DD MMMM, YYYY")}
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              {blog.map((data, index) => (
                <div
                  className="flex mt-4 cursor"
                  key={index}
                  onClick={() => {
                    Navigation(data.id);
                  }}
                >
                  <div>
                    <img
                      src="/images/room1.png"
                      alt="Image_6"
                      className="h-full blog-img"
                    />
                  </div>
                  <div className="mx-2 comman-blog-side">
                    <p>
                      <TruncateTextLimited
                        text={data?.description}
                        maxLength={120}
                      />
                    </p>
                    <p className="mt-1">{data?.author}</p>

                    <p className="mt-1 comman-grey">
                      {moment(blog?.date).format("DD MMMM, YYYY")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              type="button"
              class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none comman-bg"
              onClick={() => {
                navigate("/blog");
              }}
            >
              View More Blogs
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
