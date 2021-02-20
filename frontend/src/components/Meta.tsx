import { Helmet } from "react-helmet"

interface MetaProps {
  title?: string
  description?: string
  keywords?: string
}

export const Meta = ({
  title = "askme!",
  description = "Ask. Vote. Discuss",
  keywords = "vote, survey, discuss, talk",
}: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}
