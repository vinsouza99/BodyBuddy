//import axios from "axios";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
});

export const getResponse = async () => {
  try {
    return await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: "Write a haiku about recursion in programming.",
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
/*

const instance = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getResponse = async (req, res) => {
  try {
    const { prompt } = req.params;
    const response = await instance.post("/completions", {
      model: "text-davinci-003", // or another model like "gpt-3.5-turbo"
      prompt: prompt,
      max_tokens: 100,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "500",
      message: "Error generating response",
    });
  }
};
*/
