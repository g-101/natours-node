const express = require('express');
const fs = require('fs');
const app = express();
const port = 3333;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ message: 'sucess', results: tours.length, data: tours });
});

// app.post('/', (req, res) => {
//   res.status(200).json({ message: 'Você pode postar neste endpoint!' });
// });
app.listen(port, () => console.log(`http://localhost:${port}`));
