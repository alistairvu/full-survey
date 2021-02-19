import { Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

interface Question {
  _id: string
  question: string
  upVotes: number
  downVotes: number
}

interface QuestionTableProps {
  questions: Question[]
}

export const QuestionTable = ({ questions }: QuestionTableProps) => {
  const calculatePercent = (upVotes: number, downVotes: number) => {
    if (upVotes + downVotes === 0) {
      return 0
    }

    return (upVotes / (upVotes + downVotes)) * 100
  }

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>QUESTION</th>
          <th>UP</th>
          <th>DOWN</th>
          <th>PERCENT</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question._id}>
            <td>
              <Link to={`/questions/${question._id}`}>{question.question}</Link>
            </td>
            <td>{question.upVotes}</td>
            <td>{question.downVotes}</td>
            <td>
              {calculatePercent(question.upVotes, question.downVotes).toFixed(
                2
              )}
              %
            </td>
            <td>
              <Button variant="danger" className="btn-sm">
                <i className="fas fa-trash" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
