import { Approach } from "./utils";



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

      if(approachType === Approach.Brute_Force){
        let set = new Set(arr);
        let uniqueArr = Array.from(set);
        for (let i = 0; i < uniqueArr.length; i++) {
          arr[i] = uniqueArr[i];
        }
        return {length: uniqueArr.length, array: uniqueArr};

      }

      else if(approachType === Approach.Optimal){
        let i = 0;
        for(let j = 1; j < arr.length; j++) {
              if(arr[i] !== arr[j]){
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
   

}


(function main() {

    let arr = [1, 2, 3, 4, 5];
    let arrayProblem = new ArrayProblem();

    let isSorted:any = arrayProblem.isSorted(Approach.Brute_Force, arr);
    console.log(`largestNumber ${Approach.Brute_Force} =>`, isSorted);

    isSorted = arrayProblem.isSorted(Approach.Optimal, arr);
    console.log(`isSorted ${Approach.Optimal}  =>`, isSorted);

   

    let removeDuplicates = arrayProblem.removeDuplicates(Approach.Brute_Force, arr);
    console.log(`removeDuplicates ${Approach.Brute_Force}  =>`, removeDuplicates);

    removeDuplicates = arrayProblem.removeDuplicates(Approach.Optimal, arr);
    console.log(`removeDuplicates ${Approach.Optimal}  =>`, removeDuplicates);


})()