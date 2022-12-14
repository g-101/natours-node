const express = require('express');
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const app = express();
const port = 3333;

// midllewares
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

app.post('/api/v1/tours', (req, res) => {
  let id = tours.length - 1;
  id = id + 1;

  // const { name, duration, difficulty } = req.body;
  const newTour = { id, ...req.body };

  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).send({ message: 'created', data: newTour });
  });
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({ message: 'OK', results: tours.length, data: tours });
});

app.put('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;

  const index = tours.findIndex(tour => tour.id === +id);

  tours[index].name = req.body.name;
  tours[index].duration = req.body.duration;
  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(200).send({ message: 'updated - OK', data: tours[index] });
  });
});
app.delete('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  const index = tours.findIndex(tour => tour.id === +id);
  tours.splice(index, 1);

  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(204).send('deleted');
  });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
