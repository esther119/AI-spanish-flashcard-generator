import OpenAI from "openai";

async function generateImagePrompt() {
  const word = 'matar';
  const system_message = `
    Spanish word: ${word}
    1. If it is a verb, put the Spanish word into infinitive. Keep the original if not
    2. Translate the word into English. 
    3. Imagine you are an AI assistant for an image prompt. Use the English word to generate a prompt that is easy to draw. Try to use concrete objects or scenery

    Think about it step by step. 
    Output JSON format: 
    {"english": "..", 
    "prompt": ".."}
  `;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: system_message }],
    model: "gpt-3.5-turbo",
  });

  // Query JSON output
  const image_prompt = chatCompletion.choices[0].message.content;
  // Check data type
  console.log(image_prompt);
  const promptObject = JSON.parse(image_prompt);

  console.log(promptObject['prompt']);
  // Return the promptObject or perform any other actions as needed
  return promptObject;
}

export default generateImagePrompt;
