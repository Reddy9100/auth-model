const express = require("express")
const router = express.Router()
const{
    signUpUser,
    loginUser,
    
} = require("../controller/crudController")

/**********************************/

/*** SIGNUP API  *****************/
router.post("/newuser",signUpUser)
/*********************************/


/********LOGIN API ******************/
router.post("/login",loginUser)  
/************************************/


module.exports = router




