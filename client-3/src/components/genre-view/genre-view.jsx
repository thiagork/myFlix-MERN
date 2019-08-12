/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./genre-view.scss";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

export function GenreView(props) {
  const [genre, setGenre] = useState("");

  useEffect(() => {
    function getGenreInfo() {
      axios
        .get(`https://myflix-mern.herokuapp.com/genres/${props.genre}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        })
        .then(response => setGenre(response.data))
        .catch(err => {
          console.error(err);
        });
    }

    getGenreInfo();
  }, [props]);

  return (
    <Container className="genre-view">
      <Row>
        <Col>
          <div>
            <h3 className="label">Genre</h3>
            <p className="value">{props.genre}</p>
          </div>
          <div>
            <h3 className="label">Description</h3>
            <p className="value">{genre.Description}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="label">{props.genre} movies</h3>
          <ListGroup className="movies-by-genre">
            {props.movies.map(movie => {
              if (movie.Genre.Name === genre.Name) {
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

export default connect(mapStateToProps)(GenreView);
