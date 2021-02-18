import express from "express"
import {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  getUserById,
  getAllUsers,
} from "../controllers/userController"
import { protect, admin } from "../middleware/authMiddleware"

const router = express.Router()

router
  .route("/")
  .put(protect, editUser)
  .delete(protect, deleteUser)
  .get(protect, admin, getAllUsers)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/:id").get(protect, getUserById)

export default router
