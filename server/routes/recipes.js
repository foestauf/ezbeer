const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");


router.get("/", (req, res) => {
    let user = req.user.id;
    Recipe.find({owner: user}, (err, docs) => {
        if (err) {
            return res.status(404).json({ userNotFound: "User not found"})
        }
    })
        .then((docs) => {
            res.json(docs)
        })
        .catch(err => console.log(err))

});

router.post("/new", (req, res) => {
    const newRecipe = new Recipe({
        name: req.body.name,
        style: req.body.style,
        ingredients: req.body.ingredientList,
        owner: req.body.owner
    });
    newRecipe
        .save()
        .then(res.status(200).json({ complete: "We did it"}))
        .catch(err => console.log(err))
});

module.exports = router;