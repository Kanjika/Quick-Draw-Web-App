quick_draw_data_set = ["aircraft carrier", "airplane", "alarm clock", "ambulance", "angel", "animal migration", "ant", "anvil", "apple", "arm", "asparagus", "axe", "backpack", "banana", "bandage", "barn", "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach", "bear", "beard", "bed", "bee", "belt", "bench", "bicycle", "binoculars", "bird", "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie", "bracelet", "brain", "bread", "bridge", "broccoli", "broom", "bucket", "bulldozer", "bus", "bush", "butterfly", "cactus", "cake", "calculator", "calendar", "camel", "camera", "camouflage", "campfire", "candle", "cannon", "canoe", "car", "carrot", "castle", "cat", "ceiling fan", "cello", "cell phone", "chair", "chandelier", "church", "circle", "clarinet", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler", "couch", "cow", "crab", "crayon", "crocodile", "crown", "cruise ship", "cup", "diamond", "dishwasher", "diving board", "dog", "dolphin", "donut", "door", "dragon", "dresser", "drill", "drums", "duck", "dumbbell", "ear", "elbow", "elephant", "envelope"]

random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);

sketch = quick_draw_data_set[random_number]

document.getElementById("sketch_name").innerHTML = "Sketch to be drawn " + sketch

var score = 0;
var timer_check = "";
var timer_counter = 0;
var drawn_sketch = "";
var answer_holder = "";

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas)
}


function clearCanvas() {
    background("white");
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function updateCanvas() {
    background("white");

    random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);

    sketch = quick_draw_data_set[random_number]

    document.getElementById("sketch_name").innerHTML = "Sketch to be drawn " + sketch
}

function classifyCanvas()
{
    classifier.classify(canvas,gotresult)
}

function draw()
{
    strokeWeight(13)
    stroke(0)
    stroke(colour = "black")
    if (mouseIsPressed){
        line(pmouseX,pmouseY, mouseX,mosueY)
    }
check_sketch()
if (draw_sketch==sketch)
{
    answer_holder="set"
    score++
    document.getElementById("score").innerHTML = "Score" + score
}
}

function gotresult(error,results)
{
    if (error)
    {
        console.error(error);
    }
    
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById('label').innerHTML = 'Your Sketch : ' + drawn_sketch;
    document.getElementById('confidence').innerHTML = 'Confidence : ' + Math.round(results[0].confidence * 100)
}

function check_sketch()
{
    timer_counter++;
    document.getElementById('timer').innerHTML = 'Timer : ' + timer_counter;
    console.log(timer_counter)
    if(timer_counter > 400)
    {
        timer_counter = 0;
        timer_check = "completed"
    }
    if (timer_check == "completed" || answer_holder == "set")
    {
        timer_check = "";
        answer_holder = "";
        updateCanvas()
    }
}

