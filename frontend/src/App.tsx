import { Switch, Route } from "react-router-dom"
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  QuestionsScreen,
  AskScreen,
  QuestionDetailsScreen,
  BrowseScreen,
} from "./screens"
import { Header } from "./components"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <main>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route exact path="/questions">
            <QuestionsScreen />
          </Route>
          <Route path="/questions/:id">
            <QuestionDetailsScreen />
          </Route>
          <Route exact path="/browse">
            <BrowseScreen />
          </Route>
          <Route path="/browse/page/:page">
            <BrowseScreen />
          </Route>
          <Route path="/ask">
            <AskScreen />
          </Route>
        </Switch>
      </main>
    </QueryClientProvider>
  )
}

export default App
