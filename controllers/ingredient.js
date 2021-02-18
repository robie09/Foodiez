const { Category, Integrate } = require("../db/models");

exports.fetchIngredient = async (ingredientid, next) => {
  try {
    const ingredientFound = await Integrate.findByPk(ingredientid);
    if (ingredientFound) return ingredientFound;
    else next({ message: "Ingredient does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.ingredientList = async (req, res, next) => {
  console.log(req.body);
  try {
    const ingredients = await Integrate.findAll({
      attributes: req.body,
      attributes: { exclude: ["updatedAt", "createdAt"] },

      include: {
        model: Category,
        as: "category",
        attributes: ["id"],
      },
      include: {
        model: Recipe, //we will have array of Recipes Id        as: "recipe",
        attributes: ["id"],
        through: { attributes: [] },
      },
    });
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

exports.ingredientDetail = async (req, res, next) => {
  res.status(200).json(req.ingredient);
};

exports.ingredientUpdate = async (req, res, next) => {
  if (req.file) {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.recipe.update(req.body);
  res.status(200).json(req.ingredient);
};

exports.ingredientDelete = async (req, res, next) => {
  await req.ingredient.destroy();
  res.status(204).end();
};
