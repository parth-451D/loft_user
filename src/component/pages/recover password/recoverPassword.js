import React from "react";
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const navigate = useNavigate();
  return (
    <>
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
                <div className="image cursor" onClick={() => navigate("/home")}>
                  <img src="/images/loftslogo 2.png" alt="" />
                </div>

                <div className="comman-header mt-3">
                  <p>Recovery Link Sent!</p>
                </div>

                <div className="comman-grey mt-3">
                  <p>
                    Please check your registered email address to recover
                    account.
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
    </>
  );
};

export default RecoverPassword;
