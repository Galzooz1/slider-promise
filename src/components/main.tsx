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
      <Slider sliderLength={data?.length}>
        {data?.map(item => {
          return(
            <React.Fragment key={item.id}>
              <img src={item.url} alt={item.id} />
            </React.Fragment>
          )
        })}
      </Slider>
    </main>
  );
};

export default Main;