const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and password')
  // }
  const user = await User.create({ ...req.body })
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  // compare password 
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const validPassword = user.comparePassword(password)
  if (!validPassword) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

}

module.exports = { register, login }