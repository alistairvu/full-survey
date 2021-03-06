import { Row, Col } from "react-bootstrap"
import { calculatePercent } from "../../utils"

interface QuestionResultProps {
  upVotes: number
  downVotes: number
}

export const QuestionResult = ({ upVotes, downVotes }: QuestionResultProps) => {
  return (
    <Row className="my-3">
      <Col sm={4} className="d-flex flex-column align-items-center">
        <h5 className="text-success">
          <strong>UPVOTES</strong>
        </h5>
        <h3>{upVotes}</h3>
      </Col>

      <Col sm={4} className="d-flex flex-column align-items-center">
        <h5>
          <strong>PERCENTAGE</strong>
        </h5>
        <h3>{calculatePercent(upVotes, downVotes).toFixed(2)}%</h3>
      </Col>

      <Col sm={4} className="d-flex flex-column align-items-center">
        <h5 className="text-danger">
          <strong>DOWNVOTES</strong>
        </h5>
        <h3>{downVotes}</h3>
      </Col>
    </Row>
  )
}
