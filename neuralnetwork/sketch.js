let nn;
let lr_slider;

let training_data = [{
        inputs: [0, 0],
        outputs: [0]
    },
    {
        inputs: [0, 1],
        outputs: [1]
    },
    {
        inputs: [1, 0],
        outputs: [1]
    },
    {
        inputs: [1, 1],
        outputs: [0]
    }
];

function setup() {
    createCanvas(400, 400);
    nn = new NeuralNetwork(2, 4, 1);
    console.log("Coding Train neural network with 2,4,1")
    lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);
    nn.weights_ih = getMatrix(4, 2);
    nn.bias_h = getMatrix(4, 1);
    nn.weights_ho = getMatrix(1, 4);
    nn.bias_o = getMatrix(1, 1);
    nn.predict(training_data[1].inputs);
    nn.train(training_data[1].inputs, training_data[1].outputs)
}

function getMatrix(rows, cols) {
    if (rows == 4 && cols == 1) {
        res = new Matrix(4, 1);
        res.data[0] = [0.2];
        res.data[1] = [0.3];
        res.data[2] = [0.4];
        res.data[3] = [0.5];
        return res;
    }
    if (rows == 1 && cols == 4) {
        res = new Matrix(1, 4);
        res.data[0] = [0.2, 0.3, 0.4, 0.5];
        return res;
    }
    if (rows == 1 && cols == 1) {
        res = new Matrix(1, 1);
        res.data[0] = [0.6];
        return res;
    }
    if (rows == 4 && cols == 2) {
        res = new Matrix(4, 2);
        res.data[0] = [0.2, 0.3];
        res.data[1] = [0.3, 0.4];
        res.data[2] = [0.4, 0.5];
        res.data[3] = [0.5, 0.6];
        return res;
    }

}

function ddddraw() {
    background(0);

    for (let i = 0; i < 1000; i++) {
        let data = random(training_data);
        nn.train(data.inputs, data.outputs);
    }

    nn.setLearningRate(lr_slider.value());

    let resolution = 10;
    let cols = width / resolution;
    let rows = height / resolution;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x1 = i / cols;
            let x2 = j / rows;
            let inputs = [x1, x2];
            let y = nn.predict(inputs);
            noStroke();
            fill(y * 255);
            rect(i * resolution, j * resolution, resolution, resolution);
        }
    }



}