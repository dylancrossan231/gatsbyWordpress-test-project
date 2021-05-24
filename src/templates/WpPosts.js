import React from "react"
import {graphql,StaticQuery} from "gatsby"
const WpPost = ({
  data: {
    wpPost: { title, content, id },
  },
}) => {
  return (
    <div className={`post-${id}`}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
export const query = StaticQuery(graphql`
  query($id: String) {
    wpPost(id: { eq: $id }) {
      id
      title
      content
    }
  }
`)
export default WpPost
