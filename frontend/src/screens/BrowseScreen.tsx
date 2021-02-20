import { Container, Spinner, Alert } from "react-bootstrap"
import { useParams } from "react-router"
import { useQuery } from "react-query"
import { fetchQuestionsByPage } from "../utils"
import { QuestionTable, Paginate } from "../components"
import { useEffect } from "react"

export const BrowseScreen = () => {
  const { page } = useParams<{ page: string }>()

  const {
    isFetching: questionsLoading,
    data: questionsData,
    error: questionsError,
    refetch: questionsRefetch,
  } = useQuery("fetchQuestionsByPage", () => fetchQuestionsByPage(page))

  useEffect(() => {
    questionsRefetch()
  }, [page, questionsRefetch])

  return (
    <Container className="mt-4">
      <h1>Browse</h1>
      {questionsLoading && (
        <Container className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status" />
        </Container>
      )}

      {questionsError && (
        <Container className="d-flex justify-content-center my-4">
          <Alert variant="danger">{questionsError as string}</Alert>
        </Container>
      )}

      {questionsData && !questionsLoading && (
        <QuestionTable questions={questionsData.questions} />
      )}
      {questionsData && (
        <Paginate
          pageNumber={questionsData.page}
          pageCount={questionsData.pageCount}
        />
      )}
    </Container>
  )
}
