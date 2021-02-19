import { Request } from "express"
import asyncHandler from "express-async-handler"
import User, { UserSchema } from "../models/userModel"
import { generateToken } from "../utils/generateToken"

interface UserRequest extends Request {
  user: UserSchema
}

// SECTION: Get all users
// @route   GET /api/users/:id
// @access  Admin
export const getAllUsers = asyncHandler(async (req: UserRequest, res) => {
  const users = await User.find({})
  res.json(users)
})

// SECTION: Get user by ID
// @route   GET /api/users/:id
// @access  Original user / Admin
export const getUserById = asyncHandler(async (req: UserRequest, res) => {
  const { id } = req.params

  if (req.user._id.toString() !== id && !req.user.isAdmin) {
    res.status(400).json({ message: "You cannot see this user's profile" })
    return
  }

  const user = await User.findById(id).populate(
    "questions",
    "question upVotes downVotes"
  )

  if (!user) {
    res.status(404).json({ message: "No matching user found" })
    return
  }

  res.json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    questions: user.questions,
  })
})

// SECTION: Register user and get token
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body
  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  })

  if (existingUser) {
    console.log(existingUser)
    res.status(400).json({ message: "User already exists" })
    return
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    questions: [],
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      questions: user.questions,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({ message: "Invalid user data" })
  }
})

// SECTION: Log user in and get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body

  const user = await User.findOne({
    $or: [{ email: login }, { username: login }],
  })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      questions: user.questions,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).json({ message: "Incorrect username, email or password" })
  }
})

// SECTION: Edit user
// @route   PUT /api/users
// @access  Original user
export const editUser = asyncHandler(async (req: UserRequest, res) => {
  const { id, username, email, name, password, isAdmin } = req.body

  if (req.user._id.toString() !== id && !req.user.isAdmin) {
    res.status(400).json({ message: "Invalid request" })
    return
  }

  const user = await User.findById(id)

  if (!user) {
    res.status(404).json({ message: "No matching user found" })
    return
  }

  user.name = name || user.name
  user.username = username || user.username
  user.email = email || user.email

  if (password) {
    user.password = password
  }

  if (isAdmin) {
    user.isAdmin = isAdmin
  }

  await user.save()
  res.json({
    _id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    questions: user.questions,
    token: generateToken(user._id),
  })
})

// SECTION: Delete user
// @route   DELETE /api/users
// @access  Original user / Admin
export const deleteUser = asyncHandler(async (req: UserRequest, res) => {
  const { id } = req.params

  if (req.user._id.toString() !== id && !req.user.isAdmin) {
    res.status(400).json({ message: "Invalid request" })
    return
  }

  const user = await User.findById(id)

  if (!user) {
    res.status(404).json({ message: "No matching user found" })
    return
  }

  await user.remove()
  res.json({ message: "User removed successfully" })
})
