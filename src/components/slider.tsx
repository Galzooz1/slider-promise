import React, { useState } from 'react';
import { IData } from '../interfaces/data';
import './slider.css';
import Slide from './slide';
import useSlider from '../hooks/useSlider';

interface SliderProps {
    data: IData[] | undefined;
};

const Slider: React.FC<SliderProps> = ({ data }) => {
    const totalSlides: any = data ? data.length : null;
    const {
        currentSlide,
        setCurrentSlide,
        sliderRef,
        handleMouseEnter,
        handleMouseLeave
    } = useSlider({ totalSlides, interval: 1000 });


    return (
        <div onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} ref={sliderRef} className='slider'>
            {data?.map((item: IData, i) => {
                return (
                    <Slide key={item.id} slide={currentSlide} item={item} index={i} />
                )
            })}
            <span className="indicators">
                {data?.map((_, i) => {
                    return (
                        <button
                            key={i}
                            className={
                                currentSlide === i ? "indicator" : "indicator indicator-inactive"
                            }
                            onClick={() => setCurrentSlide(i)}
                        ></button>
                    );
                })}
            </span>
        </div>
    )
}

export default Slider