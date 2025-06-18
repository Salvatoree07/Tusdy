import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.APIGEMINI});

export default async function main(prompt : string) : Promise<unknown> {
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  console.log(response.text);
  return response.text;
}