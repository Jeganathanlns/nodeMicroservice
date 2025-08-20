const moduleService = require('../services/module.service');

exports.createModule = async (req, res) => {
  try {
    const module = await moduleService.createModule(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getModules = async (req, res) => {
  try {
    const modules = await moduleService.getAllModules();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getModule = async (req, res) => {
  try {
    const module = await moduleService.getModuleById(req.params.id);
    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const module = await moduleService.updateModule(req.params.id, req.body);
    res.json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    await moduleService.deleteModule(req.params.id);
    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};