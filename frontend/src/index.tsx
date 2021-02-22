import { render } from "react-dom"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import "./bootstrap.min.css"

const rootElement = document.getElementById("root")
render(
  <Router>
    <App />
  </Router>,
  rootElement
)
