import React, { useState, useEffect, useRef, memo } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { gql, useLazyQuery, useQuery as useQueryApollo } from "@apollo/client";
import { GET_USERS, LOGIN_USER } from "../../graphQL/queries";
import { getCookie, setCookie } from "../../util/cookies";

if (getCookie("loginInfo")) {
  //console.log("I've logged in");
  //window.location.href = "/";
  //console.log(JSON.parse(getCookie("loginInfo")));
  //console.log(getCookie("loginInfo"));
}

function Login() {
  const userRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

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

  /*
  useEffect(() => {
    if (data) {
      console.log(data.user);
    }
  }, [data]);
  */

  /*
  const [loginUser, { data }] = useLazyQuery(LOGIN_USER, {
    variables: {
      loginInput: {
        username: username,
        password: password,
      },
    },
  });
  */
  const [loginUser] = useLazyQuery(LOGIN_USER, {
    variables: {
      loginInput: {
        username: username,
        password: password,
      },
    },
    onCompleted: (result) => {
      setData(result);
      processUserData(result);
    },
    onError: (error) => {
      setError("Invalid username or password");
      errorRef.current.focus();
    },
  });

  //const { data, loading, error } = useQueryApollo(GET_USERS, { variables: { amount: 10 } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser();
  };

  const processUserData = (data) => {
    if (data) {
      console.log("my login data is here");
      console.log(data);
      const accessToken = data.login.token;
      const userData = data.login.user;
      setCookie("loginInfo", JSON.stringify({ accessToken, userData }), 1);
      setSuccess(true);
    }
  };
  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, loading, error } = useQueryApollo(LOGIN_USER, {
      variables: {
        loginInput: {
          username: username,
          password: password,
        },
      },
    });

    if (loading) return;
    if (error) {
      // handle error
    }

    const { token, user } = data.login;
    // handle successful login
  };
  */

  //const { data, loading, error } = useQueryApollo(GET_USER, { variables: { userId: "63c881bd6bcff533d208db0f" } });

  /*
  const loginQuery = useQuery({
    queryKey: ["login"],
    queryFn: (obj) => {
      console.log(obj);
      return fetch("https://localhost:5001/api/login").then((res) => res.json());
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: (info) => {
      return axios
        .post("http://localhost:5000/create-user", {
          first_name: info.first_name,
          last_name: info.last_name,
          username: info.username,
          email: info.email,
          password: info.password,
        })
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });


  if (loginQuery.isLoading) return "Loading...";
  if (loginQuery.isError) return <pre>{JSON.stringify(loginQuery.error)}</pre>;
  */

  // Write login function below: takes data from form and sends it to the server

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

      {/*data !== null ? <pre>{JSON.stringify(data)}</pre> : <p>no data</p> */}
      {/*
      <div>
        {data.getUsers.map((user) => (
          <div key={user.id}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Created Date: {user.createdDate}</p>
            <p>Updated Date: {user.updatedDate}</p>
          </div>
        ))}
      </div>
        <div key={data.user.id}>
          <p>Username: {data.user.username}</p>
          <p>Email: {data.user.email}</p>
          <p>Created Date: {data.user.createdDate}</p>
          <p>Updated Date: {data.user.updatedDate}</p>
        </div>


        //      <button onClick={() => loginQuery.refetch()}>Login</button>
        //      <button onClick={() => createAccountMutation.refetch()}>Create Account</button>
      */}
    </div>
  );
}

export default memo(Login);
