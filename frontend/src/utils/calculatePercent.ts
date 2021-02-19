export const calculatePercent = (upVotes: number, downVotes: number) => {
  if (upVotes + downVotes === 0) {
    return 0
  }

  return (upVotes / (upVotes + downVotes)) * 100
}
