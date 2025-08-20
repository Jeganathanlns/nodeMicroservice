const roleService = require('../services/role.service');

exports.createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRole = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    res.json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};