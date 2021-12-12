import React, { useEffect, useRef, useState } from "react";
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
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    },
  },
];

const NumberItem = ({ item, setTitle }) => {
  const [isOn, setIsOn] = useState(false);

  const hover = () => {
    setTitle(item.title);
    setIsOn(true);
  };
  const leave = () => {
    setTitle(null);
    setIsOn(false);
  };
  const goToSection = () => {
    const element = document.getElementById(`section_id_${item.id}`);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="number-item" onMouseOver={hover.bind(this)} onMouseLeave={leave.bind(this)} id={`section_item_${item.id}`} onClick={goToSection.bind(this)}>
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
  const navHover = useRef();
  const sliderWrapper = useRef();
  const [title, setTitle] = useState();

  const moveRight = () => {
    sliderWrapper.current.slickNext();
  };
  const moveLeft = () => {
    sliderWrapper.current.slickPrev();
  };
  const onWheel = (evt) => {
    if (evt.deltaY > 0) moveRight();
    else moveLeft();
  };
  const stopScrolling = (evt) => {
    evt.preventDefault();
  };

  useEffect(() => {
    if (navHover.current) {
      navHover.current.addEventListener("mousewheel", stopScrolling.bind(this), { passive: false });
    }
    return () => {
      navHover.current.removeEventListener("mousewheel", stopScrolling.bind(this));
    };
  }, []);

  return (
    <div className="nav-no-hover" ref={(e) => (navHover.current = e)}>
      <div className="point-label">{title ?? defaultTitle}</div>
      <div className="arrow-line">
        <img src={arrow_left_png} alt="arrow-left" onMouseUp={moveLeft.bind(this)} onMouseDown={moveLeft.bind(this)} />
        <img src={arrow_right_png} alt="arrow-right" onMouseUp={moveRight.bind(this)} onMouseDown={moveRight.bind(this)} />
      </div>
      <div className="numbers-line" onWheel={onWheel.bind(this)}></div>
      <div className="numbers-body" onWheel={onWheel.bind(this)}>
        <Slider speed={500} slidesToShow={5} slidesToScroll={1} arrows={false} ref={(r) => (sliderWrapper.current = r)} responsive={responsive} adaptiveHeight={true} centerPadding="15px">
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
