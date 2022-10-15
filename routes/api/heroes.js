const express = require("express");

const { upload, ctrlWrapper } = require("../../middlewares");
const { heroes: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", upload.array("images", 5), ctrlWrapper(ctrl.addHero));

router.put("/:id", upload.array("images", 5), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
