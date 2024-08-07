import { Approach, Case, Using } from "./utils";



class ArrayProblem {

  constructor() { }

  // 1. Union of Two Sorted Arrays
  /**
   *  Case 1: using Map and output is unsorted Array.
   *  Case 2: using Set and output is unsorted Array.
   *  Case 3: using two pointer and output is sorted Array. 
   */
  unionArray = (cases: Case, arr1: number[], arr2: number[]): number[] => {

    if (cases === Case._1) {
      let freq: any = new Map();
      let union = [];

      for (let num of arr1) {
        freq.set(num, (freq.get(num) || 0) + 1);
      }

      for (let num of arr2) {
        freq.set(num, (freq.get(num) || 0) + 1);
      }

      freq.forEach((value, key) => {
        union.push(key);
      });

      return union;
    }
    else if (cases === Case._2) {
      const set: any = new Set();
      const union = [];

      for (let num of arr1) {
        set.add(num);
      }

      for (let num of arr2) {
        set.add(num);
      }

      set.forEach((value, key) => {
        union.push(key);
      });

      return union;
    }
    else if (cases === Case._3) {

      /**
       * There are 3 Case in union with sorted array
       * union = [];
       * i and j are pointer initialized with 0
       * case 1
       * arr[i] === arr[j]
       * insert one element in union array and also check in union if it is already present
       * 
       * case 2
       * arr[i] <= arr[j]
       * insert arr[i] in the union array but also check if it is already present
       * 
       * case 2
       * arr[i] >= arr[j]
       *  insert arr[j] in the union array but also check if it is already present
       * 
       * 
       * In the end insert all left out element either present in arr[i] or arr[j]
       * 
       */



      let i = 0; let j = 0;
      let union = [];


      while (i < arr1.length && j < arr2.length) {

        // Case 1 and Case 2 covered 
        if (arr1[i] <= arr2[j]) {
          if (union.length === 0 || union[union.length - 1] !== arr1[i]) {
            union.push(arr1[i]);
            i++;
          }
        } else { // Case 3
          if (union.length === 0 || union[union.length - 1] !== arr2[j]) {
            union.push(arr2[j]);
            j++;
          }
        }

      }

      while (i < arr1.length) {
        if (union[union.length - 1] !== arr1[i]) {
          union.push(arr1[i]);
          i++;
        }
      }

      while (j < arr2.length) {
        if (union[union.length - 1] !== arr2[j]) {
          union.push(arr2[j]);
          j++;
        }
      }

      return union;

    }

  }


  // 2. Find the missing number in an array

  missingNumber(approach: Approach, arr: number[]): number {

    if (approach === Approach.Brute_Force) {

      for (let i = 1; i < arr.length; i++) {
        let flag = 0;

        for (let j = 0; j < arr.length - 1; j++) {
          if (arr[j] === i) {
            flag = 1;
            break;
          }
        }
        if (flag === 0) {
          return i;
        }
      }
      return -1;
    } else if (approach === Approach.Better) {
      const n = arr.length;
      const summation = (n * (n + 1)) / 2;

      let s2 = 0;

      for (let i = 0; i < n - 1; i++) {
        s2 += arr[i]
      }

      return summation - s2;

    } else if (approach === Approach.Optimal) {

      let xor1 = 0;
      let xor2 = 0;

      for (let i = 0; i < arr.length; i++) {
        xor2 = xor2 ^ arr[i];
        xor1 = xor1 ^ (i + 1);
      }

      xor1 = xor1 ^ arr.length;

      return xor1 ^ xor2;

    }
  }




  // 3. Count Maximum Consecutive One's in the array

  findMaxConsecutiveOnes(arr: number[]): number {

    let cnt = 0;
    let max = 0;

    arr.forEach(ele => {
      if (ele === 1) {
        cnt++;
      } else {
        cnt = 0;
      }

      max = Math.max(cnt, max);
    });
    return max;
  }

