import functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

import express from "express"

import bodyParser from 'body-parser';
  
const app = express();
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
    res.json('Hello World!'); // Change this line
  });
// app.get('/', (req, res) => {
//     res.status(200).send({data: 'test'}); // Change this line
//   });

export const api = functions.https.onRequest(app);

