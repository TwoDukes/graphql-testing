import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {

  const userExists = await prisma.exists.User({id: authorId})

  if(!userExists) throw new Error(`User does not exist with id: '${authorId}'`)

  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author:{
        connect: {
          id: authorId
        }
      }
    }
  }, '{ author { id name email posts { id title body published } } }')

  return post.author
}

// createPostForUser("ck03bpf0a00450777gf7uvdah", {
//   title: "Great stuff",
//   body: "Some other good stuff",
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//   console.log(error.message)
// })

const updatePostForUser = async (postId, data) => {

  const postExists = await prisma.exists.Post({id: postId})

  if(!postExists) throw new Error(`Post does not exist with id: '${postId}'`)

  const post = await prisma.mutation.updatePost({
    where: {id: postId},
    data: {...data}
  }, '{ author { id name email posts { id title body published } } }')

  return post.author 
}

// updatePostForUser("ck04l7kgu006m0777hgb1xbn5", {
//   title:"Great movies to watch",
//   body:"Interstellar, The Dark Knight"
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//   console.log(error.message)
// })
