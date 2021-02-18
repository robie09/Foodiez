module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
  });
  return Recipe;
};
