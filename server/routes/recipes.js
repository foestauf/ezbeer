const express = require("express")
const router = express.Router();
const Recipe = require("../models/recipe")


router.get("/", (req, res) => {
    let user = req.body
    console.log(user)
    Recipe.find({owner: user}, (err, docs) => {
        if (err) {
            return res.status(404).json({ userNotFound: "User not found"})
        }
        console.log('Inside recipe finder');
    })
        .then((docs) => {
            console.log('I find this' + docs);
            res.json({
                owner: docs.owner
            })
        })
        .catch(err => console.log(err))

})

router.post("/new", (req, res) => {
    const newRecipe = new Recipe({
        name: req.body.name,
        style: req.body.style,
        ingredients: req.body.ingredientList,
        owner: req.body.ownerID
    })
    newRecipe
        .save()
        .then(res.status(400).json({ complete: "We did it"}))
        .catch(err => console.log(err))
})

module.exports = router;