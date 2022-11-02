const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// GET - All Jobs
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// GET - Single Job
const getJob = async (req, res) => {
  const jobId = req.params.id;
  const { userId } = req.user;
  const job = await Job.find({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No such job exists with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

// POST - Create Job
const createJob = async (req, res) => {
  // req.user passed from authenticator
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Update Job
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or position fields cannot be empty');
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const deletedJob = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!deletedJob) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ deletedJob });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
