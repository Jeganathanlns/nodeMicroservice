const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/generate-otp', controller.generateOTP);
router.post('/register', controller.createUser);
router.get('/', auth, controller.getUsers);
router.get('/:id', auth, controller.getUser);
router.put('/:id', auth, controller.updateUser);
router.delete('/:id', auth, controller.deleteUser);
router.post('/login', controller.login);

module.exports = router;