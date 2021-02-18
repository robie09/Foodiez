"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Category.hasMany(db.Integrate, {
  foreignKey: "categoryId",
  as: "ingredient",
  allowNull: false,
});

db.Integrate.belongsTo(db.Category, {
  foreignKey: "categoryId",
  as: "category",
});
//many to many relathions
db.Integrate.belongsToMany(db.Recipe, { through: "Integrate_Recipe" });
db.Recipe.belongsToMany(db.Integrate, { through: "Integrate_Recip" });

const Integrate_Recip = sequelize.define(
  "Integrate_Recip",
  {
    //"recipeId", "ingredientId"
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  { timestamps: false }
);

module.exports = db;
