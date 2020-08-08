import { Base64 } from "js-base64";
import _ from "lodash";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { saveTemporaryUser } from "../redux/actions/UtilAction";
import { valueFromId } from "../utils/Form";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { users } = useSelector((state) => state.util);

  const submit = (e) => {
    e.preventDefault();
    let _username = valueFromId("pos-username");
    let _password = Base64.encode(valueFromId("pos-password"));
    let isInclude = _.find(users, function (o) {
      return o.usr === _username;
    });
    if (isInclude) {
      alert("User exists!");
    } else {
      dispatch(saveTemporaryUser({ usr: _username, password: _password }));
      history.push("/");
      alert("User added!");
    }
  };

  return (
    <div className="App">
      <Link to={"/"}>Back to Home</Link>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            id={"pos-username"}
            placeholder={"Enter username"}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id={"pos-password"}
            type={"password"}
            placeholder={"Password"}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
