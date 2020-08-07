const express = require('express');
const router = express.Router();

const projectDataBase = require("../data/helpers/projectModel.js");

router.get('/:id', (req, res) => {
  const { id } = req.params;

  projectDataBase.get(id)
    .then(project => {
      res.status(200).json({ data: project })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

router.post('/', (req, res) => {
  const newProject = req.body;

  projectDataBase.insert(newProject)
    .then(project => {
      res.status(201).json({ data: project });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not add the project" });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const newProject = req.body;

  projectDataBase.update(id, newProject)
    .then(project => {
      res.status(201).json({ data: project })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not edit the data" });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  projectDataBase.remove(id)
    .then(project => {
      res.status(201).json({ data: project });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not delete the project" });
    });
});

module.exports = router;