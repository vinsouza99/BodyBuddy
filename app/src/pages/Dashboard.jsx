import React from "react";
import { useState, useEffect } from "react";
import { default as server } from "../ProxyServer.js";

export const Dashboard = () => {
  const [serverMessage, setServerMessage] = useState([]);

  const fetchAPI = async () => {
    const response = await server.getAll("accounts");
    const data = await response.data;
    setServerMessage(JSON.stringify(data));
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div>{serverMessage}</div>
    </>
  );
};
