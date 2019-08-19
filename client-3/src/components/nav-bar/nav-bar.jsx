import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setUser,
  setMovies,
  makeSearch,
  sortId
} from "../../actions/actions.js";
import { Link as RouterLink } from "react-router-dom";
import SortButton from "./sort-button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { fade, makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import "./nav-bar.scss";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

function NavBar(props) {
  const [searchInput, setSearchInput] = useState("");
  const classes = useStyles();

  if (props.searchBarVisible) {
    return (
      <AppBar position="static">
        <Toolbar className="navbar">
          <Link
            component={RouterLink}
            to="/"
            onClick={() => {
              props.makeSearch("");
              setSearchInput("");
              props.sortId();
            }}
          >
            <Typography className={classes.title} variant="h6" noWrap>
              Home
            </Typography>
          </Link>
          <Link component={RouterLink} to="/profile">
            <Typography className={classes.title} variant="h6" noWrap>
              Profile
            </Typography>
          </Link>
          <div className="search-and-sort">
            <SortButton />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  props.makeSearch(searchInput);
                  setSearchInput("");
                }}
              >
                <ClickAwayListener onClickAway={() => setSearchInput("")}>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange={e => setSearchInput(e.target.value)}
                    value={searchInput}
                  />
                </ClickAwayListener>
              </form>
            </div>
          </div>

          <IconButton
            id="log-out"
            variant="secondary"
            size="small"
            onClick={() => {
              props.setUser("");
              props.setMovies([]);
              window.open("/", "_self");
            }}
          >
            <Icon>power_settings_new</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="static">
        <Toolbar className="navbar">
          <Link
            component={RouterLink}
            to="/"
            onClick={() => {
              props.makeSearch("");
              setSearchInput("");
              props.sortId();
            }}
          >
            <Typography className={classes.title} variant="h6" noWrap>
              Home
            </Typography>
          </Link>
          <Link component={RouterLink} to="/profile">
            <Typography className={classes.title} variant="h6" noWrap>
              Profile
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
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
  sortId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
