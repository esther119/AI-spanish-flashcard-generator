import Replicate from "replicate";
import generateImagePrompt from "./openai.js";

const one_prompt = await generateImagePrompt();
// push into an array
const prompts = [ one_prompt['prompt'] ];

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
      console.log(prompt);  // Log the current prompt
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
        console.log(prompt);  // Log the current prompt
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

// const prompts = [
//     "Draw a person with a sword standing over a fallen figure.",
//     // "A decorative iron gate with intricate patterns and vines growing around it, framing a charming garden entrance",
//     // "A deep and mysterious hole in the ground with a ladder going down, like an entrance to an underground adventure",
//     // "A scale with two bowls, one filled with coins representing a small quantity and the other overflowing with coins representing a large quantity, illustrating the concept of quantity.",
//     // "A person walking on a tightrope high above a city skyline, symbolizing the idea of taking a risk", 
// ];

main(prompts);
