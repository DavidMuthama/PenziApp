const values = new Map();
const { isUndefined, toInteger, isInteger, size, range, toString ,upperFirst} = require("lodash");
const db = require("../models");
const User = db.user;
const express = require("express")
penzi = async (profile, msg) => {
    verified_no = parseInt(isIntegerAndLength(msg, 9))
    // verified_no_searcher = parseInt(isIntegerAndLength(phone_no, 9))||734560909
    // Reference string for comparison

    // Convert both strings to lowercase for case-insensitive comparison
    // inputString = inputString.toLowerCase();
    // referenceString = referenceString.toLowerCase();
    // Updating Details
     if (msg.toLowerCase().startsWith("details")) {
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
        // This was code immplementation when using latest entry
        // const latestUser = await User.findOne({
        //     attributes: ["phone_no", "name"],
        //     order: [
        //         ["createdAt", "DESC"]
        //     ],
        //     limit: 1,
        // });
        await User.update(new_dict, {
            where: {
                id:profile
            },
        });
        console.log(`Updated successfully details for ${profile}`);
        response = `This is the last stage of registration.
            SMS a brief description of yourself to 22141 starting with the word
            MYSELF.
            E.g., MYSELF#chocolate, lovely, sexy etc.`;
        return response;
    }
    // Updating description
    else if (msg.toLowerCase().startsWith("myself")) {
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
        // Found a solution for capturing user from header param
        // const latestUser = await User.findOne({
        //     attributes: ["phone_no", "name"],
        //     order: [
        //         ["createdAt", "DESC"]
        //     ],
        //     limit: 1,
        // });
        await User.update(new_dict, {
            attributes: ['name'],
            where: {
                // phone_no: latestUser.phone_no
                id:profile
            }
        })
        response = `You are now registered for dating.
        To search for a MPENZI, SMS match#age#town to 22141 and meet the
        person of your dreams.
        E.g., match#23-25#Kisumu`
        console.log(`updated description for ${profile}`)
        return response
    }

    else if (msg.toLowerCase().startsWith("describe")) {
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
    else if (msg.toLowerCase().startsWith("yes")){
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
    else if (msg.toLowerCase().startsWith("match")) {
        let matches = await findMatch(msg);  // Await the asynchronous function here
        indexTracker.data = matches;
        indexTracker.currentIndex = 2;  // Start after the first two entries

        const firstTwoEntries = matches.slice(0, 2);
        console.log("First two matches: ", firstTwoEntries);
        if(firstTwoEntries.length==0){
            return `There were no entries found. try another search`
        }
        else{return firstTwoEntries;}
    }
    else if(msg.toLowerCase()=="next"){
        if (indexTracker.currentIndex >= indexTracker.data.length) {
            return `There is no more data to show`;  // No more data to show
        }
        let nextEntries = indexTracker.data.slice(indexTracker.currentIndex, indexTracker.currentIndex + 2);
        indexTracker.currentIndex += 2;   
        console.log("Next matches: ", nextEntries);
        return nextEntries;
    }
    else if (isInteger(verified_no)==true) {
            let getUsers = await User.findOne({
                attributes: [
                    "id",
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
            console.log("This is the profile name",profile)
            details_searcher=await User.findOne({
                attributes:["name","age","gender","occupation","county","area","phone_no"],
                where:{
                    id:profile
                }
            })

            response_2=`Hello ${getUsers.name}, a person was interested in you and looked u up. Their name was ${details_searcher.name} and their phone number is ${details_searcher.phone_no}.
             Please record for future use. If u wish to know more about them send YES#phone number`
             response={message:response_1,alert:response_2,name:getUsers.name,user_searching:details_searcher.name, user_searched:getUsers.id}
            return response

        }


    else if (isInteger(verified_no) == false) {
        return `sorry, your input number either doesn't correspond to a user or is of invalid length.
        please try again`;
    }}

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
            county: upperFirst(words[2])
        },
        distinct: true
    });
    // Return the rows directly
    return rows;
}
function isIntegerAndLength(num, length) {
    let numStr = toString(num);
    
    if (numStr.length > length) {
        new_numStr = numStr.replace("0", "")
        return new_numStr
    }
    // Check if the length of the string is equal to the desired length
    if (numStr.length === length) {
        // Check if the string is a whole number (contains only digits and no decimal places)
        return numStr
    }
    else {
        return `The input number is either short or long. pls check and try again`
    }
}

module.exports = penzi;