
class Sorting {

    constructor() {}

    selectionSort(arr: number[]): number[] {
          /**
           * Idea
           * Select Minimum And Swap
           * 13, 46, 24, 52, 20, 9
           * 
           *    1. Swap at index 0 and minimum index[0 to n-1]
           *    2. Swap at index 1 and minimum index[1 to n-1]   
           *    3. Swap at index 2 and minimum index[2 to n-1]
           *    .
           *    .
           *    .
           *       Swap at index n-2 and minimum index[n-2 to n-1]
           * 
           * 
           *   9, 46, 24, 52, 20, 13
           *   9, 13, 24, 52, 20, 46
           *   9, 13, 20, 52, 24, 46
           *   9, 13, 20, 24, 52, 46
           *   9, 13, 20, 24, 46, 52
           * 
           * 
           * Time Complexity 
           *   O(N) => Vest, Worst, Average
           * 
           *  */  
          
          let n = arr.length;
          for(let i = 0; i <= n-2; i++) {
            let min = i;
            for(let j = i; j <= n-1; j++) {
                if(arr[j] < arr[min]){
                      min = j;
                }
            }
            this.swap(arr,min, i)
          }
         return arr;
    }



    bubbleSort(arr: number[]): number[] {

        /**
         *  Idea 
         * Push the max element to the last by adjacent swap
         * 
         * 
         * 13, 46, 24, 52, 20, 9
         * 13, 46, 24, 52, 20, 9
         * 13, 24, 46, 52, 20, 9
         * 13, 24, 46, 52, 20, 9
         * 13, 24, 46, 20, 52, 9
         * 13, 24, 46, 20, 9, 52
         * 
         * One round of swaping max num is at end
         * now repeated for 0 to n-2
         * 
         * 
         *  0 to n-1
         *  1 to n-2
         *  2 to n-3
         *  3 to n-4
         *  .
         *  .
         *  .
         *  0 to 1
         * 
         * 
         */
        let n = arr.length;
        for(let i = n-1; i>=1; i-- ) {
            let didSwap = 0;
            for(let j=0; j<=i-1; j++) {
                if(arr[j] > arr[j+1]){
                    this.swap(arr, j, j+1);
                    didSwap = 1;
                }
            }
            if(didSwap == 0){
                break;
            }
        }

        return arr;
    }


    insertionSort(arr: number[]): number[] {

        /**
         * Idea
         * Take an element & place it in correct order
         * 
         * 
         *   first take 1 element i.e
         *   index 0
         * 
         *   first take 2 element i.e
         *   index 0, 1
         * 
         *   first take 3 element i.e
         *   index 0, 1, 2
         * 
         *   first take 4 element i.e
         *   index 0, 1, 2, 3
         * 
         *   first take 5 element i.e
         *   index 0, 1, 2, 3, 4
         * 
         * 
         * 14, 9, 15, 12, 6, 8, 13
         * 9, 14, 15, 12, 6, 8, 13
         * 9, 14, 15, 12, 6, 8, 13
         * 9, 12, 14, 15, 6, 8, 13
         * 6, 9, 12, 14, 15, 8, 13
         * 6, 8, 9, 12, 14, 15, 13
         * 6, 8, 9, 12, 13, 14, 15 
         * 
         */
        let n = arr.length;
        for(let i=0; i <=  n-1; i++){
            let j = i;
            while(j > 0 && arr[j-1]> arr[j]){
                 this.swap(arr, j-1, j);
                 j--;
            }
        }

        return arr;
    }








    //Merge Sort 


    mergeAndSort(arr:number[], low:number, mid: number, high: number):void {
           let temp = [];
           let left = low;
           let right = mid + 1;

           while(left <= mid && right <= high) {
                 if(arr[left] <= arr[right]){
                    temp.push(arr[left]);
                    left++;
                 } else {
                    temp.push(arr[right]);
                    right++;
                 }
           }
           while(left <= mid){
            temp.push(arr[left]);
            left++;
           }
           while(right <= high){
            temp.push(arr[right]);
            right++;
           }
           for (let i = low; i <= high; i++) {
            arr[i] = temp[i - low];
        }
    }


    mergeSort(arr:number[], low:number, high:number): void {
        if(low >= high) return;
        const mid = Math.floor((low + high) / 2);
        this.mergeSort(arr, low, mid);
        this.mergeSort(arr, mid+1, high)
        this.mergeAndSort(arr, low, mid, high);
    }







    swap(arr: number[], index1:number, index2:number): void {
       let temp = arr[index1];
       arr[index1] = arr[index2];
       arr[index2] = temp;
    }

}


(function main() {

     let arr = [13, 46, 24, 52, 20, 9];
     let ln = arr.length;
     let sort = new Sorting();
     let selectionSortedArr = sort.selectionSort(arr);
     console.log('selectionSortedArr =>', selectionSortedArr);

     let bubbleSortedArr = sort.bubbleSort(arr);
     console.log('bubbleSortedArr    =>', bubbleSortedArr);

     let insertionSortedArr = sort.insertionSort(arr);
     console.log('insertionSortedArr =>', insertionSortedArr);
     
     let arr2 = [9, 4, 7, 6, 3, 1, 5]
     sort.mergeSort(arr2,0,arr2.length-1);
     console.log('mergeSortedArr     =>', arr2);


})()