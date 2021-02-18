import express from "express"
import { protect, admin } from "../middleware/authMiddleware"
import {
  addQuestion,
  addVote,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  getRandomQuestion,
} from "../controllers/questionController"

const router = express.Router()

router.route("/").get(protect, getRandomQuestion).post(protect, addQuestion)
router.route("/all").get(protect, getAllQuestions)
router.route("/vote").post(protect, addVote)
router
  .route("/:id")
  .get(protect, getQuestionById)
  .delete(protect, deleteQuestion)

export default router
