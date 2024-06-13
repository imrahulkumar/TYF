var Sorting = /** @class */ (function () {
    function Sorting() {
    }
    Sorting.prototype.selectionSort = function (arr) {
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
        var n = arr.length;
        for (var i = 0; i <= n - 2; i++) {
            var min = i;
            for (var j = i; j <= n - 1; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            this.swap(arr, min, i);
        }
        return arr;
    };
    Sorting.prototype.bubbleSort = function (arr) {
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
        var n = arr.length;
        for (var i = n - 1; i >= 1; i--) {
            var didSwap = 0;
            for (var j = 0; j <= i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    this.swap(arr, j, j + 1);
                    didSwap = 1;
                }
            }
            if (didSwap == 0) {
                break;
            }
        }
        return arr;
    };
    Sorting.prototype.insertionSort = function (arr) {
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
        var n = arr.length;
        for (var i = 0; i <= n - 1; i++) {
            var j = i;
            while (j > 0 && arr[j - 1] > arr[j]) {
                this.swap(arr, j - 1, j);
                j--;
            }
        }
        return arr;
    };
    //Merge Sort 
    Sorting.prototype.mergeAndSort = function (arr, low, mid, high) {
        var temp = [];
        var left = low;
        var right = mid + 1;
        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                temp.push(arr[left]);
                left++;
            }
            else {
                temp.push(arr[right]);
                right++;
            }
        }
        while (left <= mid) {
            temp.push(arr[left]);
            left++;
        }
        while (right <= high) {
            temp.push(arr[right]);
            right++;
        }
        for (var i = low; i <= high; i++) {
            arr[i] = temp[i - low];
        }
    };
    Sorting.prototype.mergeSort = function (arr, low, high) {
        if (low >= high)
            return;
        var mid = Math.floor((low + high) / 2);
        this.mergeSort(arr, low, mid);
        this.mergeSort(arr, mid + 1, high);
        this.mergeAndSort(arr, low, mid, high);
    };
    Sorting.prototype.swap = function (arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    };
    Sorting.prototype.partition = function (arr, low, high) {
        var pivot = arr[low];
        var i = low;
        var j = high;
        while (i < j) {
            while (arr[i] <= pivot && i <= high - 1) {
                i++;
            }
            while (arr[j] > pivot && j >= low + 1) {
                j--;
            }
            if (i < j)
                this.swap(arr, i, j);
        }
        this.swap(arr, low, j);
        return j;
    };
    Sorting.prototype.quickSort = function (arr, low, high) {
        if (low < high) {
            var pIndex = this.partition(arr, low, high);
            this.quickSort(arr, low, pIndex - 1);
            this.quickSort(arr, pIndex + 1, high);
        }
    };
    return Sorting;
}());
(function main() {
    var arr = [13, 46, 24, 52, 20, 9];
    var ln = arr.length;
    var sort = new Sorting();
    var selectionSortedArr = sort.selectionSort(arr);
    console.log('selectionSortedArr =>', selectionSortedArr);
    var bubbleSortedArr = sort.bubbleSort(arr);
    console.log('bubbleSortedArr    =>', bubbleSortedArr);
    var insertionSortedArr = sort.insertionSort(arr);
    console.log('insertionSortedArr =>', insertionSortedArr);
    var arr2 = [9, 4, 7, 6, 3, 1, 5];
    sort.mergeSort(arr2, 0, arr2.length - 1);
    console.log('mergeSortArr     =>', arr2);
    var arr3 = [4, 6, 2, 5, 7, 9, 1, 3];
    sort.quickSort(arr3, 0, arr3.length - 1);
    console.log('quickSortArr     =>', arr3);
})();
