import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";

export function ChangePassword(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldpassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  function submitChange(oldPassword, newPassword) {
    axios
      .patch(
        `https://myflix-mern.herokuapp.com/users/${
          props.user.Username
        }/Password`,
        {
          OldPassword: `${oldPassword}`,
          NewPassword: `${newPassword}`
        },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      .then(response => {
        console.log("Password change succeeded");
        resetUserInput();
      })
      .catch(err => {
        console.error(err);
      });
  }

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }

  function resetUserInput() {
    setIsOpen(null);
    setOldpassword("");
    setNewPassword("");
    setNewPasswordRepeat("");
  }

  return (
    <>
      <Button onClick={() => toggleCollapse()} variant="secondary" size="sm">
        Edit
      </Button>
      <Collapse in={isOpen}>
        <Form>
          <Form.Control
            type={props.type}
            value={oldPassword}
            placeholder={`Enter current ${props.field}`}
            onChange={e => setOldpassword(e.target.value)}
          />
          <Form.Control
            type={props.type}
            value={newPassword}
            placeholder={`Enter new ${props.field}`}
            onChange={e => setNewPassword(e.target.value)}
          />
          <Form.Control
            type={props.type}
            value={newPasswordRepeat}
            placeholder={`Repeat new ${props.field}`}
            onChange={e => setNewPasswordRepeat(e.target.value)}
          />
          {newPassword === newPasswordRepeat &&
          newPassword !== "" &&
          oldPassword !== "" ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => submitChange(oldPassword, newPassword)}
            >
              Submit
            </Button>
          ) : (
            <Button variant="secondary" size="sm">
              Submit
            </Button>
          )}
        </Form>
      </Collapse>
    </>
  );
}
