export const maxDuration = 60;
export const dynamic = "force-dynamic";

import { OpenAI } from "openai";
import Groq from "groq-sdk";
import generateDemoData from "../utils/generateDemoData.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getResponse = async (req, res) => {
  try {
    let response;
    const prompt = req.body.prompt;

    if (process.env.GENERATIVE_AI === "DEMO") {
      const demoData = await generateDemoData();
      response = {
        choices: [
          {
            message : {
              content: JSON.stringify(demoData),
            },
          }
        ],
      };
    } else if (process.env.GENERATIVE_AI === "GROQ") {
      response = await groq.chat.completions.create({
        model: "llama-3.1-70b-versatile",
        messages: [
          { role: "system", content: "You are a JSON generator. Always return only JSON data without any explanations or additional text." },
          { role: "user", content: prompt }
        ],
      });
    } else {
      response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a JSON generator. Always return only JSON objects without any explanations or additional text." },
          { role: "user", content: prompt }
        ],
      });
    }

    res.status(200).json({
      status: "200",
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
