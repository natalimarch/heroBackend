const fs = require("fs/promises");
const path = require("path");

const { Hero } = require("../../models");

const heroImageDir = path.join(__dirname, "../../", "public/images");

const addHero = async (req, res) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;
  const result = await Hero.create(req.body);

  const heroImgs = path.join(heroImageDir, String(result._id));
  await fs.mkdir(heroImgs);

  const files = req.files.map(async (item) => {
    const { path: tempPath, originalname } = item;
    const resultPath = path.join(heroImgs, originalname);
    await fs.rename(tempPath, resultPath);
    const imagePath = path.join("images", String(result._id), originalname);
    return imagePath;
  });
  const images = await Promise.all(files);
  const newHero = await Hero.findByIdAndUpdate(
    result._id,
    { images },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newHero,
    },
  });
};

module.exports = addHero;
