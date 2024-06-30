import { Approach } from "./utils";



class ArrayProblem {

    constructor() { }

    // 1. Find the Largest element in an array

    largestElement(approachType: Approach, arr: number[]): number {

        if (approachType === Approach.Brute_Force) {
            arr.sort((a, b) => a - b);
            return arr[arr.length - 1];
        }

        else if (approachType === Approach.Recursive) {
            let max = arr[0];
            for (let i = 0; i < arr.length; i++) {
                if (max < arr[i]) {
                    max = arr[i];
                }
            }
            return max;
        }

        return -1
    }



    // 2. Find Second Smallest and Second Largest Element in an array

    getSecondSmallestLargest(approachType: Approach, arr: number[]) {

        if (approachType === Approach.Brute_Force) {
            if (arr.length === 0 || arr.length === 1) {
                // Edge case when only one element is present in the array
                return -1;
            }

            arr.sort((a, b) => a - b);
            let small = arr[1];
            let large = arr[arr.length - 2];
            return { small, large }
        }

        else if(approachType === Approach.Better){
            if (arr.length === 0 || arr.length === 1) {
             // Edge case when only one element is present in the array
                return -1;
              }
            
              let small = Infinity;
              let second_small = Infinity;
              let large = -Infinity;
              let second_large = -Infinity;
            
              for (let i = 0; i < arr.length; i++) {
                small = Math.min(small, arr[i]);
                large = Math.max(large, arr[i]);
              }
            
              for (let i = 0; i < arr.length; i++) {
                if (arr[i] < second_small && arr[i] !== small)
                  second_small = arr[i];
                if (arr[i] > second_large && arr[i] !== large)
                  second_large = arr[i];
              }
              return {
                second_small, 
                second_large
              }
        }

        else if(approachType === Approach.Optimal){
           let small = this.secondSmallest(arr);
           let large = this.secondLargest(arr);
           return {small, large}
        }


    }

     secondSmallest = (arr: number[]): number => {
        if (arr.length < 2)
          return -1;
      
        let small = Infinity;
        let second_small = Infinity;
      
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] < small) {
            second_small = small;
            small = arr[i];
          } else if (arr[i] < second_small && arr[i] !== small) {
            second_small = arr[i];
          }
        }
      
        return second_small;
      }
      
       secondLargest = (arr: number[]): number => {
        if (arr.length < 2)
          return -1;
      
        let large = -Infinity;
        let second_large = -Infinity;
      
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] > large) {
            second_large = large;
            large = arr[i];
          } else if (arr[i] > second_large && arr[i] !== large) {
            second_large = arr[i];
          }
        }
      
        return second_large;
      }


}


(function main() {

    let arr = [13, 46, 24, 52, 20, 9];
    let arrayProblem = new ArrayProblem();

    let largestNumber:any = arrayProblem.largestElement(Approach.Brute_Force, arr);
    console.log(`largestNumber ${Approach.Brute_Force} =>`, largestNumber);

    largestNumber = arrayProblem.largestElement(Approach.Recursive, arr);
    console.log(`largestNumber ${Approach.Recursive}  =>`, largestNumber);

    largestNumber = arrayProblem.getSecondSmallestLargest(Approach.Brute_Force, arr);
    console.log(`getSecondSmallestLargest ${Approach.Brute_Force}  =>`, largestNumber);

    largestNumber = arrayProblem.getSecondSmallestLargest(Approach.Better, arr);
    console.log(`getSecondSmallestLargest ${Approach.Better}  =>`, largestNumber);

    largestNumber = arrayProblem.getSecondSmallestLargest(Approach.Optimal, arr);
    console.log(`getSecondSmallestLargest ${Approach.Optimal}  =>`, largestNumber);



})()