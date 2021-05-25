
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allWpPage {
        nodes {
          id
          uri
          title
        }
      }

      allWpPost {
        nodes {
          id
          uri
          title
        }
      }
    }
  `)
  if (result.errors) {
    reporter.error("There was an error fetching posts", result.errors)
  }

  const { allWpPost } = result.data
  const { allWpPage } = result.data
  console.log(result.data)
  // Define the template to use
  const postTemplate = require.resolve(`./src/templates/WpPosts.js`)
    const pageTemplate = require.resolve(`./src/templates/WpPages.js`)


  if (allWpPost.nodes.length) {
    allWpPost.nodes.map(post => {
      actions.createPage({
        path: post.id,
        component: postTemplate,
        context: post,
      })
    })
  }

  if (allWpPage.nodes.length) {
    allWpPage.nodes.map(page => {
      actions.createPage({
        path: page.id,
        component: pageTemplate,
        context: page,
      })
    })
  }
}




