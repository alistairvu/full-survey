import { Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useState } from "react"

export const SearchBox = () => {
  const [keyword, setKeyword] = useState<string>("")
  const history = useHistory()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/browse")
    }
  }

  return (
    <Form onSubmit={submitHandler} className="ml-sm-5 row px-3 d-flex" inline>
      <Form.Control
        type="text"
        name="query"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search..."
        className="mr-sm-2 "
      />
      <Button variant="light" type="submit">
        <i className="fas fa-search"></i> Search
      </Button>
    </Form>
  )
}
