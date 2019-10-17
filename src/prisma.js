import { Prisma } from 'prisma-binding'
import {fragmentReplacements} from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'MVGqFS6fa8esqDgC',
  fragmentReplacements
})

export default prisma