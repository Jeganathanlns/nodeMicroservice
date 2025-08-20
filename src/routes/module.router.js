const express = require('express');
const router = express.Router();
const controller = require('../controllers/module.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, controller.createModule);
router.get('/', auth, controller.getModules);
router.get('/:id', auth, controller.getModule);
router.put('/:id', auth, controller.updateModule);
router.delete('/:id', auth, controller.deleteModule);

module.exports = router;