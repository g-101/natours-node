const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tourController');

const { createTour, getAllTours, getTour, updateTour, deleteTour } = tourController;

router.route('/').post(createTour).get(getAllTours);
router.route('/:id').get(getTour).put(updateTour).delete(deleteTour);

module.exports = router;
