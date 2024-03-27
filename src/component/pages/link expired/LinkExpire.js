import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const LinkExpire = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container mx-auto">
        <section className="h-screen">
          <div className="h-full">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img
                  src="/images/recover.png"
                  className="w-full hidden md:block"
                  alt="Sample_image"
                />
              </div>
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <div className="image cursor">
                  <img
                    src="/images/loftslogo 2.png"
                    alt=""
                    onClick={() => navigate("/home")}
                  />
                </div>

                <div className="comman-header mt-3">
                  <p>Link is Expired!</p>
                </div>

                <div className="comman-grey mt-3">
                  <p>
                    Kindly generate link from{" "}
                    <NavLink
                      to={"/forgot-password"}
                      className={"text-blue-600"}
                    >
                      here
                    </NavLink>
                  </p>
                </div>

                <div className="top">
                  <img src="/images/Verify Icon.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NavLink to={"/forgot-password"}>here</NavLink>
    </div>
  );
};

export default LinkExpire;
