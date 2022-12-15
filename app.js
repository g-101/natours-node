const express = require('express');
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const app = express();
const port = 3333;

// midllewares
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

const createTour = (req, res) => (req, res) => {
  const id = tours[tours.length - 1].id + 1;

  const newTour = { id, ...req.body };

  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).send({ message: 'created', data: newTour });
  });
};

const getAllTours = (req, res) => {
  res.status(200).send({ message: 'OK', results: tours.length, data: tours });
};

const getTour = (req, res) => {
  const { id } = req.params;

  const index = tours.findIndex(tour => tour.id === +id);

  res.status(200).send({ message: 'OK', data: tours[index] });
};

const updateTour = (req, res) => {
  const { id } = req.params;

  const index = tours.findIndex(tour => tour.id === +id);

  tours[index].name = req.body.name;
  tours[index].duration = req.body.duration;
  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(200).send({ message: 'updated - OK', data: tours[index] });
  });
};

const deleteTour = (req, res) => {
  const { id } = req.params;
  const index = tours.findIndex(tour => tour.id === +id);
  tours.splice(index, 1);

  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(204).send(null);
  });
};

app.route('/api/v1/tours').post(createTour).get(getAllTours);
app.route('/api/v1/tours/:id').get(getTour).put(updateTour).delete(deleteTour);

app.listen(port, () => console.log(`http://localhost:${port}`));
