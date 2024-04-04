import React from "react";
import Banner from "../banner/banner";
import Gallary from "../gallary/gallary";
import Blog from "../blog/blog";
import Aminites from "../aminites/aminites";
import Units from "../Units/units";
import Testimonuls from "../testimonuls/testimonuls";

const Home = () => {
  return (
    <>
      <div >
        <Banner />
        <Aminites />
        <Units />
        <Gallary />
        <Blog />
        <Testimonuls />
      </div>
    </>
  );
};

export default Home;
