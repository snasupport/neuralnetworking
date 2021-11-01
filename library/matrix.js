// reprogrammed package from coding train
class Matrix {

    constructor(rows, cols) {
        if (rows == null || cols == null) {
            //alert("in Matrix constructor either row or col is undefined");
            let e = new Error();
            console.log(e.stack);
        }
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];
        for (var i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0;
            }
        }
        this.seed = 42;
    }

    hadamard(b) { //element wise muliplication
        let result = new Matrix(this.rows, this.cols)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.matrix[i][j] = this.matrix[i][j] * b.matrix[i][j];
            }
        }
        return result;
    }

    multiply(n) { //matrix mulitplcation from right
        if (this.cols !== n.rows) {
            console.log("Cols of matrix 1 must match rows of matrix 2");
            return undefined;
        }
        let result = new Matrix(this.rows, n.cols)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < n.cols; j++) {
                let sum = 0;
                for (let k = 0; k < this.cols; k++) {
                    sum += this.matrix[i][k] * n.matrix[k][j];
                }
                result.matrix[i][j] = sum;
            }
        }
        return result;
    }

    scalar(a) { // mulitply matrix with number
        let result = new Matrix(this.rows, this.cols)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.matrix[i][j] = this.matrix[i][j] * a;
            }
        }
        return result;
    }

    dot(a) { //dot product for 2 matrices with one column      
        let result = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result += this.matrix[i][j] * a.matrix[i][j];
            }
        }
        return result;
    }

    add(b) {//adds two vectors        
        //vectors are matrixs with 1 col
        let result = new Matrix(this.rows, this.cols);
        if (typeof (b) == 'number') {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    result.matrix[i][j] = this.matrix[i][j] + b;
                }
            }  
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    result.matrix[i][j] = this.matrix[i][j] + b.matrix[i][j];
                }
            }
           
        }
        return result;
    }

    sub(b) { // subtracts two vectors      
        let result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.matrix[i][j] = this.matrix[i][j] - b.matrix[i][j];
            }
        }
        return result;
    }

    transpose() { // transpose a matrix
        let result = new Matrix(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.matrix[j][i] = this.matrix[i][j];
            }
        }
        return result;
    }

    static fromArray(arr) { //creates matrix with 1 or several columns (Vector or matrix) from array
        // example: [1,2,1,3]
        // example: [[1,2,3],[2,4,7],[3,0,1]] 
        let a0 = arr[0];
        if (typeof (a0) != 'number') {
            let m = new Matrix(arr.length, a0.length);
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[0].length; j++) {
                    m.matrix[i][j] = arr[i][j];
                }
            }
            return m;
        } else {
            let m = new Matrix(arr.length, 1);
            for (let i = 0; i < arr.length; i++) {
                m.matrix[i][0] = arr[i];
            }
            return m;
        }
    }

    toArray() { // converts matrix with 1 colum to array
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            arr.push(this.matrix[i][0]);
        }
        return arr;
    }

    print() { //prints the matrix
        console.table(this.matrix);
    }

    applyFunction(func) { // applies a function to every element and returns new matrix
        let result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.matrix[i][j] = func(this.matrix[i][j]);
            }
        }
        return result;
    }

    randomize() {
        return this.applyFunction(() => { return Math.random() * 2 - 1; });
    }

    randomize2() {
        this.applyFunction(() => {
            this.seed = this.rand(this.seed); // Pseudo Random with seed
            return this.seed * 2 - 1;
        });
    }

    clone() {
        let result = new Matrix(this.rows, this.cols);
        this.apply((i, j) => {
            result.matrix[i][j] = this.matrix[i][j];
        });
        return result;
    }

    rand(s) {
        return function () {
            s = Math.sin(s) * 10000; return s - Math.floor(s);
        };
    };
}