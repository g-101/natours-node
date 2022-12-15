const express = require('express');
const router = express.Router();

// controllers são importados aqui no routes
const userController = require('../controllers/userController');

const { getAllUsers, createUser, getUser, updateUser, deleteUser } = userController;

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
