import React from "react";
import "./Login.css";
import { useQuery, useMutation } from "react-query";

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
      return fetch("https://localhost:5001/api/login").then((res) => res.json());
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
