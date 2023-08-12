const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

module.exports={

  getUser: async (req, res) => {
    // console.log("get user");
    try {
      let users = await userModel.find({status: 1, role: 0})
      if (users.length > 0){
        return res.send({status: 1, msg: "success", data: users})
      } else {
        return res.send({status: 1, msg: "user not found"})
      }
    } catch (error) {
        return res.send({status: 1, msg: "somthing went wrong"})
    }
  },

  addUser: async (req, res) =>{

    const { name, email, password, contactNumber, about, address, city, state, country, zip } = req.body;
    // console.log(name, email, password, contactNumber, about, address, city, state, country, zip)
    
    try {
      let datas = {}
      !name ? res.status(200).json({status: 2, msg: "name not found"}) : datas.name = name;
      !email ? res.status(200).json({status: 2, msg: "email not found"}) : datas.emailId = email;
      !contactNumber ? res.status(200).json({status: 2, msg: "contactNumber not found"}) : datas.contactNumber = contactNumber;
      !about ? res.status(200).json({status: 2, msg: "contactNumber not found"}) : datas.about = about;
      !address ? res.status(200).json({status: 2, msg: "address not found"}) : datas.address = address;
      !city ? res.status(200).json({status: 2, msg: "address not found"}) : datas.city = city;
      !state ? res.status(200).json({status: 2, msg: "address not found"}) : datas.state = state;
      !country ? res.status(200).json({status: 2, msg: "address not found"}) : datas.country = country;
      !zip ? res.status(200).json({status: 2, msg: "address not found"}) : datas.zip = zip;
      !password ? res.status(200).json({status: 2, msg: "password not found"}) : datas.password = password;
      // function for reference check 
      isReffered = true;

      isReffered ? datas.isReffered = 0 : datas.isReffered = 1;
      datas.role = 1;
      datas.status = 1;
      datas.createdDate = new Date().valueOf();
      datas.updatedDate = new Date().valueOf();
      
      let userData = await userModel.find({"$or" : [{email}, {contactNumber}]});

      if (!userData) {
        return res.send({status: 4, msg: "user already exist with same mailId / contact"}) 
      } else { 
        const user = await userModel.create(datas)
        // console.log(user);
        user.save()
        return res.send({status: 2, msg: "user added"});
      }
    }

    catch (err) {
      // console.log(err);
        return res.status(400).json({msg: "get user not found", err: err})
    }
  },

  loginUser: async (req, res) => {
    let {email, password} = req.body;
    try {
      const user = await userModel.findOne({emailId: email})
      // console.log(user, process.env.secreatKey, 68);
      if (user){
        // console.log(user.password == password);
        if(user.password == password){
            const payload = {
              email, role: user.role
            };
            // console.log(payload);
            let token = jwt.sign(payload, process.env.secreatKey)
            // console.log(token, 95);
            if (token) {
                return res.send({status:1, msg: "success login", token, role: user.role})
            }
        }
      } else {
        return res.send({status:2, msg: "user not found"})

      }
    } catch (error) {
      // console.log(error);
        return res.send({status:1, msg: "something  went wrong (login controller)"})
    }
  },

  getUserById: async (req, res) => {
    // console.log("getUserById");
    try {
      // for edit user, we find id from frontend url else we got id from body of adminjwt from backend
      let id = req.params.id
      //  ? req.params.id :req.body.user._id 
      // console.log(id, 97); 
      let user = req.body.user; 
      let userDetail;
      // (user.role == 1)
      if(!id) {
        userDetail = await userModel.findOne({emailId: user.email}) 
        // console.log(userDetail, 104);
        return res.status(200).json({status: 1, msg: "success to login, Admin :)", data: userDetail})
      }else if (id) {
        // console.log(id, 107);
        userDetail = await userModel.findById(id) 
        // console.log(userDetail, 109);
        return res.status(200).json({status: 1, msg: `Welcome, ${userDetail.name}`, data: userDetail})
      // }
      // console.log(userDetail, "user detail 104");
      // if (userDetail.role == 1) {
      // }else if (userDetail.role == 0) {
      } else {
        return res.status(405).json({status:2, msg: "data not found :("})
      }
    } catch (error) {
      // console.log(error);
      return res.send({msg: "somthing went wrong", status: 3, error})
    }
  },

  updateUser: async (req, res) => {

    let id = req.params.id;
    const { name, contactNumber, about, address, city, state, country, zip } = req.body;
    const preUserData = await userModel.findById(id)
    // console.log(preUserData, 129); 
    try {
      let datas = {}

      !name ? preUserData.name : datas.name = name;
      // !email ? "" : datas.emailId = email;
      !contactNumber ? preUserData.contactNumber : datas.contactNumber = contactNumber;
      !about ? preUserData.about : datas.about = about;
      !address ? preUserData.address : datas.address = address;
      !city ? preUserData.city : datas.city = city;
      !state ? preUserData.state : datas.state = state;
      !country ? preUserData.country : datas.country = country;
      !zip ? preUserData.country : datas.zip = zip;
      // !password ? "" : datas.password = password;
      // function for reference check 
      datas.updatedDate = new Date().valueOf();
      // console.log("finding for update");
      // let userData = await userModel.update({ id }, {datas});
      let userData = await userModel.updateOne(preUserData, {$set: datas});
      preUserData.save()
      if (userData) {
        // userData.save()
        // console.log(userData, `140 find from model`)
        return res.send({ status: 2, message: "updated successfully", id });
      } else {
        console.log(" not update");
      }
    }
    catch (err) {
        return res.status(400).json({msg: "get user not found", err: err})
    }
  },

  deleteUser: async (req, res) => {
    let id = req.params.id;
    // console.log("delete backend")
    try {
      let user = await userModel.findOne({_id: id})
      // console.log(user);

      if (!user) {
        res.status(200).json({msg: "user not found"})
      }
      let userUpdate = await userModel.findByIdAndRemove({_id: id})
      // console.log(userUpdate, "user delete data");
      if (userUpdate) {
        return res.status(200).json({msg: "user deleted"})
      } else {
        return res.status(200).json({status:2, msg: "somthing went wrong from backend", err: err})
      }
    } catch (err) {
      // console.log(err);
      return res.status(400).json({msg: "get user not found", err: err})
    }
  }
}