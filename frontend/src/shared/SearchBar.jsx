import React, { useState } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from './../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [maxGroupSize, setMaxGroupSize] = useState('');
  const navigate = useNavigate();

  const searchHandler = async () => {
    if (!location || !distance || !maxGroupSize) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const url = `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`;
      console.log("Fetching URL:", url); // Debugging URL
  
      const response = await fetch(url);
  
      console.log("Response status:", response); // Check HTTP status
  
      if (!response.ok) {
        const errorText = await response.json();
        console.error("Server Error Response:", errorText);
        throw new Error("Something went wrong while fetching search results!");
      }
  
      const result = await response.json();
      console.log("Fetched Search Results:", result); // Debugging result
  
      navigate(
        `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
        { state: result?.data || [] }
      );
  
    } catch (error) {
      console.error("Search error:", error);
      alert(error.message);
    }
  };
  

  return (
    <Col lg='12'>
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>Location</h6>
              <input 
                type="text" 
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </FormGroup>
          
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i className="ri-map-pin-time-line"></i></span>
            <div>
              <h6>Distance</h6>
              <input 
                type="number" 
                placeholder="Distance k/m" 
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
          </FormGroup>
          
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span><i className="ri-group-line"></i></span>
            <div>
              <h6>Max People</h6>
              <input 
                type="number" 
                placeholder="0" 
                value={maxGroupSize}
                onChange={(e) => setMaxGroupSize(e.target.value)}
              />
            </div>
          </FormGroup>

          <button className="search__icon" type="button" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
