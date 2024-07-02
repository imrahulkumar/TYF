import { Approach, Direction } from "./utils";



class ArrayProblem {

  constructor() { }

  // 1. Check if an Array is Sorted

  isSorted(approachType: Approach, arr: number[]): boolean {

    if (approachType === Approach.Brute_Force) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[i])
            return false;
        }
      }

      return true;
    }

    else if (approachType === Approach.Optimal) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1])
          return false;
      }

      return true;
    }

    return false
  }

  // 2. Remove Duplicates in-place from Sorted Array
  // Problem Statement: Given an integer array sorted in non-decreasing order, remove the duplicates in place such that each unique element appears only once. 
  // The relative order of the elements should be kept the same.

  removeDuplicates(approachType: Approach, arr: number[]) {
    if (approachType === Approach.Brute_Force) {
      let set = new Set(arr);
      let uniqueArr = Array.from(set);
      for (let i = 0; i < uniqueArr.length; i++) {
        arr[i] = uniqueArr[i];
      }
      return { length: uniqueArr.length, array: uniqueArr };

    }

    else if (approachType === Approach.Optimal) {
      let i = 0;
      for (let j = 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
          i++;
        }
        arr[i] = arr[j];
      }
      //from index 0 to i we have unique values
      return {
        indexStart: 0,
        indexEnd: i,
        array: arr
      }
    }

  }


  // Left Rotate the Array by One.
  leftRotate(approach: Approach, arr: number[]): number[] {

    if (approach === Approach.Brute_Force) {
      // [1] [2] [3] [4] [5] [6]
      // [2] [3] [4] [5] [6] [1]
      let temp = [];
      for (let i = 1; i < arr.length; i++) {
        temp[i - 1] = arr[i];
      }
      temp[arr.length - 1] = arr[0];
      return temp;
    }

    else if (approach === Approach.Optimal) {
      let n = arr.length;
      let temp = arr[0]; // storing the first element of the array in a variable
      for (let i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
      }
      arr[n - 1] = temp; // assign the value of the variable at the last index
      return arr;
    }

  }


  rotateArray(direction: Direction, arr: number[], approach: Approach, k: number): number[] | number {

    if (direction === Direction.Left) {
      if (approach === Approach.Brute_Force) {
        return this.rotateLeftByK(arr, arr.length, k);
      }
      else if (approach === Approach.Optimal) {
        let n = arr.length;


        // Reverse first k elements
        this.reverse(arr, 0, k - 1);
        // Reverse last n-k elements
        this.reverse(arr, k, n - 1);
        // Reverse whole array
        this.reverse(arr, 0, n - 1);

        return arr;

      }
    }
    else if (direction === Direction.Right) {
      if (approach === Approach.Brute_Force) {
        return this.rotateRightByK(arr, arr.length, k);
      }
      else if (approach === Approach.Optimal) {
        let n = arr.length;

        // Reverse first n-k elements
        this.reverse(arr, 0, n - k - 1);
        // Reverse last k elements
        this.reverse(arr, n - k, n - 1);
        // Reverse whole array
        this.reverse(arr, 0, n - 1);

        return arr;
      }
    }
    return -1;
  }



  // Rotate array by K elements
  rotateRightByK(arr: number[], arrLength: number, k: number): number[] | number {
    if (arrLength === 0) return -1;
    k = k % arrLength;
    if (k > arrLength) return -1;
    let temp = [];
    for (let i = arrLength - k; i < arrLength; i++) {
      temp[i - arrLength + k] = arr[i];
    }

    for (let i = arrLength - k - 1; i >= 0; i--) {
      arr[i + k] = arr[i];
    }

    for (let i = 0; i < k; i++) {
      arr[i] = temp[i];
    }
    return arr;
  }

  rotateLeftByK(arr: number[], arrLength: number, k: number): number[] | number {
    if (arrLength === 0) return -1;
    k = k % arrLength;
    if (k > arrLength) return -1;
    let temp = [];

    for (let i = 0; i < k; i++) {
      temp[i] = arr[i];
    }

    for (let i = 0; i < arrLength - k; i++) {
      arr[i] = arr[i + k];
    }

    for (let i = arrLength - k; i < arrLength; i++) {
      arr[i] = temp[i - arrLength + k];
    }

    return arr;
  }



  reverse(arr: number[], start: number, end: number) {
    while (start <= end) {
      let temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start++;
      end--;
    }
  }





  // Move all Zeros to the end of the array
  moveAllZeros(approach: Approach, arr: number[]): number[] {

    if (approach === Approach.Brute_Force) {
      let temp = [];

      arr.forEach(ele => {
        if (ele !== 0) {
          temp.push(ele)
        }
      });

      let nonZeroLength = temp.length;

      for (let i = 0; i < nonZeroLength; i++) {
        arr[i] = temp[i];
      }


      // then fill zero 

      for (let i = nonZeroLength; i < arr.length; i++) {
        arr[i] = 0;
      }

      return arr;
    }
    else if (approach === Approach.Optimal) {
      let n = arr.length;
      let j = -1;

      // Place the pointer j
      for (let i = 0; i < n; i++) {
        if (arr[i] === 0) {
          j = i;
          break;
        }
      }

      // No non-zero elements
      if (j === -1) return arr;

      // Move the pointers i and j and swap accordingly
      for (let i = j + 1; i < n; i++) {
        if (arr[i] !== 0) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          j++;
        }
      }

      return arr;
    }
  }


  // Given an array, and an element num the task is to find if num is present in the given array or not. If present print the index of the element or print -1.
  search(arr:number[], num:number):number {
    for(let i=0;i<arr.length;i++)
      {
          if(arr[i]==num)
          return i;
      }
      return -1;
  }


}


