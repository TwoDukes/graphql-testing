import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'


// Demo Data

const users = [{
  id: "1",
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
  id: "4",
  title: "Good stuff",
  body: "in progress",
  published: true,
  author: 2
},{
  id: 5,
  title: "wowzer",
  body: "such good things",
  published: true,
  author: 1
},{
  id: 6,
  title: "amazeballs",
  body: "cant believe it",
  published: false,
  author: 1
}]

const comments = [{
  id: 7,
  text: "Im a good comment",
  post: 4,
  author: 1
},{
  id: 8,
  text: "Good thing to comment on",
  post: 4,
  author: 3
},{
  id: 9,
  text: "graphql is pretty neato",
  post: 6,
  author: 3
},{
  id: 10,
  text: "babingus comment",
  post: 5,
  author: 2
}]


// Type Definitions (schema)

const typeDefs = `

  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(data: CreatePostInput): Post!
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput{
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput{
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
    author: User!
  }
`

// Resolvers

const resolvers = {
  Query: {
    users(parent, args, ctx, info){
      if(!args.query) return users

      return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
      
    },
    posts(parent, args, ctx, info){
      if(!args.query) return posts

      return posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return titleMatch || bodyMatch;
      });
        
      
    },
    comments(parent, args, ctx, info){
      if(!args.query) return comments

      return comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()))
      
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
  Mutation: {
    createUser(parent, args, ctx, info){
      const emailTaken = users.some((user) => user.email === args.data.email)

      if(emailTaken) throw new Error('Email already in use')

      const user = {
        id: uuidv4(),
        ...args.data
      }

      users.push(user)

      return user
    },
    createPost(parent, args, ctx, info){
      const userExists = users.some((user) => user.id === args.data.author)

      if(!userExists) throw new Error('User not found')

      const post = {
        id: uuidv4(),
        ...args.data
      }

      posts.push(post)

      return post
    },
    createComment(parent, args, ctx, info){
      const userExists = users.some((user) => user.id === args.data.author)
      const postExists = posts.some((post) => post.id === args.data.post && post.published)

      if(!userExists) throw new Error('User not found')
      if(!postExists) throw new Error('Post not found or is not published')

      const comment = {
        id: uuidv4(),
        ...args.data
      }

      comments.push(comment)

      return comment
    }
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find((user) => user.id === parent.author)
    },
    comments(parent, args, ctx, info){
      return comments.filter((comment) => comment.post === parent.id)
    }
  },
  User: {
    posts(parent, args, ctx, info){
      return posts.filter((post) => post.author === parent.id)
    },
    comments(parent, args, ctx, info){
      return comments.filter((comment) => comment.author === parent.id)
    }
  },
  Comment: {
    author(parent, args, ctx, info){
      return users.find((user) => user.id === parent.author)
    },
    post(parent, args, ctx, info){
      return posts.find((post) => post.id === parent.post)
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