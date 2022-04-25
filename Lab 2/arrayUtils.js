//function that sorts an array
const arraySort =(array)=>{
    if(typeof(array[0])==="string"){
        let sortedArray = array.sort()
       // console.log(`sorted array is : ${sortedArray}`)
        return sortedArray
    }
    else if(Array.isArray(array[0])){
        let sortedArray=[];
        array.forEach(element=>{
            sortedArray.push(arraySort(element))
        })
        //  for(let i = 0; i < sortedArray.length; i++){
        //      console.log(sortedArray[i]);
        //    }
          
        return sortedArray
    }
    else{
    let sortedArray =array.sort(function(a, b){return a - b});
    return sortedArray
    }
  }

//isArrayEqual
const isArrayEqual =(first,second)=>{
    for (let i = 0; i < first.length; i++) {
            if (first[i] !== second[i]) {
              return false;
            }
          }
          return true;
}

//function that finds mean value of an array
const mean =(array)=>{
    if (array===undefined) throw "There are no inputs"
    else if(array.length===0) throw "array is empty"
    else if(!Array.isArray(array)) throw "The input is not in an array form, please provide an array as an input"
    else{
let sum=0;
array.forEach(element => {
    if(typeof(element)!="number") throw "input values are not number"
    sum=sum+element;
});
let meanValue= sum/array.length;
return meanValue
    }
}

// Function that given the squared value of median element
const medianSquared =(array)=>{
    let median,medianSquared=0;
    if (array===undefined) throw "There are no inputs"
    else if(array.length===0) throw "array is empty"
    else if(!Array.isArray(array)) throw "The input is not in an array form, please provide an array as an input"
    else
    {
        array.forEach(element => {if(typeof(element)!="number") throw "input values are not number"})
        let sortedArray=arraySort(array);
       // console.log(sortedArray)
        let arrayLength= sortedArray.length;
        if(arrayLength%2!==0){
            // console.log(`Array Length: ${arrayLength}`)
            // console.log(`median position is ${arrayLength/2}`)
            let medianSquaredPosition = (arrayLength/2)+0.5;
            median= array[medianSquaredPosition-1];
            medianSquared= median*median;
            return medianSquared;
        }
        else{
            let firstMedian = array[(array.length/2)-1];
            let secondMedian = array[(array.length/2)];
            let newArray=[firstMedian,secondMedian];
            median = mean(newArray);
            medianSquared= median*median;
            return medianSquared;
        }
    }
}

//Scan the array from one end to the other to find the largest element. Return both the maximum element of the array and the index (position) of this element as a new object with the array value as the object key and the array index as the object value.
const maxElement = (array) =>{

    if (array===undefined) throw "There are no inputs"
    else if(array.length===0) throw "array is empty"
    else if(!Array.isArray(array)) throw "The input is not in an array form, please provide an array as an input"
    else
    {
        array.forEach(element => {if(typeof(element)!="number") throw "input values are not number"})

        let maxElementValue=0;
        let maxElementIndex=0;
        let output= {}
        for(let i=0;i<array.length;i++)
        {   
            if(array[i]>maxElementValue)
             {
                 maxElementValue=array[i];
                 maxElementIndex=i;
                 //console.log(`largest element in array now is ${maxElementValue}`)
             }
        }
        output[maxElementValue]=maxElementIndex;
    return output;
    }
}

//Creates a new numbered array starting at 0 increasing by one up to, but not including the end argument. 
const fill = (end, value)=>{
let fillArray=[];
if (end===undefined) throw "Please enter an end value"
if (typeof(end)!=="number") throw "Please enter a number"
if (end <=0 ) throw "Invalid input. Please enter a number greater than zero"
if (value!==undefined){
    for(i=1;i<=end;i++){
        fillArray.push(value)
    }

   return fillArray;
}
else{
    for(i=0;i<end;i++){
        fillArray.push(i);
    }
    return fillArray;
}

}

//Will return an object with the count of each element that is repeating in the array.
const countRepeating = (array)=> {
    let output={}
 if (array===undefined) throw "Array does not exist, please provide an input"
 else if(!Array.isArray(array)) throw "The input is not in an array form, please provide an array as an input"
 else if(array.length===0) return output
 else{
const counts = {};    
const final={}

for (const num of array){
counts[num] = counts[num] ? counts[num] +1 : 1
}
 //console.log("array of counts: "+counts);

 for (element in counts){
  
console.log(counts[element]);
  if(counts[element]>1)
  {
    final[element]= counts[element]
  }
}
//console.log(final)

    return final;
 }
}

//Given two arrays,   check if they are equal in terms of size. Next you will sort them in ascending order and then check the elements to see if they are equal. and return a boolean. 
const isEqual=(arrayOne, arrayTwo)=>{
     if (arrayOne===undefined) throw "There are no inputs or arrays does not exist"
    else if(!Array.isArray(arrayOne)) throw "The input is not in an array form, please provide an array as an input"
     if (arrayTwo===undefined) throw "There are no inputs or arrays does not exist"
    else if(!Array.isArray(arrayTwo)) throw "The input is not in an array form, please provide an array as an input"
    else
    {
        if(arrayOne.length !==arrayTwo.length){
            return false;
        }
        else{
      let first = arraySort(arrayOne);
      let second = arraySort(arrayTwo);
    
      if(Array.isArray(first[0])){
          for(let i=0;i< first.length;i++){
              let output=isArrayEqual(first[i],second[i]);
              if(output===false){
                  return false
              } 
          }
          return true
      }

      let output = isArrayEqual(first,second)
    //   for (let i = 0; i < first.length; i++) {
    //     if (first[i] !== second[i]) {
    //       return false;
    //     }
    //   }
    //   return true
   return output
   
    }
    }
}



//
module.exports={
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};

