const dbConfig = require('../dbConfig');
const {Sequelize, DataTypes}=require('sequelize')
const sequelize=new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password,
    {   host: dbConfig.host,
        // operatorAliases is for overwriting errors generated
        operatorAliases:false,
        dialect:dbConfig.dialect,
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }
    })
sequelize.authenticate().then(()=>{
console.log('Successfully created connection')
}).catch(err=>{
    console.log('Error encountered: '+ err)
})

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize

db.user=require('./Users')(sequelize,DataTypes)
db.sequelize.sync({force:false}).then(()=>{
    console.log('Syncing......done')
})


module.exports=db