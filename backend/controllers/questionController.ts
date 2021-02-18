import { Request } from "express"
import asyncHandler from "express-async-handler"
import Question, { QuestionSchema } from "../models/questionModel"
import { UserSchema } from "../models/userModel"

interface UserRequest extends Request {
  user: UserSchema
}

// SECTION: Get all questions
// @route:  GET /api/questions/all
// @access: Private
export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({})
  return res.json(questions)
})

// SECTION: Get question by id
// @route:  GET /api/questions
// @access: Private
export const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id).populate(
    "user",
    "username name"
  )
  return res.json(question)
})

// SECTION: Get a random question
// @route:  GET /api/questions
// @access: Private
export const getRandomQuestion = asyncHandler(async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 1 } }])
  const question = await Question.findById(questions[0]._id).populate(
    "user",
    "username name"
  )
  return res.json(question)
})

// SECTION: Add a question
// @route:  PUT /api/questions
// @access: Private
export const addQuestion = asyncHandler(async (req: UserRequest, res) => {
  const user = req.user
  const { question } = req.body

  const newQuestion = await Question.create({ user: user._id, question })
  console.log(newQuestion)
  req.user.questions.push(newQuestion._id)
  await req.user.save()

  return res.status(201).json(newQuestion)
})

// SECTION: Delete a question
// @route:  DELETE /api/questions
// @access: Private
export const deleteQuestion = asyncHandler(async (req: UserRequest, res) => {
  const user = req.user
  const question = await Question.findById(req.params.id)

  if (!question) {
    res.status(404).json({ message: "No question found" })
    return
  }

  if (question.user.toString() !== user._id.toString() && !user.isAdmin) {
    res.status(401).json({ message: "You cannot delete this question" })
    return
  }

  question.remove()
  return res.json({ message: "Question deleted" })
})

// SECTION: Add vote
// @route:  PUT /api/questions/vote
// @access: Private
export const addVote = asyncHandler(async (req: UserRequest, res) => {
  const { id, vote } = req.body
  const question = await Question.findById(id).populate("user", "username name")

  if (!question) {
    res.status(401).json({ message: "No matching questions" })
    return
  }

  switch (vote) {
    case "UP": {
      question.upVotes = question.upVotes + 1
      await question.save()
      res.status(201).json(question)
      return
    }
    case "DOWN": {
      question.downVotes = question.downVotes + 1
      await question.save()
      res.status(201).json(question)
      return
    }
    default: {
      res.status(201).json(question)
    }
  }
})
