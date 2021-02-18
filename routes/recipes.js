const express = require("express");
const controller = require("../controllers/recipes");
const router = express.Router();
const upload = require("../middleware/multer");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipesFound = await controller.fetchRecipe(recipeId, next);
  if (recipesFound) {
    req.recipe = recipesFound;
    next();
  } else {
    const error = new Error("Recipe Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", controller.recipeList);
router.get("/:recipeId", controller.recipeDetail);
router.put("/:recipeId", upload.single("image"), controller.recipeUpdate);
router.delete("/:recipeId", controller.recipeDelete);

module.exports = router;
