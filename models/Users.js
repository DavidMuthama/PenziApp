module.exports=(sequelize,DataTypes)=>{
    const UserData=sequelize.define('User',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type:DataTypes.STRING,
            allowNull:false
                },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        area:{
            type:DataTypes.STRING,
            allowNull:true,
            default:"Nairobi"
        },
        phone_no:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        county:{
            type:DataTypes.STRING,
            allowNull:false,
            default:"Nairobi"
        },
        educationlevel:{
            type:DataTypes.STRING,
            allowNull:true
        },
        religion:{
            type:DataTypes.STRING,
            allowNull:true
        },
        maritalstatus:{
            type:DataTypes.STRING,
            allowNull:true
        },
        occupation:{
            type:DataTypes.STRING,
            allowNull:true
        }
    })
    return UserData
}