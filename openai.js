const word = 'matar'
const system_message = 
`
Spanish word: ${word}
1. If it is a verb, put the spanish word into infinitive. Keep the original if not
2. Translate the word into english. 
2. Imagine you are an AI assistant for image prompt. Use the english word to generate a prompt that is easy to draw. Try to use concrete objects or scenary

Think about it step by step. 
Output JSON format: 
{"english": "..", 
"prompt": ".."
}
`
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: system_message}],
    model: "gpt-3.5-turbo",
});

// query json output 
const image_prompt = chatCompletion.choices[0].message.content
// check data type 
console.log((image_prompt))
const promptObject = JSON.parse(image_prompt);

console.log(typeof(image_prompt))

console.log(promptObject['prompt']);