import React, {
  Children,
  ReactNode,
  useRef,
} from "react";
import "./slider.css";
import useSlider from "../hooks/useSlider";

interface SliderProps {
  children: ReactNode;
  sliderLength: number | undefined;
}

const Slider: React.FC<SliderProps> = ({ children, sliderLength }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const {
    currentSlide,
    setCurrentSlide,
    handleMouseEnter,
    handleMouseLeave,
    transformStyle,
    setTransformStyle,
    widthSpan
  } = useSlider({ sliderLength, intervalMilliseconds: 3000 });

  //Slides
  const sliderItems = Children.map(children, (child, index) => (
    <div
      style={{transform: transformStyle}}
      className={`slide ${index === currentSlide ? "active" : ""}`}
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
          currentSlide === i ? "indicator" : "indicator indicator-inactive"
        }
        onClick={() => {
          console.log(currentSlide);
          setTransformStyle(() => `translateX(-${(currentSlide + 1) * widthSpan}00%)`);
          setCurrentSlide(i);
        }}
      ></button>
    </li>
  ));

  return (
    <div className="slider-container">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={(ref) => (sliderRef.current = ref)}
        className="slider"
      >
        {sliderItems}
      </div>

      <ul className="indicators">
        {sliderIndicators}
      </ul>
    </div>
  );
};

export default Slider;
