const express = require("express");
const controller = require("../controllers/categories");
const router = express.Router();
const upload = require("../middleware/multer");

router.param("categoryId", async (req, res, next, categoryId) => {
  console.log("hi");
  const categoryFound = await controller.fetchCategory(categoryId, next);
  if (categoryFound) {
    req.category = categoryFound;
    console.log(req.category);

    next();
  } else {
    console.log("bey");
    const error = new Error("Category Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", controller.categoryList);
router.post("/", upload.single("image"), controller.categoryCreate);
router.get("/:categoryId", controller.categoryDetail);
router.put("/:categoryId", upload.single("image"), controller.categoryUpdate);
router.delete("/:categoryId", controller.categoryDelete);

router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  controller.ingredientCreate
);

module.exports = router;
