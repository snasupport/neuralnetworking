// reprogrammed version from coding train 
let log = function(matr, header) {
    console.log(header);
    console.table(matr.matrix);
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        //store input values
        this.n_inputs = input_nodes;
        this.n_hidden = hidden_nodes;
        this.n_outputs = output_nodes;

        this.inputs = new Matrix(this.n_inputs, 1);

        //weights between input and hidden
        this.w_ih = new Matrix(this.n_hidden, this.n_inputs);

        //hidden nodes without nad with activation
        this.hidden0 = new Matrix(this.n_hidden, 1); //hidden vector without activation
        this.hidden = new Matrix(this.n_hidden, 1);
        //bias for hidden layer set to 1
        this.bias_h = new Matrix(this.n_hidden, 1);
        this.bias_h = this.bias_h.add(1);

        //output nodes wihtout and with activation
        this.w_ho = new Matrix(this.n_outputs, this.n_hidden);
        this.outputs0 = new Matrix(this.n_outputs, 1); //without activation
        this.outputs = new Matrix(this.n_outputs, 1);
        //bias for output nodes
        this.bias_o = new Matrix(this.n_outputs, 1);
        this.bias_o = this.bias_o.add(1);

        //randomize all weights
        this.w_ih = this.w_ih.randomize();
        this.w_ho = this.w_ho.randomize();

        this.targets = new Matrix(this.n_outputs, 1);
        this.errors = new Matrix(this.n_outputs, 1);

        this.gradient = new Matrix(this.n_outputs, 1);
        this.gradient0 = new Matrix(this.n_outputs, 1);
        this.gradient1 = new Matrix(this.n_outputs, 1);
        this.gradient2 = new Matrix(this.n_outputs, 1);
        this.hiddenT = new Matrix(1, this.n_hidden);
        this.dW_ho = new Matrix(this.n_hidden, this.n_outputs);

        this.w_ho_T = new Matrix(1, this.n_hidden);
        this.hidden_errors = new Matrix(1, this.n_hidden);

        this.hgradient0 = new Matrix(1, this.n_hidden);
        this.hgradient1 = new Matrix(1, this.n_hidden);
        this.hgradient2 = new Matrix(1, this.n_hidden);

        this.inputT = new Matrix(1, this.n_inputs);
        this.dW_ih = new Matrix(this.n_hidden, this.n_inputs);



        this.learning_rate = 0.1;
        this.cost = 0;
    }
    setLearningRate(val) {
        this.learning_rate = val;
    }
    feedforward(input_array) {
        // H = act(I*W + B)
        this.inputs = Matrix.fromArray(input_array);
        //log(this.inputs, "inputs");
        //log(this.w_ih, "weights_ih");
        //log(this.bias_h, "bias_h");
        //log(this.w_ho, "weights_ho");
        //log(this.bias_o, "bias_o");
        this.hidden0 = this.w_ih.multiply(this.inputs);
        this.hidden0 = this.hidden0.add(this.bias_h);
        //log(this.hidden0, "hidden before sigmoid");
        this.hidden = this.hidden0.applyFunction(this.sigmoid);
        //log(this.hidden, "hidden after sigmoid");

        // O = act(H*W + B)
        this.outputs0 = this.w_ho.multiply(this.hidden);
        //log(this.outputs0, "outputs before bias");
        this.outputs0 = this.outputs0.add(this.bias_o);
        //log(this.outputs0, "outputs after bias");
        this.outputs = this.outputs0.applyFunction(this.sigmoid);
        //log(this.outputs, "outputs after sigmoid");
        return this.outputs;
    }
    calccost(inputs_array, target_array) {
        this.targets = Matrix.fromArray(target_array);
        this.feedforward(inputs_array);
        this.errors = this.targets.sub(this.outputs);
        this.cost = this.errors.dot(this.errors);
    }

    train(inputs_array, target_array) {
        this.targets = Matrix.fromArray(target_array);
        this.feedforward(inputs_array);
        this.errors = this.targets.sub(this.outputs);
        //log(this.outputs, "outputs");
        //log(this.errors, "output_errors");
        this.cost = this.errors.dot(this.errors);

        //G = dsig(O) * E *lr ... Vector

        this.gradient0 = this.outputs.applyFunction(this.dsigmoid);
        //log(this.gradient0, "gradient0 after derivative");

        this.gradient1 = this.gradient0.hadamand(this.errors);
        //log(this.gradient1, "gradient1 after elementwise mul with errors");
        this.gradient2 = this.gradient1.scalar(this.learning_rate);
        //log(this.gradient2, "gradient1 after apply learning rate");
        // Calculate deltas
        this.hiddenT = this.hidden.transpose();
        this.dW_ho = this.gradient2.multiply(this.hiddenT);
        //log(this.dW_ho, "dW_ho");
        //New W = W + dW
        this.w_ho = this.w_ho.add(this.dW_ho);
        //
        this.bias_o = this.bias_o.add(this.gradient2);

        // Calculate the hidden layer errors
        this.w_ho_T = this.w_ho.transpose();
        this.hidden_errors = this.w_ho_T.multiply(this.errors);

        // Calculate hidden gradient
        this.hgradient0 = this.hidden.applyFunction(this.dsigmoid);
        this.hgradient1 = this.hgradient0.hadamant(this.hidden_errors);
        this.hgradient2 = this.hgradient1.scalar(this.learning_rate);

        // Calcuate input->hidden deltas
        this.inputT = this.inputs.transpose();
        this.dW_ih = this.hgradient2.multiply(this.inputT);

        this.w_ih = this.w_ih.add(this.dW_ih);
        this.bias_h = this.bias_h.add(this.hgradient2);

    }
    sigmoid(t) {
        return 1 / (1 + Math.pow(Math.E, -t));
    }
    dsigmoid(t) {
        return t * (1 - t);
    }
}