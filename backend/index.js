import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import generateImagePrompt from './openai.js';
import generateImageSafe from './replicate.js';

// Load environment variables from .env file
dotenv.config();

// Now you can access environment variables with process.env
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// Cloudinary configuration
import { v2 as cloudinary } from 'cloudinary';
import cloudinarySearch from './getCloudinary.js';
const app = express();
app.use(bodyParser.json()); 

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


app.get('/test', (req, res) => {
  res.json('Hello World!'); // Change this line
});

app.get('/displayImages', async (req, res) => {
  try {
    const images = await cloudinarySearch();
    // const images = {
    //   key1: 'value1'
    // };
    // console.log(images);
    res.json(images); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/spanishInput', async (req, res) => {
  // Access the data sent from the frontend
  console.log("request body", JSON.stringify(req.body));
  const spanishWord = req.body.word;
  console.log('backend received:', spanishWord)

  // Process the data if not empty
  if (spanishWord) {
    const aiResponse = await generateImagePrompt(spanishWord); 
    console.log('aiResponse', aiResponse);
    const ImagePrompt = aiResponse['prompt']
    const imageLink = await generateImageSafe(ImagePrompt)[0];
    console.log('imageLink', imageLink);
    
  }
  // const translation = translateSpanishToEnglish(spanishWord);

  // Send a response back to the frontend
  res.json("send back");
});

app.listen(1000, () => {
  console.log('Server is listening on port 1000');
}
);

