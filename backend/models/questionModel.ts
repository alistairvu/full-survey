import mongoose from "mongoose"

export interface QuestionSchema extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId
  question: string
  upVotes: number
  downVotes: number
}

export const questionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  question: {
    type: String,
    required: true,
  },
  upVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  downVotes: {
    type: Number,
    required: true,
    default: 0,
  },
})

const Question = mongoose.model<QuestionSchema>("Question", questionSchema)

export default Question
