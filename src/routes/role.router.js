const express = require('express');
const router = express.Router();
const controller = require('../controllers/role.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, controller.createRole);
router.get('/', auth, controller.getRoles);
router.get('/:id', auth, controller.getRole);
router.put('/:id', auth, controller.updateRole);
router.delete('/:id', auth, controller.deleteRole);

module.exports = router;