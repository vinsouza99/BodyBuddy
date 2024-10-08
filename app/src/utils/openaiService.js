import axios from "axios";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
const API_ROUTE = URL + "openai";

const getResponse = async (prompt) => {
  try {
    const response = await axios.post(`${API_ROUTE}`, { prompt: prompt });
    const data = await response.data.data;
    console.log(data);
    return exercise;
  } catch (e) {
    console.log(e);
  }
};

export { getResponse };
