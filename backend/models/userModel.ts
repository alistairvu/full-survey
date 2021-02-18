import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { QuestionSchema, questionSchema } from "./questionModel"

export interface UserSchema extends mongoose.Document {
  name: string
  username: string
  email: string
  password: string
  isAdmin: boolean
  questions: mongoose.Schema.Types.ObjectId[]
  matchPassword: (arg: string) => any
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (this: UserSchema, next: any) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (
  this: UserSchema,
  password: string
) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model<UserSchema>("User", userSchema)

export default User
