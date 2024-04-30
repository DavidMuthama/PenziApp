const db=require('../models')
const User=db.user
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const _ = require("lodash");

const findMatch=async (req,res)=>{
    incoming=req.body.message
    const words = incoming.split(/#/);
// Using the _.range() method
    let str = words.toString();
    let integers = str.match(/\d+/g);
    let range_arr = _.range(integers[0],integers[1]);
    let {count,rows}=await User.findAndCountAll({
        attributes:["name","age","phone_no"],
        where:{
        age:range_arr,
        county:words[2]
        },
        // limit:2
        distinct:User.id
    })
    // console.log(rows)
    console.log(count)
    return {rows,count}
}
const findMoreMatches=async (req, res) => {
    app.use(bodyParser.json());
    const {rows,count} = await findMatch(req, res);
    const pageSize = 3; // Number of results to send per request
    let currentIndex = parseInt(req.body.currentIndex || 0);
    
    if (currentIndex >= rows.length) {
        res.send({ message: 'No more results' });
        return;
    }
    
    // Calculate next index
    const nextIndex = currentIndex + pageSize;
    // Slice the results to return the subset
    const resultsToSend = rows.slice(currentIndex, nextIndex);
    
    // Send the current batch and the index at which the next request should start
    res.send({
        message:`We have ${count} individuals who match your choice! We will send you details of 3
    of them shortly.`,
        results: resultsToSend,
        nextIndex,
        moreResultsAvailable: nextIndex < rows.length
    });
}

module.exports={findMatch, findMoreMatches}