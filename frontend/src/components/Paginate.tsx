import { Pagination, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

interface PaginateProps {
  pageCount: number
  pageNumber: number
  isAdmin?: boolean
  keyword?: string
}

export const Paginate = ({
  pageCount,
  pageNumber,
  isAdmin = false,
  keyword = "",
}: PaginateProps) => {
  if (pageCount === 1) {
    return null
  }

  const generateLink = (x: number) => {
    if (isAdmin) {
      return `/admin/product-list/page/${x + 1}`
    }
    if (keyword) {
      return `/search/${keyword}/page/${x + 1}`
    }
    return `/browse/page/${x + 1}`
  }

  return (
    <Container className="d-flex justify-content-center">
      <Pagination>
        {[...Array(pageCount).keys()].map((x) => (
          <LinkContainer key={x + 1} to={generateLink(x)}>
            <Pagination.Item active={x + 1 === pageNumber}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    </Container>
  )
}
