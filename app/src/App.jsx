import { useState, useEffect } from 'react'
import axios from "axios";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [serverMessage, setServerMessage] = useState([]);
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setServerMessage(response.data);
  }
  useEffect(()=>{
    fetchAPI();
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className='card'>
        <h2>The following message comes from the server: </h2>
        <p>{serverMessage}</p>
      </div>
    </>
  )
}

export default App
