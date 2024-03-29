import express from "express";
import bodyParser from "body-parser";
import generateImagePrompt from "./openai.js";
import generateImageSafe from "./replicate.js";
import UploadCloudinary from "./uploadCloudinary.js";
import cloudinarySearch from "./getCloud.js";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Cloudinary configuration
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendStatus(200);
});

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.json({ message: "Root!" });
});

app.get("/displayImages", async (req, res) => {
  try {
    const images = await cloudinarySearch();
    res.json(images);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

app.post("/addSpanishWord", async (req, res) => {
  try {
    // Access the data sent from the frontend
    console.log("request body", JSON.stringify(req.body));
    const spanishWord = req.body.word;
    console.log("backend received:", spanishWord);

    // Process the data if not empty
    if (!spanishWord) {
      console.log("empty input");
      return res.status(400).json({ msg: "Please enter a word" });
    }

    const aiResponse = await generateImagePrompt(spanishWord);
    console.log("aiResponse", aiResponse);
    const imagePrompt = aiResponse["prompt"];
    const imageLink = await generateImageSafe(imagePrompt);
    console.log("imageLink", imageLink);

    // Upload to Cloudinary
    const responseCloudinary = await UploadCloudinary(imageLink[0], aiResponse);
    // console.log('responseCloudinary', responseCloudinary);
    let finalImageLink = "";
    if (responseCloudinary?.url) {
      finalImageLink = responseCloudinary.url;
    } else {
      finalImageLink = imageLink[0];
    }

    // Get the original Spanish word from aiResponse
    const originalSpanishWord = aiResponse.infinitive;

    // Create a new flashcard object with the data
    const newFlashcard = {
      originalSpanishWord,
      finalImageLink,
    };

    // Respond with success status and the newFlashcard if needed
    return res.status(200).json({ flashcard: newFlashcard });
  } catch (error) {
    // Handle errors here, such as logging or returning an error response.
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/myfunction/get", (req, res) => {
  // console.log("Received a GET request to /myfunction");
  // console.log("Cloudinary Cloud Name:", CLOUDINARY_CLOUD_NAME);
  res.json({
    message: "Hello, World!",
  });
});

// Handler for POST requests to /hello
app.post("/myfunction/post", (req, res) => {
  console.log("Received a POST request to /myfunction/hell");
  res.json({ message: "Received a POST request to /myfunction/hell" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
