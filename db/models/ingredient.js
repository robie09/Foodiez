module.exports = (sequelize, DataTypes) => {
  const Integrate = sequelize.define("Integrate", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Integrate, {
    source: ["name"],
  });
  return Integrate;
};
