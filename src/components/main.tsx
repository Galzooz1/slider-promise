import React from "react";
import Slider from "./slider";
import useApi from "../hooks/useApi";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const apiUrls = [
    "https://api.thedogapi.com/v1/images/search",
    "https://api.thecatapi.com/v1/images/search",
    "https://api.thedogapi.com/v1/images/search",
    "https://api.thecatapi.com/v1/images/search",
    "https://api.thedogapi.com/v1/images/search",
  ];

  const slides = [
    { id: 1, content: <div style={{border:'1px solid black'}}>Slide 1 Content</div> },
    { id: 2, content: <div  style={{border:'1px solid black'}}>Slide 2 Content</div> },
    { id: 3, content: <div style={{border:'1px solid black'}}>Slide 3 Content</div> },
  ];

  const { data, loading, error } = useApi(apiUrls);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>There's a problem, Try again later.</p>;
  }

  return (
    <main className="main">
      <Slider 
      sliderLength={data?.length}
      width={600}
      height={400}
      autoPlay
      autoPlayInterval={3000}
      keyPressControl={true}
      infinite
      >
        {data?.map(item => {
          return(
            <React.Fragment key={item.id}>
              <img src={item.url} />
            </React.Fragment>
          )
        })}
      </Slider>
    </main>
  );
};

export default Main;