  // 4. Find the number that appears once, and the other numbers twice
  // Given a non-empty array of integers arr, every element appears twice except for one. Find that single one.
  getSingleElement(approach: Approach, arr: number[], using?: Using): number {

    if (approach === Approach.Brute_Force) {
      const n = arr.length;

      // Run a loop for selecting elements:
      for (let i = 0; i < n; i++) {
        const num = arr[i]; // selected element
        let cnt = 0;

        // Find the occurrence using linear search:
        for (let j = 0; j < n; j++) {
          if (arr[j] === num) {
            cnt++;
          }
        }

        // If the occurrence is 1, return the number:
        if (cnt === 1) {
          return num;
        }
      }

      // This line will never execute
      // if the array contains a single element.
      return -1;
    }
    else if (approach === Approach.Better) {

      if (using === Using.Hash) {
        // Size of the array:
        let n = arr.length;

        // Find the maximum element:
        let maxi = arr[0];
        for (let i = 0; i < n; i++) {
          maxi = Math.max(maxi, arr[i]);
        }

        // Declare hash array of size maxi+1
        // And hash the given array:
        let hash = new Array(maxi + 1).fill(0);
        for (let i = 0; i < n; i++) {
          hash[arr[i]]++;
        }

        // Find the single element and return the answer:
        for (let i = 0; i < n; i++) {
          if (hash[arr[i]] === 1) {
            return arr[i];
          }
        }

        // This line will never execute
        // if the array contains a single element.
        return -1;
      }
      else if (using === Using.Map) {
        // Size of the array:
        const n = arr.length;

        // Declare the hashmap.
        // And hash the given array:
        const hashmap: any = new Map();
        for (let i = 0; i < n; i++) {
          const num = arr[i];
          hashmap.set(num, (hashmap.get(num) || 0) + 1);
        }

        let k = 0;
        hashmap.forEach((value, key) => {
          if (value === 1) {
            k = key;
          }
        });
        if (k) return k;
        // Find the single element and return the answer:
        for (const [num, count] of hashmap) {
          if (count === 1) {
            return num;
          }
        }

        // This line will never execute
        // if the array contains a single element.
        return -1;
      }

    }
    else if (approach === Approach.Optimal) {
      // XOR all the elements:
      let xorr = 0;
      for (let i = 0; i < arr.length; i++) {
        xorr = xorr ^ arr[i];
      }
      return xorr;
    }
  }


