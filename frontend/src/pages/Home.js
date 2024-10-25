import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import home from "../assets/home.jpg";
import "./Home.css";

function Home() {
  return (
    <Row className="home-row">
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div>
          <h1 style={{ fontFamily: "Poppins", fontWeight: "600" }}>
            Share the world with your friends
          </h1>
          <p style={{ fontFamily: "Poppins", fontWeight: "600" }}>
            Chat App lets you connect with the world
          </p>
          <LinkContainer to="/login">
            <Button
              variant="success"
              style={{ fontFamily: "Poppins", fontWeight: "600" }}
            >
              Get Started <i className="fas fa-comments home-message-icon"></i>
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home__bg">
        <img className="home-logo" src={home} alt="logo" />
      </Col>
    </Row>
  );
}

export default Home;
