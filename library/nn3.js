// new version of neural network with layers
let log = function(matr, header) {
    console.log(header);
    console.table(matr.matrix);
}
let log2 = function(matrix, header) {
    console.log(header + " -------------------------------------");
    console.log("rows:" + matrix.rows + " cols: " + matrix.cols);
    for (let i = 0; i < matrix.rows; i++) {
        let s = "";
        for (let j = 0; j < matrix.cols; j++) {
            let st = matrix.matrix[i][j].toFixed(4).padEnd(8);
            s += st;
        }
        console.log(s);
    }
    console.log("");
}
class Layer {


    constructor(n_nodesPrevious, n_nodes, name) {
        this.name = name; // for debugging
        this.inputs = new Matrix(n_nodesPrevious, 1); //input from the previous layer
        this.weights = new Matrix(n_nodes, n_nodesPrevious)
        this.z_nodes = new Matrix(n_nodes, 1); //nodes values before activation function
        this.a_nodes = new Matrix(n_nodes, 1); //nodes value after activation function
        this.bias = new Matrix(n_nodes, 1); //a bias prevents block on 0 inputs vector
        this.back_errors = new Matrix(n_nodesPrevious, 1); // errors from back propagation

        this.weights = this.weights.randomize();
        this.bias = this.bias.randomize();

        this.learningRate = 0.1;
        this.actFunc = (x) => { return 1 / (1 + Math.pow(Math.E, -x)) };
        this.dActFunc = (x) => { return x * (1 - x) };

        this.cost = 0;
    }

    feedForward(inputs) {
        this.inputs = inputs;
        this.z_nodes = this.weights.multiply(inputs);
        this.z_nodes = this.z_nodes.add(this.bias);
        this.a_nodes = this.z_nodes.applyFunction(this.actFunc);
        return this.a_nodes;
    }

    propagateBack(errors) {
        // errors in -> back_errors out 

        // gradient = act(a) elementMult errors * learning rate
        let gradient = this.a_nodes.applyFunction(this.dActFunc);
        gradient = gradient.hadamard(errors);
        gradient = gradient.scalar(this.learningRate);

        //console.log(this.name + ".propagateBack");
        //log2(errors, "errors");
        //log2(gradient, "gradient");

        let nodesT = this.inputs.transpose();
        let dWeights = gradient.multiply(nodesT);
        //log2(dWeights, "Delta Weights");
        this.weights = this.weights.add(dWeights);
        //log2(this.weights, "Weights");
        //log2(this.bias, "bias before");
        this.bias = this.bias.add(gradient);
        //log2(this.bias, "bias after");
        let weightsT = this.weights.transpose();
        let back_errors = weightsT.multiply(errors);
        return back_errors;
    }

}
class NeuralNetwork {
    constructor(nodeCounts) {
        this.n_layers = nodeCounts.length - 1;
        //nodeCounts is an array of intergers, the first is input, the last is output
        if (nodeCounts.length < 2) {
            alert("Not enough layers provided!");
        }
        this.layers = [];
        for (let i = 1; i < nodeCounts.length; i++) { //starts at 1 !!!!
            let layer = new Layer(nodeCounts[i - 1], nodeCounts[i], "Hidden " + i);
            this.layers.push(layer);
        }

        this.cost = 0;
    }

    feedForward(inputs_array) {
        let inputs = Matrix.fromArray(inputs_array);
        this.layers.forEach(l => {
            let outputs = l.feedForward(inputs);
            inputs = outputs;
        });
        return inputs;
    }

    getCost(inputs_array, targets_array) {
        this.errors = this.getErrors(inputs_array, targets_array)
        this.cost = this.errors.dot(this.errors);
        return this.cost;
    }

    getErrors(inputs_array, targets_array) {
        this.targets = Matrix.fromArray(targets_array);
        this.outputs = this.feedForward(inputs_array);
        this.errors = this.targets.sub(this.outputs);
        return this.errors;
    }

    train(inputs_array, targets_array) {
        //console.log("Start of Training");
        let inputs = Matrix.fromArray(inputs_array);
        //log2(inputs, "Input to training");
        //log2(Matrix.fromArray(targets_array), "Target");
        //log2(this.errors, "errors of training");
        this.errors = this.getErrors(inputs_array, targets_array)
        this.cost = this.errors.dot(this.errors);
        for (var i = this.n_layers - 1; i >= 0; i--) { //go backward through the layers
            let layer = this.layers[i];
            let error = layer.propagateBack(this.errors);
            this.errors = error;
        }
    }
    setLearningRate(lr) {
        this.layers.forEach(l => {
            l.learningRate = lr;
        });
    }


}