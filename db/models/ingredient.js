module.exports = (sequelize, DataTypes) => {
  const Integrate = sequelize.define("Integrate", {
    name: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
  });
  return Integrate;
};
