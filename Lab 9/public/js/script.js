const form = document.getElementById("form")
form.addEventListener('submit',primeNumber)

function primeNumber(event){
    event.preventDefault();
    let error=document.getElementById("errors")
    let errorDiv=document.getElementById("error-div")
    let errorTruth=false;
    let attempts=document.getElementById("attempts")
    let attemptsDiv=document.getElementById("attempts-div")
    let attemptsTruth=false;
    let isPrime= undefined;
    let rawNumber =document.getElementById("prime-number").value;
   let number =parseInt(document.getElementById("prime-number").value);
//    if(number<0)
//    {
//        errorTruth=true
//        addLiTag(error,""+number+": is not a whole number and Prime number cannot be less than to 0 ","li-error")
       
//    }
//    else if(number===parseInt(e)){
//     errorTruth=true
//     addLiTag(error,""+number+": is not a prime number and please enter a valid input greater than 0 ","li-error")
//    }
if(!rawNumber || rawNumber.trim().length===0 || rawNumber=="e"){
    errorTruth=true
    addLiTag(error,'" '+rawNumber+' "'+': is not a valid input. please enter a whole number.',"li-error")
}
   else if(number===1 || number===0 ||number<0)
   {
    attemptsTruth=true
    addLiTag(attempts,""+number+" is NOT a prime number","not-prime")
   }
   else if(number===2)
   {
    attemptsTruth=true
    isPrime=true
   }
  else if(number>0){
     
      for (let i = 2; i <number; i++) {
       if (number % i === 0) {
           attemptsTruth=true
           addLiTag(attempts,""+number+" is NOT a prime number","not-prime")
           break;
       }
       if(number%i!==0 && i===number-1){
        isPrime=true
       }
    }
    
   

}

if(isPrime){  
    attemptsTruth=true
    addLiTag(attempts,""+number+" is a prime number","is-prime")
}


if(errorTruth===true){
    errorDiv.hidden=false
}
if(attemptsTruth===true){
    attemptsDiv.hidden=false
}
}

function addLiTag(id,message,className){
    let li=document.createElement('li');
    li.innerHTML=message;
    li.classList.add(className)
    id.appendChild(li)
}
