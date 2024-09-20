import React from 'react'
import { useState, useEffect } from 'react'
import API from '../api.js'

export const Dashboard = () => {
  const [serverMessage, setServerMessage] = useState([]);

  const fetchAPI = async () => {
    const response = await API.get("/"); 
    setServerMessage(response.data);
  }
  useEffect(()=>{
    fetchAPI();
  }, [])
  return (
    <>
        <h1>Dashboard</h1>
        <div>{serverMessage}</div>
    </>
  )
}
