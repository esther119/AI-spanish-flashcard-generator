import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import generateImagePrompt from './openai.js';
import generateImageSafe from './replicate.js';
import UploadCloudinary from './uploadCloudinary.js';

// Load environment variables from .env file
dotenv.config();

// Now you can access environment variables with process.env
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// Cloudinary configuration
import { v2 as cloudinary } from 'cloudinary';
import cloudinarySearch from './getCloudinary.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.json()); 
app.use(cors());


cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


app.get('/', (req, res) => {
  res.json('Hello World!'); // Change this line
});

app.get('/displayImages', async (req, res) => {
  try {
    const images = await cloudinarySearch();
    res.json(images); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/addSpanishWord', async (req, res) => {
  try {
    // Access the data sent from the frontend
    console.log("request body", JSON.stringify(req.body));
    const spanishWord = req.body.word;
    console.log('backend received:', spanishWord)

    // Process the data if not empty
    if (!spanishWord) {
      console.log('empty input');
      return res.status(400).json({ msg: 'Please enter a word' });
    }

    const aiResponse = await generateImagePrompt(spanishWord);
    console.log('aiResponse', aiResponse);
    const imagePrompt = aiResponse['prompt'];
    const imageLink = await generateImageSafe(imagePrompt);
    console.log('imageLink', imageLink);

    // Upload to Cloudinary
    const responseCloudinary = await UploadCloudinary(imageLink[0], aiResponse);
    // console.log('responseCloudinary', responseCloudinary);
    let finalImageLink = '';
    if (responseCloudinary?.url) {
      finalImageLink = responseCloudinary.url;
    }
    else {
      finalImageLink = imageLink[0];
    }
  
    // Get the original Spanish word from aiResponse
    const originalSpanishWord = aiResponse.infinitive;

    // Create a new flashcard object with the data
    const newFlashcard = {
      originalSpanishWord,
      finalImageLink
    };

    // Respond with success status and the newFlashcard if needed
    return res.status(200).json({ flashcard: newFlashcard });
  } catch (error) {
    // Handle errors here, such as logging or returning an error response.
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(1000, () => {
  console.log('Server is listening on port 1000');
}
);

