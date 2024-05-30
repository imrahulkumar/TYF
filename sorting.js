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
    Sorting.prototype.swap = function (arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    };
    return Sorting;
}());
(function main() {
    var sort = new Sorting();
    var selectionSortedArr = sort.selectionSort([13, 46, 24, 52, 20, 9]);
    console.log('selectionSortedArr =>', selectionSortedArr);
})();
