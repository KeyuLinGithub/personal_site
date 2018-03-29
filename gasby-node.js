const path =require('path');

exports.creactePages=({boundActionCreators,graphql})=>{
  const {creactePage} = boundActionCreators;

  const postTemplate = path.resolve('src/templates/post.js');

  return graphql(`{
    allMarkdownRemark{
      edges {
        node {
          html
          id
          frontmatter {
            path
            title
          }
        }
      }
    }
  }`)
  .then(res =>{
    if(res.errors){
      return Promise.reject(res.errors)
    }
    res.data.allMarkdownRemark.edges.forEach(({node})=>{
      creactePage({
        path: node.frontmatter.path,
        components: postTemplate
      })
    })
  })
}
