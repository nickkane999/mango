import React, { useState, useEffect, useRef, memo } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../../graphQL/queries";
import { setCookie } from "../../util/cookies";

function Login() {
  const userRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  // Updating form logic on input / variable changes
  // Redirect to homepage after successful login
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [username, password]);

  useEffect(() => {
    if (success) {
      window.location.href = "/";
    }
  }, [success]);

  // Login form logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        loginInput: {
          username: username,
          password: password,
        },
      },
    });
  };

  const [loginUser] = useLazyQuery(LOGIN_USER, {
    onCompleted: (result) => {
      setData(result);
      processUserData(result);
    },
    onError: (error) => {
      setError("Invalid username or password");
      setPassword("");
      errorRef.current.focus();
    },
  });

  const processUserData = (data) => {
    if (data) {
      const accessToken = data.login.token;
      const userData = data.login.user;
      setCookie("loginInfo", JSON.stringify({ accessToken, userData }), 1);
      setSuccess(true);
    }
  };

  const { Control, Label, Group } = Form;
  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <p ref={errorRef} className={"errorMessage " + (!error ? "hidden" : "")}>
          {error}
        </p>
        <Group>
          <Label>Username</Label>
          <Control ref={userRef} type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} required />
        </Group>
        <Group controlId="formPassword">
          <Label>Password</Label>
          <Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default memo(Login);
