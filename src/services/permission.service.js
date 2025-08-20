const Permission = require('../model/permission.model');
const Role = require('../model/role.model');
const Module = require('../model/module.model');

class PermissionService {
  async createPermission(permissionData) {
    const { roleId, moduleId, canCreate, canRead, canUpdate, canDelete } = permissionData;
    const permission = await Permission.create({
      roleId,
      moduleId,
      canCreate,
      canRead,
      canUpdate,
      canDelete
    });
    return permission;
  }

  async getAllPermissions() {
    return await Permission.findAll({
      include: [
        { model: Role, attributes: ['id', 'name'] },
        { model: Module, attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async getPermissionById(id) {
    return await Permission.findByPk(id, {
      include: [
        { model: Role, attributes: ['id', 'name'] },
        { model: Module, attributes: ['id', 'name'] }
      ]
    });
  }

  async getPermissionsByRole(roleId) {
    return await Permission.findAll({
      where: { roleId },
      include: [{ model: Module, attributes: ['id', 'name'] }]
    });
  }

  async updatePermission(id, permissionData) {
    const { canCreate, canRead, canUpdate, canDelete } = permissionData;
    await Permission.update(
      { canCreate, canRead, canUpdate, canDelete },
      { where: { id } }
    );
    return await this.getPermissionById(id);
  }

  async deletePermission(id) {
    return await Permission.destroy({ where: { id } });
  }
}

module.exports = new PermissionService();