import axios from "axios";
import React, { useEffect, useState } from "react";
import { ErrorAlert } from "../../comman/sweetalert";
import Loader from "../../comman/loader";

const About = () => {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAboutUsDate = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/webapp/about-us`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );
      setAboutUsData(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAboutUsDate();
  }, []);
  return (
    <>
      <div className="container mx-auto comman-padding">
        <div className="comman-header text-center top">
          <p>About Us</p>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-12 gap-4 top">
              <div className="col-span-12 lg:col-span-6">
                <img
                  src={
                    aboutUsData?.mission_img
                      ? aboutUsData?.mission_img
                      : "/images/gallary.png"
                  }
                  alt="No"
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <div className="flex items-center justify-center flex-col h-full p-3">
                  <div className="comman-midium-blue">
                    <p>Our Mission</p>
                    <p className="comman-grey mt-2">
                      {aboutUsData?.mission
                        ? aboutUsData?.mission
                        : `Lorem ipsum dolor sit amet consectetur. Eu scelerisque
                      nullam cursus at ultrices a curabitur. Molestie erat eu
                      dui vulputate duis. In nulla volutpat justo velit in
                      viverra vitae. Ipsum bibendum tempus faucibus nunc tortor.
                      Lectus felis mauris sit sed viverra tempor cursus risus
                      semper. Donec suspendisse leo a feugiat id viverra tellus.
                      Porttitor massa quisque amet mauris feugiat. Nec ultrices
                      vitae sapien ultrices. Vulputate ipsum morbi tempor vel
                      eget. Ac libero neque ac quisque. Lectus sit id morbi
                      massa sit. Eget molestie semper aenean sed cursus
                      vestibulum. At suspendisse nisi nisi neque nunc at.
                      Aliquam sed velit a nec aenean. Facilisi velit turpis
                      purus lobortis vitae lorem a tellus praesent. Ornare
                      facilisis ultricies urna cum sit libero suscipit ac non.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 top">
              <div className="col-span-12 lg:col-span-6">
                <div className="flex items-center justify-center flex-col h-full p-3">
                  <div className="comman-midium-blue">
                    <p>Our Vision</p>
                    <p className="comman-grey mt-2">
                      {aboutUsData?.vision
                        ? aboutUsData?.vision
                        : `Lorem ipsum dolor sit amet consectetur. Eu scelerisque
                      nullam cursus at ultrices a curabitur. Molestie erat eu
                      dui vulputate duis. In nulla volutpat justo velit in
                      viverra vitae. Ipsum bibendum tempus faucibus nunc tortor.
                      Lectus felis mauris sit sed viverra tempor cursus risus
                      semper. Donec suspendisse leo a feugiat id viverra tellus.
                      Porttitor massa quisque amet mauris feugiat. Nec ultrices
                      vitae sapien ultrices. Vulputate ipsum morbi tempor vel
                      eget. Ac libero neque ac quisque. Lectus sit id morbi
                      massa sit. Eget molestie semper aenean sed cursus
                      vestibulum. At suspendisse nisi nisi neque nunc at.
                      Aliquam sed velit a nec aenean. Facilisi velit turpis
                      purus lobortis vitae lorem a tellus praesent. Ornare
                      facilisis ultricies urna cum sit libero suscipit ac non.`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6">
                <img
                  src={
                    aboutUsData?.vision_image
                      ? aboutUsData?.vision_image
                      : "/images/gallary.png"
                  }
                  alt="vision_img"
                />
              </div>
            </div>

            <div className="comman-midium-blue text-center top">
              <p>Our Commitment</p>
            </div>
            <div className="grid grid-cols-12 gap-4 top">
              <div className="col-span-12 lg:col-span-3">
                <img
                  src={
                    aboutUsData?.slogan_image
                      ? aboutUsData?.slogan_image
                      : "/images/gallary.png"
                  }
                  alt="No"
                  className="h-full img-redius"
                />
              </div>
              <div className="col-span-12 lg:col-span-9">
                <div className="mx-3">
                  <div className="mt-2">
                    <p className="blue-30">{aboutUsData?.slogan1_name}</p>
                    <p className="comman-grey mt-2">
                      {aboutUsData?.slogan1_desc}
                    </p>
                    <div class="border-b border-solid border-grey mt-3"></div>
                  </div>
                  <div className="mt-2">
                    <p className="blue-30">{aboutUsData?.slogan2_name}</p>
                    <p className="comman-grey mt-2">
                      {aboutUsData?.slogan2_desc}
                    </p>
                    <div class="border-b border-solid border-grey mt-3"></div>
                  </div>
                  <div className="mt-2">
                    <p className="blue-30">{aboutUsData?.slogan3_name}</p>
                    <p className="comman-grey mt-2">
                      {aboutUsData?.slogan3_desc}
                    </p>
                    <div class="border-b border-solid border-grey mt-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default About;
