const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/sequelize.config');

const Module = sequelize.define('Module', {
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
  }
}, {
  tableName: 'modules',
  timestamps: true,
  underscored: true,
  indexes: [
    { unique: true, fields: ['name'] }
  ]
});

module.exports = Module;
