let width = 800;
let height = 400;
let index = 0;

function setup() {
    let cv = createCanvas(width, height);
    cv.parent("canvas");
    background(255, 255, 255);
}

function draw() {
    rect(0, 0, width, height);
    stroke(255, 124, 0);
    strokeWeight(2);
    fill(230, 230, 160);
    rect(0, 0, width, height);

    stroke(126);
    line(0, 0, width, height);

    fill(120, 30, 60);
    ellipse(50, 50, 20, 10);

    index += 1;
    writeText(index);
    //noLoop();
}

function writeText(txt) {
    document.getElementById("writeArea").innerHTML = txt;
}