module.exports = (sequelize, DataTypes) => {
  const Integrate = sequelize.define("Integrate", {
    name: {
      type: DataTypes.STRING,
    },

    quntity: {
      type: DataTypes.STRING,
    },
  });
  return Integrate;
};
