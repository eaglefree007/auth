const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;
  // console.log(token, 5);
  if (!token) {
    return res.status(401).json({ status: 4, msg: 'Unauthorized' });
  }
  token = token.split(' ')
  if (!token.length > 0 ){
    return res.send({status: 2, msg: "invalid token"})
  }
  // console.log(typeof token, "from jwt auth backend 13");
  jwt.verify(token[1], process.env.secreatKey ,(err, user) => {
      // console.log({error: err}, user, "user jwtAUTH");
    if (err) {
      // console.log(err);
      return res.send({status: 2, msg: "invalid token"})
    } 
    // console.log(21, "jwt");
    if (!user){
      return res.send({status: 2, msg: "user not verified with token"})
    } 
    // console.log("object");
    req.body.user = user
    // console.log(req.body.user, 26)
    next()

})

  // : res.send({status: 2, msg: "user verified with token"})

  
}


// ///////////////////////////////////////////////
// if (!token) {
//     return res.send({status: 2, msg: "token not found"})
//   }
//   token = token.split(" ")
//   if (!token.length > 0){
//     res.send({status: 2, msg: "invalid token"})
//   }
//   let user = await jwt.verify(token, process.env.secreatKey)
//   if (!user){
//     return res.send({status: 2, msg: "user not varified with token"})
//   }
//   res.send({status: 2, msg: "user verified with token"})