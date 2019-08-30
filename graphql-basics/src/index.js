import { GraphQLServer } from 'graphql-yoga'


// Demo Data

const users = [{
  id: 1,
  name: "Dustin",
  email: "Dustin@AurigonTech.com",
  age: 22
},{
  id: 2,
  name: "Sarah",
  email: "Sarah@example.com",
},{
  id: 3,
  name: "Mike",
  email: "Mike@example.com",
  age: 27
}]

const posts = [{
  id: 1,
  title: "Good stuff",
  body: "in progress",
  published: false,
  author: 2
},{
  id: 2,
  title: "wowzer",
  body: "such good things",
  published: true,
  author: 1
},{
  id: 3,
  title: "amazeballs",
  body: "cant believe it",
  published: true,
  author: 1
}]


// Type Definitions (schema)

const typeDefs = `

  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }
`

// Resolvers

const resolvers = {
  Query: {
    users(parent, args, ctx, info){
      if(!args.query) return users

      return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()));
      
    },
    posts(parent, args, ctx, info){
      if(!args.query) return posts

      return posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return titleMatch || bodyMatch;
      });
        
      
    },
    me(){
      return {
        id: '123098',
        name: 'Dustin',
        email: 'dustin@example.com',
        age: 22
      }
    },
    post(){
      return {
        id: "123abc",
        title: "Test Title",
        body: "This is a test body",
        published: false
      }
    }
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find((user) => user.id === parent.author)
    }
  }

}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('server is up!')
})