import React, { useEffect, useState } from "react";

interface UseSliderProps {
  sliderLength: number | undefined;
  intervalMilliseconds: number; // Time interval in milliseconds
}

interface UseSliderReturn {
  currentSlide: number;
  setCurrentSlide: any;
  handleMouseEnter: (e: React.MouseEvent) => void;
  handleMouseLeave: (e: React.MouseEvent) => void;
  transformStyle: string;
  setTransformStyle: any;
  widthSpan: number;
}

const widthSpan = 100.1;

const useSlider = ({
  sliderLength,
  intervalMilliseconds,
}: UseSliderProps): UseSliderReturn => {

  //Handle Slides
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [transformStyle, setTransformStyle] = useState<string>(`translateX(0%)`);

  const goToNextSlide = () => {
    let toTranslate = widthSpan * (currentSlide + 1);
    console.log(toTranslate);
    setTransformStyle(`translateX(-${toTranslate}00%)`)
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderLength);
  };

  const goToPrevSlide = () => {
    let toTranslate = -widthSpan * currentSlide;
    setTransformStyle(`translateX(-${toTranslate}00%)`)
    setCurrentSlide((prevSlide) => (prevSlide - 1 + sliderLength) % sliderLength);
  };

  //Automated Slider
  const [isAutoLooping, setAutoLooping] = useState(true);

  useEffect(() => {
    const intervalId = isAutoLooping
      ? setInterval(goToNextSlide, intervalMilliseconds)
      : undefined;

    return () => {
      clearInterval(intervalId);
    };
  }, [goToNextSlide, intervalMilliseconds, currentSlide, transformStyle]);

  //Pause loop when mouse enter
  const handleMouseEnter = () => {
    setAutoLooping(false);
  };

  const handleMouseLeave = () => {
    setAutoLooping(true);
  };

  return {
    currentSlide,
    setCurrentSlide,
    handleMouseEnter,
    handleMouseLeave,
    transformStyle,
    setTransformStyle,
    widthSpan
  };
};

export default useSlider;
