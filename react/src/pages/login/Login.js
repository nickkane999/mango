import React from "react";
import "./Login.css";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

function Login() {
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

  /*
  if (loginQuery.isLoading) return "Loading...";
  if (loginQuery.isError) return <pre>{JSON.stringify(loginQuery.error)}</pre>;
  */

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => loginQuery.refetch()}>Login</button>
      <button onClick={() => createAccountMutation.refetch()}>Create Account</button>
    </div>
  );
}

export default Login;
