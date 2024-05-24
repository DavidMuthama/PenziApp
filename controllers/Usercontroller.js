const db=require('../models')
const User=db.user
const values=new Map()

const welcomeUser=async function(req,res){
    input=(req.body.message)
    if (input=="PENZI"){
        res.status(200).send(`Welcome to our dating service with 6000 potential dating partners!
                                To register SMS start#name#age#gender#county#town to 22141
                                 E.g., John Doe#26#Male#Nakuru#Naivasha`)
    }
}


const addUser=async (req,res)=>{
    // taking input and delimiting
    incoming=req.body.message
    const words = incoming.split(/#/);
    // create template dict
    let info={
        desc_key:req.body.desc_key,
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        area:req.body.area,
        phone_no:req.body.phone_no,
        county:req.body.county,
        description:req.body.description,
        educationLevel:req.body.educationlevel,
        maritalstatus:req.body.maritalstatus,
        religion:req.body.religion,
        occupation:req.body.occupation,
    }
// Create a map for mapping previous dict keys to incoming new values
    new_list=Object.keys(info)
      new_list.forEach((num1, index) => {
        const num2 = words[index];
        values.set(num1,num2)
      });
//   Converting map to object
new_dict=Object.fromEntries(values.entries())
// console.log(new_dict)
const new_user=await User.create(new_dict)
res.status(200).send(`Your profile has been created successfully ${new_dict.name}.
SMS levelOfEducation#profession#maritalStatus#religion`)
// console.log(new_user)
}


const updateOneUser=async(req,res)=>{
    incoming=req.body.message
    const words = incoming.split(/#/);
    let info={
        educationlevel:req.body.educationlevel,
        religion:req.body.religion,
        maritalstatus:req.body.maritalstatus,
        occupation:req.body.occupation
    }
    new_list=Object.keys(info)
      new_list.forEach((num1, index) => {
        const num2 = words[index];
        values.set(num1,num2)
      });
    //   Converting map to object
    new_dict=Object.fromEntries(values.entries())
    console.log(new_dict)
    let id=req.params.id
    let updateUsers=await User.update(new_dict,{
        where:{id:id}
    })
    res.status(200).send(`This is the last stage of registration.
    SMS a brief description of yourself to 22141 starting with the word
    MYSELF.
    E.g., MYSELF#chocolate, lovely, sexy etc.`)
    console.log(`Updated successfully: output is ${updateUsers}`)
}

const updateDescription=async(req,res)=>{
    incoming=req.body.message
    const words = incoming.split(/#/);
    let info={
        descr_key:req.body.descr_key,
        description:req.body.description
    }
    new_list=Object.keys(info)
      new_list.forEach((num1, index) => {
        const num2 = words[index];
        values.set(num1,num2)
      });
    //   Converting map to object
    new_dict=Object.fromEntries(values.entries())
    console.log(new_dict)
    let id=req.params.id
    let updateUsers=await User.update(new_dict,{
        attributes:['name'],
        where:{id:id}
    })
    res.status(200).send(`You are now registered for dating.
    To search for a MPENZI, SMS match#age#town to 22141 and meet the
    person of your dreams.
    E.g., match#23-25#Kisumu`)
    console.log(updateUsers)
}


const getAllUsers=async(req,res)=>{
    let getUsers=await User.findAll({
        attributes:[
            'name',
            'age',
            'gender',
            'description',
            'area',
            'phone_no',
            'county'
        ]
    })
    res.status(200).send(getUsers)
}

const getOneUser=async(req,res)=>{
    let identity=req.body.phone_no||req.body.message
    if (identity==req.body.phone_no){
        let getUsers=await User.findOne({
            attributes:["name","age","gender","county","religion","occupation"],
            where:{phone_no:identity}
        })
        return getUsers
    }
    else if (identity=req.body.message){
    const words = identity.split(/#/);
    let info={
        descr_key:req.body.descr_key,
        name:req.body.name
    }

    new_list=Object.keys(info)
      new_list.forEach((num1, index) => {
        const num2 = words[index];
        values.set(num1,num2)
      });
    //   Converting map to object
    new_dict=Object.fromEntries(values.entries())
    let getUsers=await User.findOne({
        new_dict,
        attributes:["name","age","gender","county","religion","occupation"],
        where:{name:words[1]}
    })
    return getUsers
    }
    // res.status(200).send(getUsers)
}

const getUserByPhoneorName=async(req,res)=>{
    getSearched=await getOneUser(req,res)
    res.send(`${getSearched.name}, age: ${getSearched.age}, county: ${getSearched.county}, religion: ${getSearched.religion}`)
}
const triggerSearchedUser=async (req,res)=>{
    incoming_client=req.params["name"]
    const searched=await getOneUser(req,res)
    let getSender=await User.findOne({
        attributes:["name","age","county"],
        where:{name:incoming_client}
    })
    res.send(`Hi ${searched.name}. A man named ${getSender.name} is interested in you and requested your
    details.He is aged ${getSender.age} and based in ${getSender.county}`)
    return getSender
}

const getUserDescr=async(req,res)=>{
    incoming=req.body.phone_no
    const words = incoming.split(/#/);
    let info={
        describe_key:req.body.describe_key,
        description:req.body.description,
    }
    new_list=Object.keys(info)
      new_list.forEach((num1, index) => {
        const num2 = words[index];
        values.set(num1,num2)
      });
    new_dict=Object.fromEntries(values.entries())
    console.log(new_dict)
    let getUsers=await User.findOne({
        new_dict,
        attributes:['Description'],
        where:{phone_no:words[1]}
    })
    res.status(200).send(getUsers)
}


const deleteOneUser=async(req,res)=>{
    let id=req.params.id
    await User.destroy({
        where: {id:id}
    })
    res.status(200).send(`Destroy Destroy.The user has been destroyed`)
}
const penziUserWelcome=require('./penziUserWelcome')
const messages =async (req,res)=>{
    phone_no=req.body.phone_no
    message=req.body.message
    penzi_response=await penziUserWelcome(phone_no,message)
    // res.send(penzi_response)
    res.send(penzi_response)
    // console.log(penzi_response)
}
const penzi =require('./penzi')
const messagesUser=async (req,res)=>{
    phone_noById=(req.body.id)
    // .replace("%2520"," ").replace("%20"," ")=> to be added if looking with Name/string
    message=req.body.message
    penzi_response=await penzi(phone_noById,message)
    res.send(penzi_response)
    // console.log(penzi_response)
}
module.exports={
    updateOneUser,
    deleteOneUser,
    getAllUsers,
    triggerSearchedUser,
    welcomeUser,
    addUser,
    updateDescription,
    getUserDescr,
    getUserByPhoneorName,
    messagesUser,
    messages
}