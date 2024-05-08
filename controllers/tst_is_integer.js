function isIntegerAndLength(num, length) {
    let numStr = num.toString();

    // Check if the length of the string is equal to the desired length
    if (numStr.length === length) {
        // Check if the string is a whole number (contains only digits and no decimal places)
        if (numStr.replace("-", "").match(/^\d+$/)) {
            return numStr;
        } else {
            return false;
        }
    }else if(numStr.length>length){
        new_numStr=numStr.replace("0", "")
        return new_numStr;
    }
     else {
        return `The input number is short`
    }
}
console.log(isIntegerAndLength(0,9))