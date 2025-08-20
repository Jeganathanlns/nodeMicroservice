const express = require('express');
const router = express.Router();
const controller = require('../controllers/permission.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, controller.createPermission);
router.get('/', auth, controller.getPermissions);
router.get('/:id', auth, controller.getPermission);
router.get('/role/:roleId', auth, controller.getPermissionsByRole);
router.put('/:id', auth, controller.updatePermission);
router.delete('/:id', auth, controller.deletePermission);

module.exports = router;