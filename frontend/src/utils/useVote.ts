import { useState } from "react"
import axios from "axios"

export const useVote = () => {
  const [voting, setVoting] = useState<boolean>(false)
  const [voted, setVoted] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const createVote = async (token: string, id: string, vote: "UP" | "DOWN") => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.post(`/api/questions/vote`, { id, vote }, config)
      setVoted(true)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message as string)
      throw new Error(err.response.data.message)
    } finally {
      setVoting(false)
    }
  }

  return { createVote, voting, voted, error, setVoting, setVoted }
}
