import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import '../styles/about.css';

// Import images
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${img3})`}}>
        <Container>
          <Row className="hero-content">
            <Col md="6">
              <h1>Discover the Beauty of Indian Beaches</h1>
              <p>Explore the stunning coastline of India.</p>
              <Button className="explore-btn">Explore Now</Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* About Section */}
      <section className="about-section">
        <Container>
          <Row>
            <Col md="6">
              <h2>About Indian Beaches</h2>
              <p>
                India is home to some of the world's most beautiful beaches, stretching from the golden sands of Goa to the serene shores of Kerala and the untouched beauty of Andaman & Nicobar Islands.
              </p>
            </Col>
            <Col md="6">
              <img src={img2} alt="Indian Beach" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Things to Do Section */}
      <section className="things-to-do">
        <Container>
          <Row>
            <Col md="4">
              <div className="activity">
                <img src={img3} alt="Water Sports" />
                <h3>Water Sports</h3>
                <p>Enjoy thrilling activities like jet skiing and parasailing.</p>
              </div>
            </Col>
            <Col md="4">
              <div className="activity">
                <img src={img4} alt="Beach Camping" />
                <h3>Beach Camping</h3>
                <p>Experience a night under the stars by the beach.</p>
              </div>
            </Col>
            <Col md="4">
              <div className="activity">
                <img src={img1} alt="Seafood Delights" />
                <h3>Seafood Delights</h3>
                <p>Savor fresh seafood and local delicacies.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>


    </div>
  );
};

export default AboutPage;