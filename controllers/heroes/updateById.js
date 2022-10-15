const fs = require("fs/promises");
const path = require("path");
const del = require("del");

const { Hero } = require("../../models");

const heroImageDir = path.join(__dirname, "../../", "public/images");

const updateById = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    const error = new Error("missing fields");
    error.status = 400;
    throw error;
  }

  const heroImgs = path.join(heroImageDir, req.params.id);
  await del([`${heroImgs}/**`, `!${heroImgs}`]);

  const files = req.files.map(async (item) => {
    const { path: tempPath, originalname } = item;
    const resultPath = path.join(heroImgs, originalname);
    await fs.rename(tempPath, resultPath);
    const imagePath = path.join("images", req.params.id, originalname);
    return imagePath;
  });
  const images = await Promise.all(files);

  const result = await Hero.findByIdAndUpdate(
    id,
    { ...req.body, images },
    { new: true }
  );

  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
