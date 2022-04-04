const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

router.put('/', userController.updateUser);

router.post('/login', userController.loginUser);

module.exports = router;
