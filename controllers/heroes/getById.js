const { Hero } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Hero.findById(id);
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

module.exports = getById;
