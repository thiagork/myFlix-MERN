/* eslint-disable no-console */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setUser, getMovies } from "../../actions/actions.js";
import NavBar from "../nav-bar/nav-bar";
import MoviesList from "../movies-list/movies-list";
import LoginView from "../login-view/login-view";
import MovieView from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import GenreView from "../genre-view/genre-view";
import DirectorView from "../director-view/director-view";
import ProfileView from "../profile-view/profile-view";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

export function MainView(props) {
  const { user, setUser: dispatchSetUser, getMovies: dispatchGetMovies } = props;

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      dispatchSetUser(JSON.parse(localStorage.user));
      dispatchGetMovies(accessToken);
    }
  }, [dispatchSetUser, dispatchGetMovies]);

  if (!user) {
    return (
      <Router>
        <Container className="main-view" fluid="true">
          <Row>
            <Route exact path="/" render={() => <LoginView />} />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/profile" render={() => <Redirect to="/" />} />
          </Row>
        </Container>
      </Router>
    );
  } else {
    return (
      <Router>
        <NavBar />
        <Container className="main-view" fluid="true">
          <Row>
            <Route exact path="/" render={() => <MoviesList />} />
            <Route path="/profile" render={() => <ProfileView />} />
            <Route
              path="/movies/:Id"
              render={({ match }) => (
                <Col>
                  <MovieView movieId={match.params.Id} />
                </Col>
              )}
            />
            <Route
              path="/genre/:Genre"
              render={({ match }) => <GenreView genre={match.params.Genre} />}
            />
            <Route
              path="/director/:Director"
              render={({ match }) => (
                <DirectorView directorName={match.params.Director} />
              )}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    user: user
  };
};

const mapDispatchToProps = {
  setUser,
  getMovies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
