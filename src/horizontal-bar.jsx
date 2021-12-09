import React, { useEffect, useRef, useState } from "react";
import arrow_left_png from "./arrow-left.png";
import arrow_right_png from "./arrow-right.png";
import sectionItems from "./section-items";

const maximumMarginLeft = 850;
const defaultTitle = "Section a point in my journey to learn more";

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

  return (
    <div className="number-item" onMouseOver={hover.bind(this)} onMouseLeave={leave.bind(this)} id={`section_item_${item.id}`}>
      {isOn ? (
        <>
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
  const [title, setTitle] = useState();
  const [pos, setPos] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  const moveRight = () => {
    setPos(Math.min(pos + 15, maximumMarginLeft));
  };
  const moveLeft = () => {
    setPos(Math.max(0, pos - 15));
  };
  const onWheel = (evt) => {
    if (evt.deltaY > 0) moveRight();
    else moveLeft();
  };
  const mouseOver = (evt) => {
    setShowArrow(true);
  };
  const mouseLeave = (evt) => {
    setShowArrow(false);
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
    <div className="nav-no-hover" onMouseOver={mouseOver.bind(this)} onMouseLeave={mouseLeave.bind(this)} ref={(e) => (navHover.current = e)}>
      <div className="point-label">{title ?? defaultTitle}</div>
      <div className={`arrow-line ${showArrow ? "" : "hide"}`}>
        <img src={arrow_left_png} alt="arrow-left" onMouseUp={moveLeft.bind(this)} onMouseDown={moveLeft.bind(this)} />
        <img src={arrow_right_png} alt="arrow-right" onMouseUp={moveRight.bind(this)} onMouseDown={moveRight.bind(this)} />
      </div>
      <div className="numbers-line" onWheel={onWheel.bind(this)}></div>
      <div className="numbers-body" style={{ marginLeft: -pos }} onWheel={onWheel.bind(this)}>
        {sectionItems.map((item) => (
          <NumberItem key={item.id} item={item} setTitle={setTitle} />
        ))}
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
