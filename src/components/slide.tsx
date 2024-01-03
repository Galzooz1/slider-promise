import React, { ReactNode } from "react";
import "./slider.css";

interface SlideProps {
  children: ReactNode;
  id:string;
  ref:React.RefObject<HTMLDivElement>;
  isActive: boolean;
  src:string;
  alt:string;
}

const Slide: React.FC<SlideProps> = ({ children, id, ref, isActive, src, alt }) => {
  return (
    <div id={id} ref={ref} className={`slide ${isActive ? 'active' : ''}`}>{React.cloneElement(children, { src, alt })}</div>
  );
};

export default Slide;