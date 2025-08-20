const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/sequelize.config');

const Vendor = sequelize.define('Vendor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  vendorName: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'vendor_name'
  },
  contactName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'contact_name'
  },
  mobileNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'mobile_number'
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    field: 'email'
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'address'
  },
  gstNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'gst_number'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'deleted'),
    defaultValue: 'active',
    field: 'status'
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'created_by'
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'updated_by'
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'deleted_at'
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'vendors',
  paranoid: true,
  indexes: [
    { unique: true, fields: ['email'] },
    { fields: ['status'] },
    { fields: ['created_at'] }
  ]
});

module.exports = Vendor;
