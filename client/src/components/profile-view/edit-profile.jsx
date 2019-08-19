import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";

export function EditProfile(props) {
  const [isOpen, setIsOpen] = useState(null);
  const [userInput, setUserInput] = useState("");

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }

  function resetUserInput() {
    setIsOpen(null);
    setUserInput("");
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
            value={userInput}
            placeholder={`Enter ${props.field}`}
            onChange={e => setUserInput(e.target.value)}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              props.updateUser(props.field, userInput, () => resetUserInput())
            }
          >
            Submit
          </Button>
        </Form>
      </Collapse>
    </>
  );
}
