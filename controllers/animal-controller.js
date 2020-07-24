let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let validateSession = require('../middleware/validate-session');
let Animal = sequelize.import('../models/animal');

//* POST
router.post('/create', validateSession, (req, res) => {
  console.log('req -->', req);
  const animalFromRequest = {
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator,
  }
  Animal.create(animalFromRequest)
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(500).json({ error: err}))
})

//* GET
router.get('/', function (req, res) {
  Animal.findAll()
    .then(animal => {
      res.status(200).json({
        animal: animal,
        message: 'Animal(s) successfully retrieved!',
        number: `${animal.length} number of animals`
      })
    })
    .catch(err => res.status(500).json({ error: err }))
})

//* UPDATE
router.put('/:id', (req, res) => {
  Animal.update({
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(recordsChanged => res.status(200).json({ message: 'Animal updated'}))
  .catch(err => res.status(500).json({message: 'Update Failed', error: err}))
  
})

//* DELETE
router.delete('/delete/:id', (req, res) => {
  Animal.destroy({ where: { id: req.params.id} })
  .then(recordsChanged => res.status(200).json({ message: `${recordsChanged} record(s) deleted.` }))
  .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;