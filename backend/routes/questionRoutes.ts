import express from "express"
import { protect, admin } from "../middleware/authMiddleware"
import {
  addQuestion,
  addVote,
  deleteQuestion,
  getQuestions,
  getQuestionById,
  getRandomQuestion,
} from "../controllers/questionController"

const router = express.Router()

router.route("/").get(getQuestions).post(protect, addQuestion)
router.route("/random").get(getRandomQuestion)
router.route("/vote").post(protect, addVote)
router.route("/:id").get(getQuestionById).delete(protect, deleteQuestion)

export default router
