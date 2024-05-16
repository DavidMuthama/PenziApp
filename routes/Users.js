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
router.post('/messages',usercontroller.messages)
router.post('/:name/messages',usercontroller.messagesUser)
router.post('/updateDescr/:id',usercontroller.updateDescription)
// router.post('/findMatch',matchcontroller.findMatch)
router.post('/findMoreMatch',matchcontroller.findMoreMatches)
// router.post("/user/messages", async (req, res) => {
//     const userName = req.params.name;
//     if (!userName) {
//         res.status(200).send('Name parameter is missing.')
//         return 'Name parameter is missing.';
//     }

//     // Assume these functions fetch user details and messages based on the user's name
//     try {
//         const userSearching = await User.findOne({
//             attributes:["name","age","gender","county","religion","occupation","phone_no"],
//             where:{name:userName}
//         }) // Mock function to find user
//         if (!userSearching) {
//             return res.status(404).send('User not found.');
//         }

//         const searchedUser = await penzi(userSearching.name,req); // Mock function to fetch messages
//         response=`Hello ${searchedUser.name}, someone was interested in you. Their name is ${userSearching.name}`
//         res.status(200).send(response)
//         return response
//     } catch (error) {
//         res.status(500).send('Server error.');
//     }}
//     )

module.exports = router;