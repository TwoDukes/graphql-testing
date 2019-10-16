import jwt from 'jsonwebtoken'

const getUserId = (request) => {
  const header = request.request.headers.authorization;

  if(!header) throw new Error("Authentication required")

  const token = header.replace('Bearer ', '')
  const decoded = jwt.verify(token, "SuperSecretTempKey")

  return decoded.userId
}

export default getUserId;