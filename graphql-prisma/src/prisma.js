import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author:{
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id }')

  const user = await prisma.query.user({
    where: {id: authorId}
  }, '{ id name email posts { id title published } }')

  return user
}

// createPostForUser("ck03bpf0a00450777gf7uvdah", {
//   title: "Great books to read",
//   body: "The war of art",
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// })

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost({
    where: {id: postId},
    data: {...data}
  }, '{author {id}}')

  const user = await prisma.query.user({
    where: {id: post.author.id}
  }, '{ id name email posts { id title body published } }')

  return user 
}

// updatePostForUser("ck04l7kgu006m0777hgb1xbn5", {
//   title:"Great movies to watch",
//   body:"Interstellar"
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// })
