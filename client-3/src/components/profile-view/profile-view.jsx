/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import { connect } from "react-redux";
import {
  removeMovieFromFavorites,
  deleteAccount,
  setUser,
  updateUser
} from "../../actions/actions.js";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChangePassword } from "./change-password";
import { EditProfile } from "./edit-profile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "./profile-view.scss";

export function ProfileView(props) {
  if (!localStorage.user) {
    return <Redirect to="/" />;
  } else if (!props.user) {
    return null;
  } else {
    return (
      <Container className="profile-view">
        <Row>
          <Col>
            <h2>User profile</h2>
            <div className="user-username">
              <h3 className="label">Username</h3>
              <span className="value">
                {props.user.Username}{" "}
                <EditProfile
                  type={"Username"}
                  field={"Username"}
                  user={props.user}
                  updateUser={props.updateUser}
                />
              </span>
            </div>
            <div className="user-password">
              <h3 className="label">Password</h3>
              <span className="value">
                ********{" "}
                <ChangePassword
                  type={"Password"}
                  field={"Password"}
                  user={props.user}
                  updateUser={props.updateUser}
                />
              </span>
            </div>
            <div className="user-email">
              <h3 className="label">Email</h3>
              <span className="value">
                {props.user.Email}{" "}
                <EditProfile
                  type={"Email"}
                  field={"Email"}
                  user={props.user}
                  updateUser={props.updateUser}
                />
              </span>
            </div>
            <div className="user-birthday">
              <h3 className="label">Birthday</h3>
              <span className="value">
                {props.user.Birthday}{" "}
                <EditProfile
                  type={"Date"}
                  field={"Birthday"}
                  user={props.user}
                  updateUser={props.updateUser}
                />
              </span>
            </div>
            <div className="user-delete-account">
              <Button
                onClick={() => props.deleteAccount()}
                variant="danger"
                size="sm"
              >
                Delete account
              </Button>
              <br />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="label">Favorite Movies</h3>
            <ListGroup className="user-favorite-movies">
              {props.movies.map(mov => {
                if (
                  mov._id ===
                  props.user.FavoriteMovies.find(favMov => favMov === mov._id)
                ) {
                  return (
                    <ListGroup.Item key={mov._id}>
                      {mov.Title}
                      <Link to={`/movies/${mov._id}`}>
                        {" "}
                        <Button variant="primary" size="sm">
                          View
                        </Button>
                      </Link>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => props.removeMovieFromFavorites(mov._id)}
                      >
                        Remove
                      </Button>
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
}

const mapStateToProps = state => {
  const { user, movies } = state;
  return {
    user: user,
    movies: movies
  };
};

export default connect(
  mapStateToProps,
  { removeMovieFromFavorites, deleteAccount, setUser, updateUser }
)(ProfileView);
