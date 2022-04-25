const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require('./objUtils')
/* arrayUtils.js */

//mean

// Mean Tests
try {
    // Should Pass
    console.log(arrayUtils.mean([1,2,3]));
    console.log('mean passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(arrayUtils.mean("Deep","is","Awesome"));
    console.error('mean did not error');
 } catch (e) {
    console.log(e);
 }
//console.log(arrayUtils.mean([1,2,3]));
//console.log(arrayUtils.mean(["Deep","is","Awesome"]));
//console.log(arrayUtils.mean("Deep","is","Awesome"));
//console.log(arrayUtils.mean());

//medianSquare
try {
    // Should Pass
    console.log(arrayUtils.medianSquared([12,3,5]));//5 => 25
    console.log('Median passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(arrayUtils.medianSquared([]));// 22 => 484
    console.error('median did not error');
 } catch (e) {
    console.log(e);
 }

// console.log(arrayUtils.medianSquared([12,3,5]));//5 => 25
// console.log(arrayUtils.medianSquared([ 3, 13, 7, 5, 21, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29]));//23 => 529
// console.log(arrayUtils.medianSquared([3, 13, 7, 5, 21, 23, 23, 40, 23, 14, 12, 56, 23, 29]));// 22 => 484

//max element
try {
    // Should Pass
    console.log(arrayUtils.maxElement([100,12,13,78,111,22,123,66,3,2,9,555,444,1]))
    console.log('Max Element passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(arrayUtils.maxElement(5,6,7));
    console.error('Max Element did not error');
 } catch (e) {
    console.log(e);
 }

// console.log(arrayUtils.maxElement([100,12,13,78,111,22,123,66,3,2,9,555,444,1]))
// console.log(arrayUtils.maxElement([100,12,13,78,111,22,123,66,3,2,9,555,444,1,"Hello"]))

//fill
try {
    // Should Pass
    console.log(arrayUtils.fill(5))
    console.log('fill passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(arrayUtils.fill("test"));
    console.error('fill did not error');
 } catch (e) {
    console.log(e);
 }
//console.log(arrayUtils.fill(5))

//countRepeating 
try {
    // Should Pass
    console.log(arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]))
    console.log('countRepeating passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(arrayUtils.countRepeating("foobar"));
    console.error('countRepeating did not error');
 } catch (e) {
    console.log(e);
 }

//console.log(arrayUtils.countRepeating([2,2,2,2,2]))
//console.log(arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]))
// countRepeating("foobar")  //throws an error
// countRepeating() //throws an error
// countRepeating([]) //returns {}
// countRepeating({a: 1, b: 2, c: "Patrick"}) //throws an error

//isEqual
try {
    // Should Pass
    console.log(arrayUtils.isEqual([1, 2, 3], [3, 1, 2]))
    console.log('isEqual passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(arrayUtils.isEqual("foobar"));
    console.error('isEqual did not error');
 } catch (e) {
    console.log(e);
 }
//console.log(arrayUtils.isEqual([1, 2, 3], [3, 1, 2]))
//console.log(arrayUtils.isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z']));
//console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]));
//console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]]));
//console.log(arrayUtils.isEqual([1, 2, 3], [4, 5, 6])); // Returns: false
//console.log(arrayUtils.isEqual([1, 3, 2], [1, 2, 3, 4])); // Returns: false
//console.log(arrayUtils.isEqual([1, 2], [1, 2, 3])); // Returns: false
//console.log(arrayUtils.isEqual([],[])); // Returns: false

/* stringUtils.js */

//camelCase
try {
    // Should Pass
    console.log(stringUtils.camelCase('hello deep manek'))
    console.log('camelCase passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(stringUtils.camelCase(["hello","world"]));
    console.error('camelCase did not error');
 } catch (e) {
    console.log(e);
 }
// console.log(stringUtils.camelCase('hello deep manek'))
// console.log(stringUtils.camelCase('    '))


//replaceChar
try {
    // Should Pass
    console.log(stringUtils.replaceChar('Daddy'))
    console.log('replaceChar passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(stringUtils.replaceChar(""));
    console.error('replaceChar did not error');
 } catch (e) {
    console.log(e);
 }
//console.log(stringUtils.replaceChar("daddy"))
//console.log(stringUtils.replaceChar("daddy"))
//console.log(stringUtils.replaceChar("daddy"))

//mashUp
try {
    // Should Pass
    console.log(stringUtils.mashUp("Deep","Patrick"))
    console.log('mashUp passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
    console.log(stringUtils.mashUp("h","e"));
    console.error('mashUp did not error');
 } catch (e) {
    console.log(e);
 }
//console.log(stringUtils.mashUp("Deep","Patrick"))
//console.log(stringUtils.mashUp("","Patrick"))
//console.log(stringUtils.mashUp(undefined,NaN))


/* objUtils.js */

//make arrays
try {
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    
    const firstSecondThird = objUtils.makeArrays([first, second, third]);
    // [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
    console.log(firstSecondThird)
    console.log('makeArrays passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
   let temp= objUtils.makeArrays([1, 2, 3])
    console.log(temp)
    console.error('makeArrays did not error');
 } catch (e) {
    console.log(e);
 }

//isDeepEqual
try {
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    console.log(objUtils.isDeepEqual(forth, fifth));
    console.log(objUtils.isDeepEqual(first, second));
    console.log('isDeepEqual passed successfully');
 } catch (e) {
    console.error(e);
 }
 try {
    // Should Fail
   let temp= objUtils.isDeepEqual([1, 2, 3])
    console.log(temp)
    console.error('isDeepEqual did not error');
 } catch (e) {
    console.log(e);
 }