  // 5. Longest Subarray with given Sum K(Positives)
  getLongestSubArray(approach: Approach, arr: number[], sn: number, using?: Using): number {

    if (approach === Approach.Brute_Force) {
      let n = arr.length;
      let len = 0;

      for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
          let s = 0;

          for (let k = i; k <= j; k++) {
            s += arr[k];
          }

          if (s === sn) {
            len = Math.max(len, j - i + 1)
          }
        }
      }
      return len;
    }
    else if (approach === Approach.Naive && using === Using.Loop) {
      let n = arr.length; // size of the array

      let len = 0;
      for (let i = 0; i < n; i++) { // starting index
        let s = 0; // Sum variable
        for (let j = i; j < n; j++) { // ending index
          // add the current element to
          // the subarray a[i...j-1]
          s += arr[j];

          if (s === sn)
            len = Math.max(len, j - i + 1);
        }
      }
      return len;
    }
    else if (approach === Approach.Naive && using === Using.Hash) {
      let n = arr.length; // size of the array

      let preSumMap = new Map();
      let sum = 0;
      let maxLen = 0;
      for (let i = 0; i < n; i++) {
        // calculate the prefix sum till index i
        sum += arr[i];

        // if the sum = k, update the maxLen
        if (sum === sn) {
          maxLen = Math.max(maxLen, i + 1);
        }

        // calculate the sum of remaining part i.e. x - k
        let rem = sum - sn;

        // calculate the length and update maxLen
        if (preSumMap.has(rem)) {
          let len = i - preSumMap.get(rem);
          maxLen = Math.max(maxLen, len);
        }

        // update the map checking the conditions
        if (!preSumMap.has(sum)) {
          preSumMap.set(sum, i);
        }
      }

      return maxLen;
    }
    else if (approach === Approach.Optimal) {
      let n = arr.length;

      let left = 0; let right = 0;
      let sum = arr[0];
      let maxLen = 0;

      while (right < n) {
        while (left <= right && sum > sn) {
          sum -= arr[left];
          left++;
        }

        if (sum === sn) {
          maxLen = Math.max(maxLen, right - left + 1);
        }

        // Move forward the right pointer
        right++;
        if (right < n) sum += arr[right];
      }
      return maxLen;
    }

    return -1;
  }



  // 6. Longest Subarray with sum K | [Postives and Negatives]
  getLongestSubarrayPosNegNum(approach: Approach, arr: number[], sn: number): number {
    if (approach === Approach.Brute_Force) {
      let n = arr.length; // size of the array

      let len = 0;
      for (let i = 0; i < n; i++) { // starting index
        for (let j = i; j < n; j++) { // ending index
          // add all the elements of subarray = a[i...j]
          let s = 0;
          for (let K = i; K <= j; K++) {
            s += arr[K];
          }

          if (s === sn)
            len = Math.max(len, j - i + 1);
        }
      }
      return len;
    } else if (approach === Approach.Better) {
      let n = arr.length; // size of the array

      let len = 0;
      for (let i = 0; i < n; i++) { // starting index
        let s = 0;
        for (let j = i; j < n; j++) { // ending index
          // add the current element to the subarray a[i...j-1]
          s += arr[j];

          if (s === sn)
            len = Math.max(len, j - i + 1);
        }
      }
      return len;
    } else if(approach === Approach.Optimal){
      let n = arr.length; // size of the array

      let preSumMap = new Map();
      let sum = 0;
      let maxLen = 0;
      for (let i = 0; i < n; i++) {
          // calculate the prefix sum till index i
          sum += arr[i];
  
          // if the sum = k, update the maxLen
          if (sum === sn) {
              maxLen = Math.max(maxLen, i + 1);
          }
  
          // calculate the sum of remaining part i.e. x-k
          let rem = sum - sn;
  
          // calculate the length and update maxLen
          if (preSumMap.has(rem)) {
              let len = i - preSumMap.get(rem);
              maxLen = Math.max(maxLen, len);
          }
  
          // finally, update the map checking the conditions
          if (!preSumMap.has(sum)) {
              preSumMap.set(sum, i);
          }
      }
  
      return maxLen;
    }
  }



  // 7. Remove Duplicates in-place from Sorted Array
  removeDuplicate(approach: Approach, arr: number[]): number {
      if(approach === Approach.Brute_Force){
        let set = new Set(arr);
        let uniqueArr = Array.from(set);
        for (let i = 0; i < uniqueArr.length; i++) {
          arr[i] = uniqueArr[i];
        }
        return uniqueArr.length;
      }
      else if(approach === Approach.Optimal){
        let i = 0;
        for (let j = 1; j < arr.length; j++) {
          if (arr[i] !== arr[j]) {
            i++;
            arr[i] = arr[j];
          }
        }
        return i + 1;
      }
  }

}



