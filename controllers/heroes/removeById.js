const { Hero } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Hero.findByIdAndRemove(id);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    message: "hero deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
