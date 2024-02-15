import express from "express";
import bodyParser from "body-parser";
import generateImagePrompt from "./openai.js";
import generateImageSafe from "./replicate.js";
import UploadCloudinary from "./uploadCloudinary.js";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

const app_test = express();
app_test.get("/", (req, res) => {
  //   const name = process.env.CLOUDINARY_CLOUD_NAME;
  //   console.log("Cloudinary Cloud Name:", name);
  res.json({ message: "Root!" });
});

app_test.get("/myfunction/get", (req, res) => {
  console.log("Received a GET request to /myfunction");
  console.log("Cloudinary Cloud Name:", CLOUDINARY_CLOUD_NAME);
  res.json({ message: "Hello, World!" });
});

// Handler for POST requests to /hello
app_test.post("/myfunction/post", (req, res) => {
  console.log("Received a POST request to /myfunction/hell");
  res.json({ message: "Received a POST request to /myfunction/hell" });
});

const port = 3000;
app_test.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app_test;
