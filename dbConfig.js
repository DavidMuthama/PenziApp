module.exports={
    host:'localhost',
    user:'root',
    password:'Dave12!@',
    dialect:'mysql',
    db:'penziapp',
    pool:{
        max: 5,
        min:0,
        acquire:300,
        idle:100
    }
}