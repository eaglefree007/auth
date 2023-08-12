const userController = require('../controller/userController')
const adminAuth = require('../middleware/adminAuth')
const jwtAuth = require('../middleware/jwtAuth')

const Router = require("express").Router()

Router.get("/user-list", adminAuth, userController.getUser)  // done
Router.get("/user", jwtAuth, userController.getUserById)
Router.get("/user/:id", adminAuth, userController.getUserById)
Router.post("/user", adminAuth, userController.addUser)
Router.post("/edit-user/:id", jwtAuth, userController.updateUser)
Router.post("/login", userController.loginUser)
Router.post("/register",userController.addUser)
Router.patch("/user/:id",adminAuth, userController.updateUser)
Router.delete("/user/:id", adminAuth, userController.deleteUser)

module.exports = Router