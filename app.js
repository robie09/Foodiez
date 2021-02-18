const express = require("express");

const app = express();
const cors = require("cors");
const db = require("./db/models");

const categoryRoutes = require("./routes/categories");
const ingredienteRoutes = require("./routes/integrate");
const RecipeRoutes = require("./routes/recipes");

app.use(express.json());
app.use(cors());
const path = require("path");

app.use("/categories", categoryRoutes);
app.use("/ingredient", ingredienteRoutes);
app.use("/recipe", RecipeRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const PORT = 8000;
db.sequelize.sync({ alter: true });
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
