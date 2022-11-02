const express = require('express')
const router = express.Router();

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs')

// router.get('/', getAllJobs)
// router.post('/', createJob)

router.route('/').get(getAllJobs).post(createJob)

// router.get('/:id', getJob)
// router.patch('/:id', updateJob)
// router.delete('/:id', deleteJob)

router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router;