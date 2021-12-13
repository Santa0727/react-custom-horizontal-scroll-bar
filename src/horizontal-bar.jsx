import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import arrow_left_png from "./arrow-left.png";
import arrow_right_png from "./arrow-right.png";
import sectionItems from "./section-items";

const defaultTitle = "Section a point in my journey to learn more";

const responsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 5,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 3,
    },
  },
];

const NumberItem = ({ item, setTitle }) => {
  const currentX = useRef();
  const [isOn, setIsOn] = useState(false);

  const hover = () => {
    setTitle(item.title);
    setIsOn(true);
  };
  const leave = () => {
    setTitle(null);
    setIsOn(false);
  };
  const mouseDown = (event) => {
    currentX.current = event.clientX;
  };
  const mouseUp = (event) => {
    if (event.clientX !== currentX.current) return;
    goToSection();
  };
  const goToSection = () => {
    const element = document.getElementById(`section_id_${item.id}`);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="number-item" onMouseOver={hover.bind(this)} onMouseLeave={leave.bind(this)} id={`section_item_${item.id}`} onMouseDown={mouseDown.bind(this)} onMouseUp={mouseUp.bind(this)}>
      {isOn ? (
        <>
          <div className="orange-value">{item.label}</div>
          <div className="number-point strong-point"></div>
          <div className="number-value">
            <img src={item.png} alt="item.label" />
          </div>
        </>
      ) : (
        <>
          <div className="number-point"></div>
          <div className="number-value">{item.label}</div>
        </>
      )}
    </div>
  );
};

const NavNoHover = () => {
  const sliderWrapper = useRef();
  const [title, setTitle] = useState();

  const moveRight = () => {
    sliderWrapper.current.slickNext();
  };
  const moveLeft = () => {
    sliderWrapper.current.slickPrev();
  };

  return (
    <div className="nav-no-hover">
      <div className="point-label">{title ?? defaultTitle}</div>
      <div className="arrow-line">
        <img src={arrow_left_png} alt="arrow-left" onMouseUp={moveLeft.bind(this)} onMouseDown={moveLeft.bind(this)} />
        <img src={arrow_right_png} alt="arrow-right" onMouseUp={moveRight.bind(this)} onMouseDown={moveRight.bind(this)} />
      </div>
      <div className="numbers-line"></div>
      <div className="numbers-body">
        <Slider speed={500} slidesToShow={6} slidesToScroll={1} arrows={false} ref={(r) => (sliderWrapper.current = r)} responsive={responsive} adaptiveHeight={true} centerPadding="15px">
          {sectionItems.map((item) => (
            <NumberItem key={item.id} item={item} setTitle={setTitle} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const HorizontalBar = () => {
  return (
    <div className="horizontal-bar">
      <NavNoHover />
    </div>
  );
};

export default HorizontalBar;
