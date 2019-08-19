/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";
import { Link } from "react-router-dom";

export function MovieCard(props) {
  const { movie } = props;
  return (
    <Link
      to={`/movies/${movie._id}`}
      style={{ color: "black", textDecoration: "none" }}
    >
      <Card variant="link">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>
            {movie.Title}{" "}
            {props.user.FavoriteMovies.indexOf(props.movie._id) > -1 ? (
              <b className="is-favorite">★</b>
            ) : (
              <b className="is-not-favorite">★</b>
            )}
          </Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => {
  const { user, movies } = state;
  return {
    user: user,
    movies: movies
  };
};

export default connect(mapStateToProps)(MovieCard);
