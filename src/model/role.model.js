const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/sequelize.config');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'name'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'description'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    field: 'status'
  }
}, {
  tableName: 'roles',
  timestamps: true,
  underscored: true,
  indexes: [
    { unique: true, fields: ['name'] },
    { fields: ['status'] }
  ]
});

module.exports = Role;