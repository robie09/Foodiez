const db = require("../db/models/");
const {
  Ingredient,
  Recipe,
  RecipeIngredients,
  Category,
} = require("../db/models");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const recipeFound = await Recipe.findByPk(recipeId);
    if (recipeFound) return recipeFound;
    else next({ message: "Recipe does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.recipeList = async (req, res, next) => {
  console.log(req.body);
  try {
    const recipes = await Recipe.findAll({
      attributes: req.body,
      attributes: { exclude: ["updatedAt", "createdAt"] },

      include: [
        {
          model: Ingredient,
          through: {
            attributes: [],
          },
          as: "ingredients",
          attributes: ["id"],
        },
      ],
    });

    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newRecipe = await Recipe.create(req.body);
    req.body.ingredientId = req.ingredient.id;

    await newRecipe.addIngredients(req.body);

    console.log(newRecipe);
    console.log(req.body.ingredientId);
    console.log(req.body[2]);
    res.status(201).json({
      newRecipe,
    });
  } catch (error) {
    next(error);
  }
};

exports.recipeDetail = async (req, res, next) => {
  res.status(200).json(req.recipe);
};

exports.recipeUpdate = async (req, res, next) => {
  if (req.file) {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.recipe.update(req.body);
  res.status(200).json(req.recipe);
};

exports.recipeDelete = async (req, res, next) => {
  await req.recipe.destroy();
  res.status(204).end();
};
