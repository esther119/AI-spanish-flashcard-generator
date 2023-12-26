import express from 'express';
import cloudinarySearch from './getCloudinary.js';
const app = express();

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


app.listen(1000, () => {
  console.log('Server is listening on port 1000');
}
);