(function main() {

  let arr1 = [1, 4, 7, 9];
  let arr2 = [2, 3, 5, 6, 8];

  let arrayProblem = new ArrayProblem();

  let unionCase1: any = arrayProblem.unionArray(Case._1, arr1, arr2);
  console.log(`unionCase1 =>`, unionCase1);

  let unionCase2: any = arrayProblem.unionArray(Case._2, arr1, arr2);
  console.log(`unionCase2 =>`, unionCase2);

  let unionCase3: any = arrayProblem.unionArray(Case._3, arr1, arr2);
  console.log(`unionCase3 =>`, unionCase3);



  let missingNumber1Arr = [1, 2, 4, 5];
  let missingNumber1: any = arrayProblem.missingNumber(Approach.Brute_Force, missingNumber1Arr);
  console.log(`missingNumber1 ${Approach.Brute_Force} =>`, missingNumber1);

  let missingNumber2Arr = [1, 2, 4, 5];
  let missingNumber2: any = arrayProblem.missingNumber(Approach.Better, missingNumber2Arr);
  console.log(`missingNumber2 ${Approach.Better} =>`, missingNumber2);

  let missingNumber3Arr = [1, 2, 4, 5];
  let missingNumber3: any = arrayProblem.missingNumber(Approach.Optimal, missingNumber3Arr);
  console.log(`missingNumber3 ${Approach.Optimal} =>`, missingNumber3);

  let maxConsecutiveArray = [1, 1, 0, 1, 1, 1];
  let maxConsecutive = arrayProblem.findMaxConsecutiveOnes(maxConsecutiveArray);
  console.log(`findMaxConsecutiveOnes =>`, maxConsecutive);


  let singleElement1Arr = [4, 1, 2, 1, 2];
  let singleElement1: any = arrayProblem.getSingleElement(Approach.Brute_Force, singleElement1Arr);
  console.log(`singleElement1 ${Approach.Brute_Force} =>`, singleElement1);

  let singleElement2Arr = [4, 1, 2, 1, 2];
  let singleElement2: any = arrayProblem.getSingleElement(Approach.Better, singleElement2Arr, Using.Hash);
  console.log(`singleElement2 ${Approach.Better} ${Using.Hash} =>`, singleElement2);

  let singleElement22Arr = [4, 1, 2, 1, 2];
  let singleElement22: any = arrayProblem.getSingleElement(Approach.Better, singleElement22Arr, Using.Map);
  console.log(`singleElement2 ${Approach.Better} ${Using.Map} =>`, singleElement22);

  let singleElement3Arr = [4, 1, 2, 1, 2];
  let singleElement3: any = arrayProblem.getSingleElement(Approach.Optimal, singleElement3Arr);
  console.log(`singleElement3 ${Approach.Optimal} =>`, singleElement3);


  let longestSubArray1 = [2, 3, 5, 1, 9];
  let longestSubArr1: any = arrayProblem.getLongestSubArray(Approach.Brute_Force, longestSubArray1, 10);
  console.log(`longestSubArr1 ${Approach.Brute_Force} =>`, longestSubArr1);

  let longestSubArray2 = [2, 3, 5, 1, 9];
  let longestSubArr2: any = arrayProblem.getLongestSubArray(Approach.Naive, longestSubArray2, 10, Using.Loop);
  console.log(`longestSubArr2 ${Approach.Brute_Force} =>`, longestSubArr2);

  let longestSubArray3 = [2, 3, 5, 1, 9];
  let longestSubArr3: any = arrayProblem.getLongestSubArray(Approach.Naive, longestSubArray3, 10, Using.Hash);
  console.log(`longestSubArr3 ${Approach.Brute_Force} =>`, longestSubArr3);

  let longestSubArray4 = [2, 3, 5, 1, 9];
  let longestSubArr4: any = arrayProblem.getLongestSubArray(Approach.Optimal, longestSubArray4, 10);
  console.log(`longestSubArr4 ${Approach.Brute_Force} =>`, longestSubArr4);


  let longestSubArrayPosNeg1 = [-1, 1, 1];
  let longestSubArrPosNeg1: any = arrayProblem.getLongestSubarrayPosNegNum(Approach.Brute_Force, longestSubArrayPosNeg1, 1);
  console.log(`longestSubArrPosNeg1 ${Approach.Brute_Force} =>`, longestSubArrPosNeg1);

  let longestSubArrayPosNeg2 = [-1, 1, 1];
  let longestSubArrPosNeg2: any = arrayProblem.getLongestSubarrayPosNegNum(Approach.Brute_Force, longestSubArrayPosNeg2, 1);
  console.log(`longestSubArrPosNeg2 ${Approach.Better} =>`, longestSubArrPosNeg2);

  let longestSubArrayPosNeg3 = [-1, 1, 1];
  let longestSubArrPosNeg3: any = arrayProblem.getLongestSubarrayPosNegNum(Approach.Brute_Force, longestSubArrayPosNeg3, 1);
  console.log(`longestSubArrPosNeg3 ${Approach.Brute_Force} =>`, longestSubArrPosNeg3);


  let duplicateArr1 = [1, 1, 2, 2, 2, 3, 3];
  let removeDuplicate1: any = arrayProblem.removeDuplicate(Approach.Brute_Force, duplicateArr1);
  console.log(`removeDuplicate1 ${Approach.Brute_Force} =>`, removeDuplicate1);


  let duplicateArr2 = [1, 1, 2, 2, 2, 3, 3];
  let removeDuplicate2: any = arrayProblem.removeDuplicate(Approach.Optimal, duplicateArr2);
  console.log(`removeDuplicate2 ${Approach.Brute_Force} =>`, removeDuplicate2);



})()