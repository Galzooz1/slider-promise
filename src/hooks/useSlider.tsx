import React, { useEffect, useState } from "react";

interface UseSliderProps {
  sliderLength?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  keyPressControl?: boolean;
  infinite?:boolean;
}

interface UseSliderReturn {
  currentSlide: number;
  setCurrentSlide: any;
  handleMouseEnter: (e: React.MouseEvent) => void;
  handleMouseLeave: (e: React.MouseEvent) => void;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  touchStartHandler: (
    e:
      | {
          targetTouches: { clientX: React.SetStateAction<number> }[];
        }
      | any
  ) => void;
  touchMoveHandler: (
    e:
      | {
          targetTouches: { clientX: React.SetStateAction<number> }[];
        }
      | any
  ) => void;
  touchEndHandler: () => void;
}

const useSlider = ({
  sliderLength,
  autoPlay = false,
  autoPlayInterval,
  keyPressControl = false,
  infinite = false
}: UseSliderProps): UseSliderReturn => {
  
  //Handle Slides
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoLooping, setAutoLooping] = useState<boolean>(autoPlay);
  const [touchStartPosition, setTouchStartPosition] = useState<number>(0);
  const [touchEndPosition, setTouchEndPosition] = useState<number>(0);
  const [touched, setTouched] = useState<boolean>(false);
  const [swiped, setSwiped] = useState<boolean>(false);

  const goToNextSlide = () => {
    let newPosition = currentSlide;
    if (sliderLength && (newPosition < sliderLength - 1)) {
        newPosition = newPosition + 1;
    } else if (infinite) {
        newPosition = 0;
    }
      setCurrentSlide(newPosition);
  };

  const goToPrevSlide = () => {
    let newPosition = currentSlide;
    if (newPosition > 0) {
        newPosition = newPosition - 1;
    } else if (infinite) {
      newPosition =  sliderLength ? (sliderLength - 1) : 0;
    }
      setCurrentSlide(newPosition);
  };

  //Automated Slider
  useEffect(() => {
    const intervalId: any =
      isAutoLooping && setInterval(goToNextSlide, autoPlayInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [goToNextSlide, isAutoLooping, autoPlay, autoPlayInterval, currentSlide]);

  //Pause loop when mouse enter
  const handleMouseEnter = () => {
    autoPlay && setAutoLooping(false);
  };

  const handleMouseLeave = () => {
    autoPlay && setAutoLooping(true);
  };

  //Change Slides by Key Press
  const keyPressHandler = (event: {
    key: string;
    preventDefault: () => void;
    stopPropagation: () => void;
    keyCode: number;
  }) => {
    if (!keyPressControl) return;
    else {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        goToPrevSlide();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        goToNextSlide();
        return;
      }
      if (49 <= event.keyCode && event.keyCode <= 57) {
        const arrayPos = event.keyCode - 49;
        if (sliderLength && arrayPos < sliderLength) {
          setCurrentSlide(arrayPos);
        }
        return;
      }
      if (event.keyCode === 48) {
        if (sliderLength && sliderLength >= 10) setCurrentSlide(9);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  });

  //Change Slides by Touch
  const touchStartHandler = (e: {
    targetTouches: { clientX: React.SetStateAction<number> }[];
  }) => {
    if (keyPressControl) {
      setTouchStartPosition(e.targetTouches[0].clientX);
      setTouchEndPosition(e.targetTouches[0].clientX);
      setTouched(true);
    }
  };

  const touchMoveHandler = (e: {
    targetTouches: { clientX: React.SetStateAction<number> }[];
  }) => {    
    if (keyPressControl) {
      setTouchEndPosition(e.targetTouches[0].clientX);
      if (touched === true) {
        setSwiped(true);
      }
    }
  };

  const touchEndHandler = () => {
    if (keyPressControl) {
      if (swiped) {
        if (touchStartPosition - touchEndPosition > 75) {
          goToNextSlide();
        } else if (touchStartPosition - touchEndPosition < -75) {
          goToPrevSlide();
        } else {
          setCurrentSlide(currentSlide);
        }
      }
      setTouched(false);
      setSwiped(false);
    }
  };

  return {
    currentSlide,
    setCurrentSlide,
    handleMouseEnter,
    handleMouseLeave,
    goToNextSlide,
    goToPrevSlide,
    touchStartHandler,
    touchMoveHandler,
    touchEndHandler,
  };
};

export default useSlider;
