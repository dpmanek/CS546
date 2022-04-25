const arrayUtils = require("./arrayUtils");
const makeArrays=(objects)=>{
    if (objects===undefined) throw "array does not exist"
    if (!Array.isArray(objects)) throw "input is not an array"
    if(objects.length === 0) throw "array cannot be empty"
    if(objects.length<2) throw "there are less than 2 objects in the array"
    objects.forEach(element=>{
        if (!typeof element === 'object') throw " input is not object"
        if (Object.keys(element).length === 0) throw " object is empty" 
    })

    let finalArray=[]
    objects.forEach(element=>{
       let tempArray =Object.entries(element)
       tempArray.forEach(element=>{
        finalArray.push(element)
       })
      
    })
return finalArray
}
const fakeMakeArrays=(objects)=>{
    if (objects===undefined) throw "array does not exist"
    if (!Array.isArray(objects)) throw "input is not an array"
    if(objects.length === 0) throw "array cannot be empty"
    //if(objects.length<2) throw "there are less than 2 objects in the array"
    objects.forEach(element=>{
        if (!typeof element === 'object') throw " input is not object"
        if (Object.keys(element).length === 0) throw " object is empty" 
    })

    let finalArray=[]
    objects.forEach(element=>{
       let tempArray =Object.entries(element)
       tempArray.forEach(element=>{
        finalArray.push(element)
       })
      
    })
return finalArray
}

//not working properly
const isDeepEqual=(obj1,obj2)=>{
     let equality = false
    if (obj1===undefined) throw "object 1 does not exist"
    if (obj2===undefined) throw "object 2 does not exist"
    if (!typeof obj1 === 'object') throw " input obj1 is not object"
    if (!typeof obj2 === 'object') throw " input obj2 is not object"
 let  firstArray= fakeMakeArrays([obj1]);
 let  secondArray= fakeMakeArrays([obj2]);
 let output = arrayUtils.isEqual(firstArray,secondArray);
 return output
//  firstArray.forEach(element =>{
//      if(secondArray.includes(element))
//      {
//          equality=true
//      }
     
//  })
//  return equality
}

const computeObject=(object, func)=>{
     object,func=0;
    return "couldnt complete this function in time"
}
module.exports={
    makeArrays,
    isDeepEqual
}