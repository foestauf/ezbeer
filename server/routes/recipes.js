const express = require('express');

const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/', (req, res) => {
  const user = req.user.id;
  Recipe.find({ owner: user }, (err, docs) => {
    if (err) {
      return res.status(404).json({ userNotFound: 'User not found' });
    }
  })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

router.post('/new', (req, res) => {
  const newRecipe = new Recipe({
    name: req.body.name,
    style: req.body.style,
    ingredients: req.body.ingredientList,
    owner: req.body.owner,
  });
  newRecipe
    .save()
    .then(res.status(200).json({ complete: 'We did it' }))
    .catch((err) => console.log(err));
});

router.delete('/delete-recipe', (req, res) => {
  const id = { _id: req.body.data };
  Recipe.deleteOne(id, function (err, obj) {
    if (err) throw err;
    console.log('1 document deleted');
  })
    .then(res.status(200).json({ complete: 'we did it' }))
    .catch((err) => console.log(err));
});

router.put('/update-recipe', (req, res) => {
  console.log(req.body);
  Recipe.updateOne(
    { _id: req.body._id },
    {
      $set: {
        ...req.body,
      },
    },
    { upsert: true },
  )
    .then(res.status(200).json({ complete: 'we did it' }))
    .catch((err) => console.log(err));
});

router.put('/add-ingredient', (req, res) => {
  const id = req.body._id;
  delete req.body._id;
  Recipe.updateOne(
    { _id: id },
    {
      $push: {
        ingredients: { ...req.body },
      },
    },
  )
    .then(res.status(200).json({ complete: 'we did it' }))
    .catch((err) => console.log(err));
});

module.exports = router;
