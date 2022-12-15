const express = require('express');
const morgan = require('morgan');

const fs = require('fs');

const app = express();
const port = 3333;
// 1- midllewares
app.use(morgan('dev')); // 3rd-Party Middleware
app.use(express.json());

app.use((req, res, next) => {
  // meu proprio middleware
  // adicionando meu middlware no objeto req
  req.time = new Date().toISOString();
  next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

// 2 - ROUTES HANDLERS

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
  console.log('horario do req: ', req.time);
  const { id } = req.params;

  const index = tours.findIndex(tour => tour.id === +id);

  res.status(200).send({ message: 'OK', requested: req.time, data: tours[index] });
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

const createUser = (req, res) => {
  res.status(201).json('created');
};

const getAllUsers = (req, res) => {
  res.status(200).json('ok');
};

const getUser = (req, res) => {
  res.status(200).json('ok');
};

const updateUser = (req, res) => {
  res.status(200).json('ok updated');
};
const deleteUser = (req, res) => {
  res.status(204).json(null);
};
// 3- ROUTES
app.route('/api/v1/tours').post(createTour).get(getAllTours);
app.route('/api/v1/tours/:id').get(getTour).put(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).put(updateUser).delete(deleteUser);
// 4 - STARTING SERVER
app.listen(port, () => console.log(`server online http://localhost:${port}`));
