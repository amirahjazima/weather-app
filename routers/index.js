const { Router } = require("express");
const indexRouter = require("./index.router");
const forecastRoutes = require("./forecast.router");

const router = Router();

router.use("/", indexRouter);
router.use("/forecast", forecastRoutes);

module.exports = { router };

