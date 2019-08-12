/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./director-view.scss";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

export function DirectorView(props) {
  const [director, setDirector] = useState("");

  useEffect(() => {
    function getDirectorInfo() {
      axios
        .get(
          `https://myflix-mern.herokuapp.com/directors/${props.directorName}`,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` }
          }
        )
        .then(response => setDirector(response.data))
        .catch(err => {
          console.error(err);
        });
    }

    getDirectorInfo();
  }, []);

  return (
    <Container className="director-view">
      <Row>
        <Col>
          <div>
            <h3 className="label">Director</h3>
            <p className="value">{props.directorName}</p>
          </div>
          <div>
            <h3 className="label">Bio</h3>
            <p className="value">{director.Bio}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="label">Movies by {props.directorName}</h3>
          <ListGroup className="movies-by-director">
            {props.movies.map(movie => {
              if (movie.Director.Name === director.Name) {
                return (
                  <ListGroup.Item key={movie._id}>
                    {movie.Title}
                    <Link to={`/movies/${movie._id}`}>
                      {" "}
                      <Button variant="primary" size="sm">
                        View
                      </Button>
                    </Link>
                  </ListGroup.Item>
                );
              } else {
                return null;
              }
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => {
  const { movies } = state;
  return {
    movies: movies
  };
};

export default connect(mapStateToProps)(DirectorView);
