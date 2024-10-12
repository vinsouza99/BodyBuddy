import axiosClient from "../utils/axiosClient";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
const API_ROUTE = URL + "openai";

const getResponse = async (prompt) => {
  try {
    const response = await axiosClient.post(`${API_ROUTE}`, { prompt: prompt });
    return response.data.data.choices[0].message.content;
  } catch (e) {
    console.log(e);
  }
};

export { getResponse };
