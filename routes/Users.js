const express=require('express');
const router=express.Router();
const usercontroller=require('../controllers/Usercontroller')
const msgcontroller=require("../controllers/msgcontroller")
const matchcontroller=require('../controllers/matchcontroller')

router.post('/addUser',usercontroller.addUser)
router.put('/updateOneUser/:id',usercontroller.updateOneUser)
router.post('/getOneUserAndAlert/:name',usercontroller.triggerSearchedUser)
router.post('/getUserDescr',usercontroller.getUserDescr)
router.get('/allUsers',usercontroller.getAllUsers)
router.get('/getUserByIdentity',usercontroller.getUserByPhoneorName)
router.delete('/deleteUser/:id',usercontroller.deleteOneUser)
router.get('/getsms',msgcontroller.getAllSms)
router.post('/sendsms',msgcontroller.sendSms)
router.post('/welcome',usercontroller.welcomeUser)
router.post('/updateDescr/:id',usercontroller.updateDescription)
// router.post('/findMatch',matchcontroller.findMatch)
router.post('/findMoreMatch',matchcontroller.findMoreMatches)

module.exports = router;