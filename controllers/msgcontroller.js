const db=require('../models')
const axios=require("axios")
apiSecret = "00d3be552b74159e9a913259fc02863cf436c2f1"
const msg=db.msg
const getAllSms=(req,res)=>axios.get("https://www.cloud.smschef.com/api/get/sms.sent", {
    params: {
        secret: apiSecret
    }
}).then(response => {
    // Handle the response data
    console.log(response.data);
    res.status(200).send(response.data)
}).catch(error => {
    // Handle any errors
    console.error(error);
});
params={
    "secret": apiSecret,
    "mode": "devices",
    "phone": "+254729741134",
    "message": "test if bugged",
    "sim":1
}
const sendSms=(req,res)=>axios.post("https://www.cloud.smschef.com/api/send/sms",params=params

).then(response => {
    // Handle the response data
    console.log(response.status);
    // res.status(200).send("Data sent successfully")
    res.status(response.status).json(response.data)
}).catch(error => {
    // Handle any errors
    console.error(error);
});

module.exports={
    getAllSms,
    sendSms
}