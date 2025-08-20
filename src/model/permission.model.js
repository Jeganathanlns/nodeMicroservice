const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/sequelize.config');
const Role = require('./Role');
const Module = require('./Module');

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'role_id',
    references: {
      model: 'roles',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'module_id',
    references: {
      model: 'modules',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  canCreate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'can_create'
  },
  canRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'can_read'
  },
  canUpdate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'can_update'
  },
  canDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'can_delete'
  }
}, {
  tableName: 'permissions',
  timestamps: true,
  underscored: true,
  indexes: [
    { unique: true, fields: ['role_id', 'module_id'] }
  ]
});

// Associations
Role.belongsToMany(Module, { through: Permission, foreignKey: 'roleId', as: 'modules' });
Module.belongsToMany(Role, { through: Permission, foreignKey: 'moduleId', as: 'roles' });

Permission.belongsTo(Role, { foreignKey: 'roleId' });
Permission.belongsTo(Module, { foreignKey: 'moduleId' });

module.exports = Permission;
