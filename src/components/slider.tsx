import React, { useState } from 'react';
import { IData } from '../interfaces/data';
import './slider.css';
import Slide from './slide';

interface SliderProps {
    data: IData[] | undefined;
};

const Slider: React.FC<SliderProps> = ({ data }) => {
    const [slide, setSlide] = useState(0);

    return (
        <div className='slider'>
            {data?.map((item: IData, i) => {
                return (
                    <Slide slide={slide} item={item} index={i} />
                )
            })}
            <span className="indicators">
                {data?.map((_, i) => {
                    return (
                        <button
                            key={i}
                            className={
                                slide === i ? "indicator" : "indicator indicator-inactive"
                            }
                            onClick={() => setSlide(i)}
                        ></button>
                    );
                })}
            </span>
        </div>
    )
}

export default Slider