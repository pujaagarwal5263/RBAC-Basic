const { users } = require('./data')

authUser=(req,res,next)=>{
   
   if(req.user.id!= req.body.userID){
    return res.status(403).send("You need to login first")
   }
  //console.log("Authentication done");
   next()
}

authRole=(role)=>{
  return (req,res,next)=>{
   if(req.user.role !==role){
     res.status(401)
     return res.send("Not allowed for this role")
   }
   next();
  }
}

module.exports={authUser, authRole}