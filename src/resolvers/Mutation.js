import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  // USERS //////////////////////////////////////////////////////////////////////////
  async createUser(parent, args, { prisma }, info){

    const password = await hashPassword(args.data.password)

    const user = await prisma.mutation.createUser({
       data: {
         ...args.data,
         password
       }
      })

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async login(parent, args, {prisma}, info){
    const user = await prisma.query.user({
      where:{email:args.data.email}
    })

    if(!user) throw new Error("No user")

    const isMatch = await bcrypt.compare(args.data.password ,user.password);

    if(!isMatch) throw new Error("Unable to login")


    return {
      user,
      token: generateToken(user.id)
    }

  },
  async deleteUser(parent, args, { prisma, request }, info){
    const userId = getUserId(request)

    return prisma.mutation.deleteUser({where:{id:userId}}, info)
  },
  async updateUser(parent, args, { prisma, request }, info){

    const userId = getUserId(request)

    if(typeof args.data.password === 'string'){
      args.data.password = await hashPassword(args.data.password)
    }

    return prisma.mutation.updateUser({
      data:args.data,
      where:{id: userId}
    }, info)
  },

  // POSTS //////////////////////////////////////////////////////////////////////////
  createPost(parent, args, { prisma, request }, info){

    const userId = getUserId(request)

    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: userId
          }
        }
      }
    }, info)
  },
  async deletePost(parent, args, { prisma, request }, info){
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id:args.id,
      author:{
        id: userId
      }
    })

    if(!postExists) throw new Error("Unable to Delete post")

    return prisma.mutation.deletePost({where:{id:args.id}}, info)
  },
  async updatePost(parent, args, { prisma, request }, info){
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id:args.id,
      author:{
        id: userId
      }
    })

    const isPublished = await prisma.exists.Post({id: args.id, published: true})

    if(!postExists) throw new Error("Unable to Update post")

    if(isPublished && args.data.published == false){
      prisma.mutation.deleteManyComments({where:{post:{id:args.id}}})
    }

    return prisma.mutation.updatePost({
      data:args.data,
      where:{id: args.id}
    }, info)

  },

  // COMMENTS //////////////////////////////////////////////////////////////////////////
  async createComment(parent, args, { prisma, request }, info){

    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true
    })

    if(!postExists) throw new Error("Cannnot add comment to unpublished post")

    return prisma.mutation.createComment({
      data:{
        text: args.data.text,
        author:{
          connect:{
            id: userId
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
  async deleteComment(parent, args, { prisma }, info){

    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id:args.id,
      author:{
        id: userId
      }
    })

    if(!commentExists) throw new Error("Unable to Delete Comment")

    return prisma.mutation.deleteComment({where:{id:args.id}}, info)
  },
  async updateComment(parent, args, { prisma, request }, info){

    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id:args.id,
      author:{
        id: userId
      }
    })

    if(!commentExists) throw new Error("Unable to Update Comment")

    return prisma.mutation.updateComment({
      where:{id:args.id},
      data:args.data
    }, info)
  }
}

export default Mutation