import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setUser,
  setMovies,
  makeSearch,
  sortAZ,
  sortZA,
  sortDirector,
  sortGenre,
  sortId
} from "../../actions/actions.js";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "./nav-bar.scss";

function NavBar(props) {
  const [searchInput, setSearchInput] = useState("");

  if (props.searchBarVisible) {
    return (
      <Navbar sticky="top" bg="dark" variant="dark">
        <Nav>
          <Link
            className="nav-link"
            to="/"
            onClick={() => {
              props.makeSearch("");
              setSearchInput("");
              props.sortId();
            }}
          >
            Home
          </Link>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
          <Form
            onSubmit={e => {
              e.preventDefault();
              props.makeSearch(searchInput);
            }}
          >
            <Form.Control
              className="search-bar"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </Form>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-sort">
              Sort
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => props.sortAZ()}>
                Sort A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => props.sortZA()}>
                Sort Z-A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => props.sortDirector()}>
                Sort by Director
              </Dropdown.Item>
              <Dropdown.Item onClick={() => props.sortGenre()}>
                Sort by Genre
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            id="log-out"
            variant="secondary"
            size="sm"
            onClick={() => {
              props.setUser("");
              props.setMovies([]);
              window.open("/", "_self");
            }}
          >
            Log Out
          </Button>
        </Nav>
      </Navbar>
    );
  } else {
    return (
      <Navbar sticky="top" bg="dark" variant="dark">
        <Nav>
          <Link
            className="nav-link"
            to="/"
            onClick={() => {
              props.makeSearch("");
              setSearchInput("");
              props.sortId();
            }}
          >
            Home
          </Link>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  const { searchBarVisible } = state;
  return {
    searchBarVisible: searchBarVisible
  };
};

const mapDispatchToProps = {
  setUser,
  setMovies,
  makeSearch,
  sortAZ,
  sortZA,
  sortDirector,
  sortGenre,
  sortId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
