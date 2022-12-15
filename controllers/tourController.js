const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`));

exports.createTour = (req, res) => (req, res) => {
  const id = tours[tours.length - 1].id + 1;

  const newTour = { id, ...req.body };

  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).send({ message: 'created', data: newTour });
  });
};

exports.getAllTours = (req, res) => {
  res.status(200).send({ message: 'OK', results: tours.length, data: tours });
};

exports.getTour = (req, res) => {
  console.log('horario do req: ', req.time);
  const { id } = req.params;

  const index = tours.findIndex(tour => tour.id === +id);

  res.status(200).send({ message: 'OK', requested: req.time, data: tours[index] });
};

exports.updateTour = (req, res) => {
  const { id } = req.params;

  const index = tours.findIndex(tour => tour.id === +id);

  tours[index].name = req.body.name;
  tours[index].duration = req.body.duration;
  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(200).send({ message: 'updated - OK', data: tours[index] });
  });
};

exports.deleteTour = (req, res) => {
  const { id } = req.params;
  const index = tours.findIndex(tour => tour.id === +id);
  tours.splice(index, 1);

  fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(204).send(null);
  });
};
