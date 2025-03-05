import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import Weather from './../components/Weather/WeatherApp';


import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Check the weather of any city instantly.",
    link: "/weather",
    onclick: <Weather/>,
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Find the best tour guides for your trips.",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Plan your trips your way with our custom packages.",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" key={index}>
          {item.link ? (
            <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
              <ServiceCard item={item} />
            </Link>
          ) : (
            <ServiceCard item={item} />
          )}
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
