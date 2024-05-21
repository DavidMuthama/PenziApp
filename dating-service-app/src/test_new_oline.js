const user=[
    { name: 'Steve', age: 27, 
  phone_no: 768594031 },      
    { name: 'Melody', age: 21, phone_no: 734560909 }      
  ]
  let newResponseEntries
  let data = user.map(user => `${user.name}, aged ${user.age}, ${user.phone_no}`);
  newResponseEntries = { text: `${data.join('\n')}`, from: "response" };
  console.log(newResponseEntries.text)