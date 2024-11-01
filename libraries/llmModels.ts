import gemini from "@google/generative-ai";
import OpenAI from "openai";

export async function getGeminiResponse(prompt: string, apiKey: string): Promise<string> {
  const genAI = new gemini.GoogleGenerativeAI(apiKey as string);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error(err);
    throw new Error("Error while prompting Gemini", { cause: err });
  }
}

export async function getGptResponse(prompt: string, key?: string): Promise<string> {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.EXPO_PUBLIC_OPEN_ROUTER_API_KEY,
  });

  try {
    const result = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "openai/gpt-3.5-turbo",
    });
    return result.choices[0]?.message?.content || "";
  } catch (err) {
    console.error(err);
    throw new Error("Error while prompting ChatGPT 3.5", { cause: err });
  }
}