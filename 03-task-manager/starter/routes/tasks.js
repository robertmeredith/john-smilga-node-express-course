const express = require('express');
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
} = require('../controllers/tasks');

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);

router
  .route('/:id')
  .get(getSingleTask)
  .patch(updateSingleTask)
  .delete(deleteSingleTask);

// non-chained version

// router.get('/', (req, res) => {
//   res.send('Get all the tasks');
//   res.end();
// });

// router.post('/', (req, res) => {
//   res.send('Create a new task');
// });

// router.get('/:id', (req, res) => {
//   console.log('Get Single Task');
// });

// router.patch('/:id', (req, res) => {
//   console.log('Update Single Task');
// });

// router.delete('/:id', (req, res) => {
//   console.log('Delete Single Task');
// });

module.exports = router;
