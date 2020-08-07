const express = require('express');
const router = express.Router();

const actionDataBase = require("../data/helpers/actionModel.js");
const projectDataBase = require("../data/helpers/projectModel.js");

// gets all the actions for a specific project
router.get('/project/:id', (req, res) => {
  const { id } = req.params;

  projectDataBase.getProjectActions(id)
    .then(actions => {
      res.status(200).json({ data: actions })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

// gets the specific action from a list containing every action in the database, regardless of project
router.get('/:id', (req, res) => {
  const { id } = req.params;

  actionDataBase.get(id)
    .then(actions => {
      res.status(200).json({ data: actions })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

router.post('/', validateAction, (req, res) => {
  const newAction = req.body;

  actionDataBase.insert(newAction)
    .then(action => {
      res.status(201).json({ data: action });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not add the action" });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const newAction = req.body;

  actionDataBase.update(id, newAction)
    .then(actions => {
      res.status(201).json({ data: actions })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not edit the data" });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  actionDataBase.remove(id)
    .then(action => {
      res.status(201).json({ data: action });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not delete the action" });
    });
});

function validateAction(req, res, next) {
  projectDataBase.get(req.params.id)
    .then(project => {
      if (project) {
        next();
      } else {
        res.status(404).json({ message: "project not found" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not find the user" });
    })
};

module.exports = router;