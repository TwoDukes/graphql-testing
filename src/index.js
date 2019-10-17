import 'core-js'
import 'regenerator-runtime/runtime'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/scheme.graphql',
  resolvers: resolvers,
  context(request){
    return {
      db,
      pubsub,
      prisma,
      request
    }
  },
  fragmentReplacements
})

server.start({port: process.env.PORT || 4000},() => {
  console.log('server is up!')
})