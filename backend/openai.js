import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

async function generateImagePrompt(word) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const system_message = `
      Spanish word: ${word}
      1. If it is a verb, put the Spanish word into infinitive. Keep the original if not
      2. Translate the word into English. 
      3. Imagine you are an AI assistant for an image prompt. Use the English word to generate a simple but direct prompt to draw. Try to use concrete objects or scenery and generate the prompt.

      Think about it step by step. 
      Output JSON format: 
      {"original", "...", "english": "..", 
      "prompt": ".."}
    `;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "system", content: system_message }],
      model: "gpt-3.5-turbo",
    });

    const response = chatCompletion.choices[0].message.content;
    const aiResponse = JSON.parse(response);

    // Return the promptObject or perform any other actions as needed
    return aiResponse;
  } catch (error) {
    // Handle the error here
    console.error("An error occurred:", error);
    throw error; // Rethrow the error if needed
  }
}

export default generateImagePrompt;
