import React from "react";
import { useState, useEffect } from "react";
import { default as server } from "../ProxyServer.js";
import { ProxyServerExample } from "../components/ProxyServerExample.jsx";

export const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <ProxyServerExample />
    </>
  );
};
