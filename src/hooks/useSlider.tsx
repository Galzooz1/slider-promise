import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSliderNavigation from './useSliderNavigation';

interface UseSliderProps {
    totalSlides: any;
    interval: number; // Time interval in milliseconds
};

interface UseSliderReturn {
    currentSlide: number;
    setCurrentSlide: any
    sliderRef: React.RefObject<HTMLDivElement>;
    handleMouseEnter: (e: React.MouseEvent) => void;
    handleMouseLeave: (e: React.MouseEvent) => void;
}

const useSlider = ({ totalSlides, interval }: UseSliderProps): UseSliderReturn => {

    //Automated Slider
    const { currentSlide, goToNextSlide, goToPrevSlide, setCurrentSlide } = useSliderNavigation(totalSlides);
    const [isAutoLooping, setAutoLooping] = useState(true);
    const sliderRef = useRef(null);

    useEffect(() => {
        const intervalId = isAutoLooping ? setInterval(goToNextSlide, interval) : undefined;

        return () => {
            clearInterval(intervalId);
        };
    }, [goToNextSlide, interval]);

    
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
        sliderRef,
        handleMouseEnter,
        handleMouseLeave
    }
}

export default useSlider;