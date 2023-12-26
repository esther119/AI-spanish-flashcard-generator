import Replicate from "replicate";
import generateImagePrompt from "./openai.js";

// const chats = await generateImagePrompt();
// const prompts = chats.map(prompt => prompt['prompt']);
const prompts = ['draw hands holding an cute baby puppy']

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateImage(prompt) {
  return await replicate.run(
    "playgroundai/playground-v2-1024px-aesthetic:42fe626e41cc811eaf02c94b892774839268ce1994ea778eba97103fe1ef51b8",
    { input: { prompt } }
  );
}
async function generateImageSafe(prompt) {
    try {
      return await generateImage(prompt);
    } catch (error) {
      console.error(`Error occurred for prompt "${prompt}":`, error);
      // Return null or a custom error object
      return null; 
    }
  }

async function main(prompts) {
  try {
    // Create an array of promises
    

    const promises = prompts.map(prompt => {
        return generateImageSafe(prompt);
      });      

    // Await all the promises in parallel
    const results = await Promise.all(promises);

    // Process results
    console.log(results);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main(prompts);
