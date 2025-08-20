const permissionService = require('../services/permission.service');

exports.createPermission = async (req, res) => {
  try {
    const permission = await permissionService.createPermission(req.body);
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPermission = async (req, res) => {
  try {
    const permission = await permissionService.getPermissionById(req.params.id);
    if (!permission) return res.status(404).json({ error: 'Permission not found' });
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPermissionsByRole = async (req, res) => {
  try {
    const permissions = await permissionService.getPermissionsByRole(req.params.roleId);
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const permission = await permissionService.updatePermission(req.params.id, req.body);
    res.json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    await permissionService.deletePermission(req.params.id);
    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};