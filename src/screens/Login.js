import { Base64 } from "js-base64";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Path from "../navigation/Path";
import { saveLoginUser } from "../redux/actions/UtilAction";
import { valueFromId } from "../utils/Form";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.util);

  const submit = (e) => {
    e.preventDefault();
    let _username = valueFromId("pos-username");
    let _password = Base64.encode(valueFromId("pos-password"));
    let errMsg = "User not found!";
    let user = null;
    for (let u of users) {
      let { usr, password } = u;
      if (_username === usr) {
        if (_password === password) {
          errMsg = null;
          user = u;
          break;
        }
        errMsg = "Invalid password!";
        break;
      }
    }

    if (user) {
      dispatch(saveLoginUser(user));
      history.push(Path.webView);
      alert("Login successfully!");
    } else {
      alert(errMsg);
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
          Login
        </Button>
      </Form>
    </div>
  );
}
