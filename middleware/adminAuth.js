const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  let token = req.headers.authorization

  if (!token ){
    return res.send({status: 2, msg: "token not found", role: 0}) 
  }
  token = token.split(" ")

  if(!token.length > 0 ) {
    return res.send({status: 2, msg: "invalid token"})
  }
  let user = jwt.verify(token[1], process.env.secreatKey)

  if (!user ) {
    return res.send({status: 2, msg: "user not verified with token"});
  }
  // user = JSON.parse(user)
  if (user.role ) {
    req.body.user = user;
    next()
  } else {
    return res.redirect(`/user/${user._id}`)
}
  // ? {}
  // : res.send({status: 2, msg: "user verified with token"})

  // res.send({status: 2, msg: "user not verified with token"})
}
