import React, { useState } from 'react';
import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from "react-router-dom";
import TourCard from './../shared/TourCard';
import Newsletter from './../shared/Newsletter';

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state || []);

  console.log("Search results:", data);

  return (
    <>
      <CommonSection title={'Tour Search Result'} />
      <section>
        <Container>
          <Row>
            {data.length > 0 ? (
              data.map((tour) => (
                <Col lg="3" md="4" sm="6" key={tour._id} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))
            ) : (
              <Col>
                <h4 className='text-center'>No tours found.</h4>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <Newsletter/>
    </>
  );
};

export default SearchResultList;
