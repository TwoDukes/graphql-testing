const Query = {
  users(parent, args, { db }, info){
    if(!args.query) return db.users

    return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
    
  },
  posts(parent, args, { db }, info){
    if(!args.query) return db.posts

    return db.posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
      const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
      return titleMatch || bodyMatch;
    });
      
    
  },
  comments(parent, args, { db }, info){
    if(!args.query) return db.comments

    return db.comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()))
    
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
}

export default Query