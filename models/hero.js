const { Schema, model } = require("mongoose");

const heroSchema = Schema(
  {
    nickname: {
      type: String,
      required: [true, "Set name"],
    },
    real_name: {
      type: String,
      required: [true, "Set real name"],
    },
    origin_description: {
      type: String,
      required: [true, "Set description of the hero"],
    },
    superpowers: {
      type: String,
      required: [true, "Set superpowers of the hero"],
    },
    catch_phrase: {
      type: String,
      required: [true, "Set catch phrase"],
    },
    images: [String],
  },
  { versionKey: false, timestamps: true }
);

const Hero = model("heroe", heroSchema);

module.exports = {
  Hero,
};
