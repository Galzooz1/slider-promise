import React, { useState } from 'react';

interface UseSliderNavigationProps {
    totalSlides: number;
};

const useSliderNavigation = (totalSlides: number) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const goToNextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };
  
    const goToPrevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    return {
        currentSlide,
        goToNextSlide,
        goToPrevSlide,
        setCurrentSlide
    }
    
}

export default useSliderNavigation