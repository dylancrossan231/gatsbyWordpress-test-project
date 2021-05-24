exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allWpPost {
        nodes {
          id
          uri
        }
      }
    }
  `)
  if (result.errors) {
    reporter.error("There was an error fetching posts", result.errors)
  }

  const { allWpPost } = result.data
  console.log(result.data)
  // Define the template to use
  const template = require.resolve(`./src/templates/WpPosts.js`)

  if (allWpPost.nodes.length) {
    allWpPost.nodes.map(post => {
      actions.createPage({
        path: post.id,
        component: template,
        context: post,
      })
    })
  }
}
