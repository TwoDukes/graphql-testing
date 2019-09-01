const users = [{
  id: "1",
  name: "Dustin",
  email: "Dustin@AurigonTech.com",
  age: 22
},{
  id: "2",
  name: "Sarah",
  email: "Sarah@example.com",
},{
  id: "3",
  name: "Mike",
  email: "Mike@example.com",
  age: 27
}]

const posts = [{
  id: "4",
  title: "Good stuff",
  body: "in progress",
  published: false,
  author: "2"
},{
  id: "5",
  title: "wowzer",
  body: "such good things",
  published: true,
  author: "1"
},{
  id: "6",
  title: "amazeballs",
  body: "cant believe it",
  published: true,
  author: "1"
}]

const comments = [{
  id: "7",
  text: "Im a good comment",
  post: "4",
  author: "1"
},{
  id: "8",
  text: "Good thing to comment on",
  post: "4",
  author: "3"
},{
  id: "9",
  text: "graphql is pretty neato",
  post: "6",
  author: "3"
},{
  id: "10",
  text: "babingus comment",
  post: "5",
  author: "2"
}]

const db = {
  users,
  posts,
  comments
}

export default db