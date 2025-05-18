const { Model, DataTypes } = require('sequelize');

class VendorAttachment extends Model {
  static associate(models) {
    VendorAttachment.belongsTo(models.Vendor, {
  foreignKey: 'vendorId'
});
  }
}

module.exports = (sequelize) => {
  VendorAttachment.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Vendors',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'VendorAttachment',
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

  return VendorAttachment;
};