(function main() {

  let arr = [1, 2, 3, 4, 5];
  let arrayProblem = new ArrayProblem();

  let isSorted: any = arrayProblem.isSorted(Approach.Brute_Force, arr);
  console.log(`largestNumber ${Approach.Brute_Force} =>`, isSorted);

  isSorted = arrayProblem.isSorted(Approach.Optimal, arr);
  console.log(`isSorted ${Approach.Optimal}  =>`, isSorted);

  let removeDuplicates = arrayProblem.removeDuplicates(Approach.Brute_Force, arr);
  console.log(`removeDuplicates ${Approach.Brute_Force}  =>`, removeDuplicates);

  removeDuplicates = arrayProblem.removeDuplicates(Approach.Optimal, arr);
  console.log(`removeDuplicates ${Approach.Optimal}  =>`, removeDuplicates);

  let leftRotate = arrayProblem.leftRotate(Approach.Brute_Force, [1, 2, 3, 4, 5]);
  console.log(`leftRotate ${Approach.Brute_Force}  =>`, leftRotate);

  leftRotate = arrayProblem.leftRotate(Approach.Optimal, [1, 2, 3, 4, 5]);
  console.log(`leftRotate ${Approach.Optimal}  =>`, leftRotate);

  let leftRotateByKArray = [1, 2, 3, 4, 5, 6, 7];
  let k = 2;
  let leftRotateByK = arrayProblem.rotateArray(Direction.Left, leftRotateByKArray, Approach.Brute_Force, k);
  console.log(`leftRotateByK ${Approach.Brute_Force}  =>`, leftRotateByK);

  let rightRotateByKArray = [1, 2, 3, 4, 5, 6, 7];
  let rightRotateByK = arrayProblem.rotateArray(Direction.Right, rightRotateByKArray, Approach.Brute_Force, k);
  console.log(`rightRotateByK ${Approach.Brute_Force}  =>`, rightRotateByK);

  let leftRotateByKArrayUsingReversalAlgo = [1, 2, 3, 4, 5, 6, 7];
  let letRotateByKUsingReversalAlgo = arrayProblem.rotateArray(Direction.Left, leftRotateByKArrayUsingReversalAlgo, Approach.Optimal, k);
  console.log(`letRotateByKUsingReversalAlgo ${Approach.Optimal}  =>`, letRotateByKUsingReversalAlgo);

  let rightRotateByKArrayUsingReversalAlgo = [1, 2, 3, 4, 5, 6, 7];
  let rightRotateByKUsingReversalAlgo = arrayProblem.rotateArray(Direction.Right, rightRotateByKArrayUsingReversalAlgo, Approach.Optimal, k);
  console.log(`rightRotateByKArrayUsingReversalAlgo ${Approach.Optimal}  =>`, rightRotateByKUsingReversalAlgo);

  let moveZeroBruteForceArr = [1, 0, 2, 3, 2, 0, 0, 4, 5, 1];
  let moveZeroUsingBruteForce = arrayProblem.moveAllZeros(Approach.Brute_Force, moveZeroBruteForceArr);
  console.log(`moveZeroUsingBruteForce ${Approach.Brute_Force}  =>`, moveZeroUsingBruteForce);

  let moveZeroOptimalArr = [1, 0, 2, 3, 2, 0, 0, 4, 5, 1];
  let moveZeroUsingOptimal = arrayProblem.moveAllZeros(Approach.Brute_Force, moveZeroOptimalArr);
  console.log(`moveZeroUsingOptimal ${Approach.Optimal}  =>`, moveZeroUsingOptimal);

  let searchArr = [1,2,3,4,5];
  let isSearchArr = arrayProblem.search(searchArr, 4);
  console.log(`isSearchArr index =>`, isSearchArr);

})()