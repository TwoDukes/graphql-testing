import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query.users(null, '{id name posts { id title }}').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{id text author {id name}}').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.createPost({
//   data: {
//     title: "Testing a second post",
//     body: "",
//     published: false,
//     author: {
//       connect:{
//         id: "ck03bw0j0006407776awncln3"
//       }
//     }
//   }
// }, '{id title body published}').then((data) => {
//   console.log(data)
//   return prisma.query.users(null, '{id name posts { id title published }}')
// }).then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

prisma.mutation.updatePost({
  where:{
    id: "ck03n1xrf06hq07774mhkqfry"
  },
  data:{
    body: "Here is the body now that the post is finished",
    published: true
  }
}).then((data) => {
  console.log(data)
  return prisma.query.posts(null, '{id title body published author {id name}}')
}).then((data) => {
  console.log(JSON.stringify(data, undefined, 2))
})