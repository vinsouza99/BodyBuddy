import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// How to use output templates: https://openai.com/index/introducing-structured-outputs-in-the-api/
export const getResponse = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a JSON generator. Always return only JSON objects without any explanations or additional text." },
        { role: "user", content: prompt }
      ],
    });
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
