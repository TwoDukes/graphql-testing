import uuidv4 from 'uuid/v4'

const Mutation = {
  // USERS //////////////////////////////////////////////////////////////////////////
  createUser(parent, args, { prisma }, info){
    return prisma.mutation.createUser({ data: args.data }, info)
  },
  deleteUser(parent, args, { prisma }, info){
    return prisma.mutation.deleteUser({where:{id:args.id}}, info)
  },
  updateUser(parent, args, { prisma }, info){

    return prisma.mutation.updateUser({
      data:args.data,
      where:{id: args.id}
    }, info)
  },

  // POSTS //////////////////////////////////////////////////////////////////////////
  createPost(parent, args, { prisma }, info){
    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
  },
  deletePost(parent, args, { prisma }, info){
    return prisma.mutation.deletePost({where:{id:args.id}}, info)
  },
  updatePost(parent, args, { prisma }, info){
    return prisma.mutation.updatePost({
      data:args.data,
      where:{id: args.id}
    }, info)

  },

  // COMMENTS //////////////////////////////////////////////////////////////////////////
  createComment(parent, args, { prisma }, info){
    return prisma.mutation.createComment({
      data:{
        text: args.data.text,
        author:{
          connect:{
            id: args.data.author
          }       
        },
        post:{
          connect:{
            id: args.data.post
          }
        }
      }
    }, info)
  },
  deleteComment(parent, args, { prisma }, info){
    return prisma.mutation.deleteComment({where:{id:args.id}}, info)
  },
  updateComment(parent, args, { prisma }, info){
    return prisma.mutation.updateComment({
      where:{id:args.id},
      data:args.data
    }, info)
  }
}

export default Mutation