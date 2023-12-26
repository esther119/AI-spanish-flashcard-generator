import express from 'express';
const app = express();

app.get('/test', (req, res) => {
  res.json('Hello World!'); // Change this line
});

app.listen(1000, () => {
  console.log('Server is listening on port 1000');
}
);

