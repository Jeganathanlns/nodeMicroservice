const Module = require('../model/module.model');

class ModuleService {
  async createModule(moduleData) {
    const { name, description } = moduleData;
    const module = await Module.create({ name, description });
    return module;
  }

  async getAllModules() {
    return await Module.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async getModuleById(id) {
    return await Module.findByPk(id);
  }

  async updateModule(id, moduleData) {
    const { name, description } = moduleData;
    await Module.update(
      { name, description },
      { where: { id } }
    );
    return await this.getModuleById(id);
  }

  async deleteModule(id) {
    return await Module.destroy({ where: { id } });
  }
}

module.exports = new ModuleService();