const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, controller.getUsers);
router.post('/login', controller.login); // fake login to return token

module.exports = router;
