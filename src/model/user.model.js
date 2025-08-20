const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig/sequelize.config");
const Vendor = require("./Vendor"); // import Vendor model

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      field: "email",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "deleted"),
      defaultValue: "active",
      field: "status",
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "role_id",
      references: {
        model: "roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "vendor_id",
      references: {
        model: "vendors",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "created_by",
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "updated_by",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "users",
    paranoid: true,
    indexes: [
      { unique: true, fields: ["email"] }, // login / lookup
      { fields: ["vendor_id"] }, // join with vendors
      { fields: ["status"] }, // filter by status
      { fields: ["created_at"] }, // sort by signup time
    ],
  }
);

// Associations
User.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });
Vendor.hasMany(User, { foreignKey: "vendorId", as: "users" });

module.exports = User;
