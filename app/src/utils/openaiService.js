import axiosClient from "../utils/axiosClient";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
const API_ROUTE = URL + "openai";

const getResponse = async (promptObj) => {
  try {
    const prompt = getPromptText(promptObj);
    if (prompt != "") {
      const response = await axiosClient.post(`${API_ROUTE}`, {
        prompt: prompt,
      });
      return response.data.data.choices[0].message.content;
    }
    return "";
  } catch (e) {
    console.log(e);
  }
};

const getPromptText = (obj) => {
  //TODO...
  return "";
};

export { getResponse };
