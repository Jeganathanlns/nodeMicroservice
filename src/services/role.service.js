const Role = require('../model/role.model');

class RoleService {
  async createRole(roleData) {
    const { name, description, status } = roleData;
    const role = await Role.create({ name, description, status });
    return role;
  }

  async getAllRoles() {
    return await Role.findAll({
      where: { status: 'active' },
      order: [['createdAt', 'DESC']]
    });
  }

  async getRoleById(id) {
    return await Role.findByPk(id);
  }

  async updateRole(id, roleData) {
    const { name, description, status } = roleData;
    await Role.update(
      { name, description, status },
      { where: { id } }
    );
    return await this.getRoleById(id);
  }

  async deleteRole(id) {
    return await Role.update(
      { status: 'inactive' },
      { where: { id } }
    );
  }
}

module.exports = new RoleService();