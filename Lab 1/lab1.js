const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let sum=0;
    arr.forEach(element => {
        element= element*element;
        sum=sum+element;
    });
    return sum;
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    if (num<1) return 0
    else if (num === 1){
        return 1
    }
    else if(num>1){
        let fib;
        let first=0;
        let second=1;
  
        for(let i=1;i<num;i++){

            fib = first + second;
           first=second;
            second = fib;
        }
        return fib
    }
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let counter=0;
    let lowerCasesentence=text.toLowerCase();
    let arr=lowerCasesentence.split('');
   arr.forEach(letter=>{
       if(letter==="a"||letter==="e"||letter==="i"||letter==="o"||letter==="u") 
       {
        counter++;
       }
   })
return counter;
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    let factorial=1;
    if (num === 0) return 1 
    else if (num<0) return NaN
    else{
        for(let i=num;i>0;i--)
        {
            factorial = factorial * i;
        }
    }
    return factorial;
}

module.exports = {
    firstName: "Deep Deven", 
    lastName: "Manek", 
    studentId: "20009220",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};