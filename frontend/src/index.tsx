import { render } from "react-dom"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import "./bootstrap.min.css"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux"
import { Spinner } from "react-bootstrap"

const rootElement = document.getElementById("root")
render(
  <Provider store={store}>
    <PersistGate
      loading={<Spinner animation="border" role="status" />}
      persistor={persistor}
    >
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  rootElement
)
