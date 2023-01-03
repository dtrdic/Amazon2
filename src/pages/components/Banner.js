import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Banner() {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading="lazy"
            src="https://links.papareact.com/gi1"
            alt=""
          ></img>
        </div>
        <div>
          {" "}
          <img
            loading="lazy"
            src="https://links.papareact.com/6ff"
            alt=""
          ></img>
        </div>
        <div>
          {" "}
          <img
            loading="lazy"
            src="https://links.papareact.com/7ma"
            alt=""
          ></img>
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
