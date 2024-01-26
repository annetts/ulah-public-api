const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const talentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  number: {
    required: false,
    type: Number,
  },
  email: {
    required: false,
    type: String,
  },
  age: {
    required: false,
    type: Number,
  },
  height: {
    required: false,
    type: Number,
  },
  sex: {
    required: false,
    type: String,
  },
  motherlanguage: {
    required: false,
    type: String,
  },
  eyecolor: {
    required: false,
    type: String,
  },
  haircolor: {
    required: false,
    type: String,
  },
  shirtsize: {
    required: false,
    type: String,
  },
  shoesize: {
    required: false,
    type: String,
  },
  pantsize: {
    required: false,
    type: String,
  },
  race: {
    required: false,
    type: String,
  },
  special: {
    required: false,
    type: Array,
  },
  about: {
    required: false,
    type: String,
  },
  insertedAt: {
    required: false,
    type: Date,
  },
  modifiedAt: {
    required: false,
    type: Date,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
  ],
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "image",
    },
  ],
});

module.exports = mongoose.model("talent", talentSchema);
