import { useState } from "react"
import axios from "axios"
import useUserInfo from "../zustand/useUserInfo"

export const useVote = () => {
  const [voting, setVoting] = useState<boolean>(false)
  const [voted, setVoted] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const token = useUserInfo((state) => state.userInfo.token)

  const createVote = async (id: string, vote: "UP" | "DOWN") => {
    try {
      setVoting(true)
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

  return { createVote, voting, voted, error, setVoted }
}
