import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
  return jwt.sign({userId}, 'SuperSecretTempKey')
}

export default generateToken;