const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const app = express();
const port = 3333;

// midllewares
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));
app.post('/api/v1/tours', (req, res) => {
  const id = uuidv4();
  // const { name, duration, difficulty } = req.body;
  const newTour = { id, ...req.body };
  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) throw err;
    res.status(200).send({ message: 'success post', data: newTour });
  });
});
app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({ message: 'success', results: tours.length, data: tours });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
