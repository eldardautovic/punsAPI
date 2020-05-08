const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const random = require("mongoose-random");

//GET all
router.get("/", async (req, res) => {
  try {
    const project = await Project.find();
    res.json(project);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

//GET random ID
router.get("/random", async (req, res) => {
  try {
    let resultsCount = await Project.countDocuments();
    let randomNum = Math.floor(Math.random() * resultsCount);

    let puns = await Project.find();

    res.json(puns[randomNum]);
  } catch (err) {}
});

//GET by ID
router.get("/:id", async (req, res) => {
  try {
    const params = await Project.findById(req.params.id);
    res.json(params);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

//PUT by ID
router.patch("/:id", async (req, res) => {
  try {
    const projectObject = {
      title: req.body.title,
      description: req.body.description,
    };

    const updatedProject = await Project.updateOne(
      { _id: req.params.id },
      {
        $set: projectObject,
      }
    );

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

//DELETE by ID
router.delete("/:id", async (req, res) => {
  try {
    const projectId = await Project.remove({ _id: req.params.id });
    res.status(200).json(projectId);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

//POST
router.post("/", async (req, res) => {
  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

module.exports = router;
