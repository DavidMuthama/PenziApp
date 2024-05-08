const values = new Map();
const { isUndefined, toInteger, isInteger, size, range } = require("lodash");
const db = require("../models");
const User = db.user;
const express = require("express")
const app = express()
const bodyParser = require('body-parser');
penzi = async (profile, msg) => {
    let inputString = msg;

    // Reference string for comparison
    let referenceString = "PENZI";

    // Convert both strings to lowercase for case-insensitive comparison
    // inputString = inputString.toLowerCase();
    // referenceString = referenceString.toLowerCase();
    if (msg.startsWith("penzi")) {
        response = `Welcome to our dating service with 6000 potential dating partners!
        To register SMS start#name#age#gender#county#town to 22141
         E.g., start#John Doe#26#Male#Nakuru#Naivasha`;
        return response;
    }
    // Adding User
    else if (msg.startsWith("start")) {
        // const words = msg.split(/#/);
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
            where:{
                name:new_dict["name"]
            }
        })
        if(findUserExists){
            response=`You were registered for dating with your initial details.
            To search for a MPENZI, SMS match#age#town to 22141 and meet the
            person of your dreams.
            E.g., match#23-25#Nairobi`
            return response
        }
        else{
            const new_user = await User.create(new_dict);
            console.log(new_user);
            response = `Your profile has been created successfully.
            SMS levelOfEducation#profession#maritalStatus#religion`;
            return response;
        }
    }
    // Updating Details
    else if (msg.startsWith("details")) {
        const words = msg.split(/#/);
        let info = {
            details_key: words[0],
            educationlevel: words[1],
            religion: words[2],
            maritalstatus: words[3],
            occupation: words[4],
        };
        new_list = Object.keys(info);
        new_list.forEach((num1, index) => {
            const num2 = words[index];
            values.set(num1, num2);
        });
        //   Converting map to object
        new_dict = Object.fromEntries(values.entries());
        console.log(new_dict);
        const latestUser = await User.findOne({
            attributes: ["phone_no", "name"],
            order: [
                ["createdAt", "DESC"]
            ],
            limit: 1,
        });
        await User.update(new_dict, {
            where: {
                phone_no: latestUser.phone_no
            },
        });
        console.log(`Updated successfully details for ${latestUser.name}`);
        response = `This is the last stage of registration.
            SMS a brief description of yourself to 22141 starting with the word
            MYSELF.
            E.g., MYSELF#chocolate, lovely, sexy etc.`;
        return response;
    }
    // Updating description
    else if (msg.startsWith("myself")) {
        const words = msg.split(/#/);
        let info = {
            descr_key: words[0],
            description: words[1]
        }
        new_list = Object.keys(info)
        new_list.forEach((num1, index) => {
            const num2 = words[index];
            values.set(num1, num2)
        });
        //   Converting map to object
        new_dict = Object.fromEntries(values.entries())
        // console.log(new_dict)
        const latestUser = await User.findOne({
            attributes: ["phone_no", "name"],
            order: [
                ["createdAt", "DESC"]
            ],
            limit: 1,
        });
        let updateUsers = await User.update(new_dict, {
            attributes: ['name'],
            where: {
                phone_no: latestUser.phone_no
            }
        })
        response = `You are now registered for dating.
        To search for a MPENZI, SMS match#age#town to 22141 and meet the
        person of your dreams.
        E.g., match#23-25#Kisumu`
        console.log(`updated final details for ${latestUser.name}`)
        return response
    }

    else if (msg.startsWith("describe")) {
        incoming = msg
        const words = incoming.split(/#/);
        new_descr = words[1]
        new_no = isIntegerAndLength(new_descr, 9)
        let info = {
            describe_key: words[0],
            description: new_no,
        }
        new_list = Object.keys(info)
        new_list.forEach((num1, index) => {
            const num2 = words[index];
            values.set(num1, num2)
        });
        new_dict = Object.fromEntries(values.entries())
        console.log(new_dict)
        let getUsers = await User.findOne({
            new_dict,
            attributes: ['description'],
            where: { phone_no: new_no }
        })
        response = `${getUsers.description}`
        // console.log(getUsers.description)
        return response
    }
    else if (msg.startsWith("yes")){
        incoming = msg
        const words = incoming.split(/#/);
        new_descr = words[1]
        new_no = isIntegerAndLength(new_descr, 9)
        let info = {
            describe_key: words[0],
            description: new_no,
        }
        new_list = Object.keys(info)
        new_list.forEach((num1, index) => {
            const num2 = words[index];
            values.set(num1, num2)
        });
        new_dict = Object.fromEntries(values.entries())
        console.log(new_dict)
        let getUsers = await User.findOne({
            new_dict,
            attributes: ["name",
            "age",
            "gender",
            "county",
            "area",
            "occupation",
            "religion",
            "educationlevel",'description'],
            where: { phone_no: new_no }
        })
        response = `${getUsers.name}, aged ${getUsers.age}, ${getUsers.county} County, ${getUsers.area} town, ${getUsers.educationlevel},
        ${getUsers.occupation}, ${getUsers.religion}. To get more details send DESCRIBE 7***`
        // console.log(getUsers.description)
        return response
    }
    else if (msg.startsWith("match")) {
        let matches = await findMatch(msg);  // Await the asynchronous function here
        indexTracker.data = matches;
        indexTracker.currentIndex = 2;  // Start after the first two entries

        const firstTwoEntries = matches.slice(0, 2);
        console.log("First two matches: ", firstTwoEntries);
        return firstTwoEntries;
    }
    else if(msg=="next"){
        if (indexTracker.currentIndex >= indexTracker.data.length) {
            return [];  // No more data to show
        }
        let nextEntries = indexTracker.data.slice(indexTracker.currentIndex, indexTracker.currentIndex + 2);
        indexTracker.currentIndex += 2;   
        console.log("Next matches: ", nextEntries);
        return nextEntries;
    }
    verified_no = parseInt(isIntegerAndLength(msg, 9))
    verified_no_searcher = parseInt(isIntegerAndLength(phone_no, 9))
    if ((verified_no)) {
            let getUsers = await User.findOne({
                attributes: [
                    "name",
                    "age",
                    "gender",
                    "county",
                    "area",
                    "occupation",
                    "religion",
                    "educationlevel",
                ],
                where: {
                    phone_no: verified_no
                },
            });
            response_1= `${getUsers.name}, aged ${getUsers.age}, ${getUsers.county} County, ${getUsers.area} town, ${getUsers.educationlevel},
            ${getUsers.occupation}, ${getUsers.religion}. To get more details send DESCRIBE 7***`;

            details_searcher=await User.findOne({
                attributes:["name","age","gender","occupation","county","area","phone_no"],
                where:{
                    phone_no:verified_no_searcher
                }
            })

            response_2=`Hello ${getUsers.name}, a person was interested in you and looked u up. Their name was ${details_searcher.name} and their
                        phone number is ${details_searcher.phone_no}. Please record for future use. If u wish to know more about them
                        send YES#phone number`
            return response_1+"\n"+"\n"+response_2

        }


    else if (isInteger(verified_no) == false) {
        return `sorry, your input number either doesn't correspond to a user or is of invalid length.
        please try again`;
    }
}
let indexTracker = {
    currentIndex: 0,
    data: []
};


const findMatch=async function(req){
    incoming = req
    const words = incoming.split(/#/);
    // Using the _.range() method
    let str = words.toString();
    let integers = str.match(/\d+/g);
    let range_arr = range(integers[0], integers[1]);
    let rows = await User.findAll({
        raw: true,
        attributes: ["name", "age", "phone_no"],
        where: {
            age: range_arr,
            county: words[2]
        },
        distinct: true
    });
    // Return the rows directly
    return rows;
}
function isIntegerAndLength(num, length) {
    let numStr = num.toString();
    new_numStr = numStr.replace("0", "")
    // Check if the length of the string is equal to the desired length
    if (new_numStr.length === length) {
        // Check if the string is a whole number (contains only digits and no decimal places)
        if (numStr.replace("-", "").match(/^\d+$/)) {
            return numStr;
        } else {
            return false;
        }
    }
    else {
        return `The input number is either short or long. pls check and try again`
    }
}

module.exports = penzi;