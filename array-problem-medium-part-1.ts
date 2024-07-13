import { Approach, Case, Confirmation, Using, Variant } from "./utils";



class ArrayProblem {

  constructor() { }



  // Two Sum : Check if a pair with given sum exists in Array
  // 1st variant: Return YES if there exist two numbers such that their sum is equal to the target. Otherwise, return NO.
  // 2nd variant: Return indices of the two numbers such that their sum is equal to the target. Otherwise, we will return {-1, -1}.

 twoSum(variant: Variant, approach: Approach, arr: number[], sn: number) {

 
      if(approach === Approach.Brute_Force){

        for(let i = 0; i < sn; i++) {
            for(let j = i + 1; j < sn; j++) {
                 if(arr[i] + arr[j] === sn)  this.twoSumOutputVariantBased()
                 }
            }
        
        return Confirmation.No
      } else if(approach === Approach.Better){

      }
  

 
    if(approach === Approach.Brute_Force){

    } else if(approach === Approach.Better){

    }
  

 }

 twoSumOutputVariantBased(variant: Variant, confirmation: Confirmation, firstNum, secondNum): any {
     if(variant === Variant.One){
          return confirmation
     } else if(variant === Variant.Two){
          return `[ ${firstNum}, ${secondNum}]`
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







})()