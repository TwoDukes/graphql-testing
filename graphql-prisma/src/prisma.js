import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: './generated/prisma.graphql',
  endpoint: 'localhost:4466'
})