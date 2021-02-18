module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
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
  return Category;
};
