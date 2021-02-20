import { Container, Spinner, Alert } from "react-bootstrap"
import { useParams } from "react-router"
import { useQuery } from "react-query"
import { searchQuestion } from "../utils"
import { QuestionTable, Paginate } from "../components"
import { useEffect } from "react"

export const SearchScreen = () => {
  const { page, keyword } = useParams<{ page: string; keyword: string }>()

  const {
    isFetching: questionsLoading,
    data: questionsData,
    error: questionsError,
    refetch: questionsRefetch,
  } = useQuery("searchQuestions", () => searchQuestion(keyword, page))

  useEffect(() => {
    questionsRefetch()
  }, [page, keyword, questionsRefetch])

  return (
    <Container className="mt-4">
      <h1>Results for {keyword}</h1>
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
          pageNumber={Number(page || 1)}
          pageCount={questionsData.pageCount}
          keyword={keyword}
        />
      )}
    </Container>
  )
}
