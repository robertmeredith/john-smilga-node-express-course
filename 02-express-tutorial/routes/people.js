const express = require('express');
const router = express.Router();

let { people } = require('../data');
let peopleController = require('../controllers/people');

router.get('/', peopleController.getPeople);
router.post('/', peopleController.createPerson);
router.post('/postman', peopleController.createPersonPostman);
router.put('/:id', peopleController.editPerson);
router.delete('/:id', peopleController.deletePerson);

module.exports = router;
