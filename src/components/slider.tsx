import React, { Children, ReactNode } from "react";
import classes from "./slider.module.css";
import useSlider from "../hooks/useSlider";

interface SliderProps {
  children: ReactNode;
  sliderLength?: number;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  keyPressControl?: boolean;
  touchControl?: boolean;
  infinite?:boolean;
}

const Slider: React.FC<SliderProps> = ({
  children,
  width = 500,
  height = 300,
  ...sliderProps
}) => {

  const {
    currentSlide,
    setCurrentSlide,
    handleMouseEnter,
    handleMouseLeave,
    goToNextSlide,
    goToPrevSlide,
    touchStartHandler,
    touchMoveHandler,
    touchEndHandler,
  } = useSlider(sliderProps);

  //Slides
  const sliderItems = Children.map(children, (child, index) => (
    <div
      className={`${classes.slide} ${
        index === currentSlide ? classes.active : ""
      }`}
    >
      {child}
    </div>
  ));

  //Indicators
  const sliderIndicators = Children.map(children, (_, i) => (
    <li>
      <button
        key={i}
        className={
          currentSlide === i
            ? classes.indicator
            : `${classes.indicator} ${classes.indicatorInactive}`
        }
        onClick={() => {
          setCurrentSlide(i);
        }}
      ></button>
    </li>
  ));

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.LeftArrow} onClick={goToPrevSlide}>
        ❰
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes.slider}
        style={{
          transform: `translateX(-${currentSlide * width}px)`,
          width,
          height,
        }}
        onTouchStart={(e) => touchStartHandler(e)}
        onTouchMove={(e) => touchMoveHandler(e)}
        onTouchEnd={() => touchEndHandler()}
      >
        {sliderItems}
      </div>
      <div className={classes.RightArrow} onClick={goToNextSlide}>
        ❱
      </div>

      <ul className={classes.indicators}>{sliderIndicators}</ul>
    </div>
  );
};

export default Slider;
