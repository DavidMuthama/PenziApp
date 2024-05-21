const db = require("../models");
const User = db.user;
const values=new Map()

penziUserWelcome=async(profile,msg)=>{
    if (msg.toLowerCase().startsWith("penzi")) {
        response = `Welcome to our dating service with 6000 potential dating partners!
        To register SMS start#name#age#gender#county#town to 22141
         E.g., start#John Doe#26#Male#Nakuru#Naivasha`;
        return response;
    }
    // Adding User
    else if (msg.toLowerCase().startsWith("start")) {
        // const words = msg.split(/#/);
        const addUser=async()=>{
        const new_words = msg.split(/#/);
        // create template dict
        let info = {
            desc_key: new_words[0],
            name: new_words[1],
            age: new_words[2],
            gender: new_words[3],
            area: new_words[4],
            phone_no: new_words[5],
            county: new_words[6],
            description: new_words[7],
            educationLevel: new_words[8],
            maritalstatus: new_words[9],
            religion: new_words[10],
            occupation: new_words[11],
        };
        // Create a map for mapping previous dict keys to incoming new values
        new_list = Object.keys(info);
        new_list.forEach((num1, index) => {
            const num2 = new_words[index];
            values.set(num1, num2);
        });
        //   Converting map to object
        new_dict = Object.fromEntries(values.entries());
        // console.log(new_dict["name"])
        findUserExists=await User.findOne({
            raw:true,
            where:{
                name:new_dict["name"]
            }
        })
        return findUserExists
    }
        const findUser=await addUser()
        // cut code here and make function return everything up
        if(findUser){
            // response=`You were registered for dating with your initial details ${findUser.name}.
            // To search for a MPENZI, SMS match#age#town to 22141 and meet the
            // person of your dreams.
            // E.g., match#23-25#Nairobi`
            // // console.log(response)
            // return response
            if(findUser.educationlevel===null||findUser.description===null){
                const redirectUrl = {name:encodeURIComponent(findUser.name),message:`You had created your profile earlier ${findUser.name} but you did not finish updating your details. SMS
            details#levelOfEducation#profession#maritalStatus#religion#ethnicity to
            22141.
            E.g. details#diploma#driver#single#christian#mijikenda`};
            return redirectUrl
        }else{
            const redirectUrl = {name:encodeURIComponent(findUser.name),message:`Welcome back ${findUser.name}. To search for a MPENZI, SMS match#age#town to 22141 and meet the
            person of your dreams.
            E.g., match#23-25#Nairobi`}
            return redirectUrl
        }
        }
        else{
            const new_user = await User.create(new_dict);
            // console.log(new_user);
            const redirectUrl = {name:encodeURIComponent(new_user.name),message:`Your profile has been created successfully.
            SMS
            details#levelOfEducation#profession#maritalStatus#religion#ethnicity to
            22141.
            E.g. details#diploma#driver#single#christian#mijikenda`};
            return redirectUrl
        }
    }
}
module.exports = penziUserWelcome;