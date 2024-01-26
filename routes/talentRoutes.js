const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

const TalentModel = require("../models/talentModel");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, "0777", true);

const customOptions = {
  uploadDir: uploadDir,
  //keepExtensions: true,
  //keepFilenames: true,
  allowEmptyFiles: true,
  maxFileSize: 50 * 1024 * 1024, // 5MB
  minFileSize: 0,
  multiples: true,
  //filter: filterFunction,
};

router.get("/count", async (req, res) => {
  const count = await TalentModel.count({});
  res.status(200).json(count);
});

router.post("/save", async (req, res) => {
  const form = new formidable.IncomingForm(customOptions);

  form.parse(req, async (err, fields, files) => {
    console.log("err ", err);
    console.log("fields ", fields);

    if (err) res.status(400).json({ message: "Error parsing the files" });
    if (fields === null || fields["data[name]"] === null)
      res.status(400).json({ message: "Error no input data" });

    const talentModel = new TalentModel({
      name: fields["data[name]"],
      number: fields["data[number]"],
      age: fields["data[age]"],
      sex: fields["data[sex]"],
      height: fields["data[height]"],
      motherlanguage: fields["data[motherlanguge]"],
      eyecolor: fields["data[eyecolor]"],
      haircolor: fields["data[haircolor]"],
      shirtsize: fields["data[shirtsize]"],
      shoesize: fields["data[shoesize]"],
      pantsize: fields["data[pantsize]"],
      race: fields["data[race]"],
      special: fields["data[special]"],
      about: fields["data[about]"],
      insertedAt: new Date(),
      modifiedAt: null,
    });

    const savedTalent = await talentModel.save();
    const talentId = savedTalent._id;

    if (files["data[files]"]) {
      files["data[files]"].forEach(async (file) => {
        const imageModel = new ImageModel({
          talentId: talentId,
          originalName: file.originalFilename,
          generatedName: file.newFilename,
          insertedAt: new Date(),
          path: file.filepath,
        });
        await imageModel.save();
        fs.rename(
          file.filepath,
          form.uploadDir + "/" + file.newFilename,
          (err) => err
        );
      });
    }
    return res.status(200).json(savedTalent);
  });
});

module.exports = router;
