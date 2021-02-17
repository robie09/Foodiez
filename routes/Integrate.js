const express = require("express");
const controller = require("../controllers/ingredient");
const router = express.Router();
const upload = require("../middleware/multer");

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredientFound = await controller.fetchIngredient(ingredientId, next);
  if (ingredientFound) {
    req.recipe = recipesFound;
    next();
  } else {
    const error = new Error("ingredient Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", controller.ingredientList);
router.get("/:ingredientId", controller.ingredientDetail);
router.put(
  "/:ingredientId",
  upload.single("image"),
  controller.ingredientUpdate
);
router.delete("/:ingredientId", controller.ingredientDelete);

module.exports = router;
