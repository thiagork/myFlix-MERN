import React from "react";
import { connect } from "react-redux";
import {
  sortAZ,
  sortZA
} from "../../actions/actions.js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Sort from "@material-ui/icons/Sort";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

function SortButton(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
        <ButtonGroup
          variant="contained"
          color="default"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button
            color="default"
            size="small"
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Sort />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem key="1" onClick={(e) => {props.sortAZ(); handleClose(e)}}>
                      Sort A-Z
                    </MenuItem>
                    <MenuItem key="2" onClick={(e) => {props.sortZA(); handleClose(e)}}>
                      Sort Z-A
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>
  );
}


const mapDispatchToProps = {
  sortAZ,
  sortZA
};

export default connect(null, mapDispatchToProps)(SortButton);
