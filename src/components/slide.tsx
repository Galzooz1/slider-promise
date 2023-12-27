import React from 'react';
import { IData } from '../interfaces/data';
import './slider.css';

interface SlideProps {
    item: IData;
    index: number;
    slide: number;
};

const Slide: React.FC<SlideProps> = ({item, index, slide}) => {
    return(
        <>
        <img
            src={item?.url}
            alt={item?.id}
            key={item?.id}
            className={slide === index ? "slide" : "slide slide-hidden"}
            width={400}
            height={400}
          />
        </>
    )
}

export default Slide