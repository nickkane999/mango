import React from "react";
import "./Login.css";
import { useQuery, useMutation } from "react-query";

function Login() {
  const loginQuery = useQuery({
    queryKey: ["login"],
    queryFn: () => {
      return fetch("https://localhost:5001/api/login").then((res) => res.json());
    },
  });

  if (loginQuery.isLoading) return "Loading...";
  if (loginQuery.isError) return <pre>{JSON.stringify(loginQuery.error)}</pre>;

  return (
    <div>
      <h1>Login Successful</h1>
    </div>
  );
}

export default Login;
