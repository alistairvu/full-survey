import { Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { calculatePercent } from "../../utils"

interface Question {
  _id: string
  question: string
  upVotes: number
  downVotes: number
}

interface QuestionTableProps {
  questions: Question[]
  deleteHandler: (id: string) => void
}

export const QuestionTable = ({
  questions,
  deleteHandler,
}: QuestionTableProps) => {
  return (
    <>
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
                <Link to={`/questions/${question._id}`}>
                  {question.question}
                </Link>
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
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(question._id)}
                >
                  <i className="fas fa-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
