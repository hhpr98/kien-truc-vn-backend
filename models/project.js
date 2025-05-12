const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project', {
    projectId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    projectName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    productDetail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    projectDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    projectMainURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    projectFolder: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'project',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "projectId" },
        ]
      },
    ]
  });
};
