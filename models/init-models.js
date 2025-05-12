var DataTypes = require("sequelize").DataTypes;
var _project = require("./project");

function initModels(sequelize) {
  var project = _project(sequelize, DataTypes);


  return {
    project,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
