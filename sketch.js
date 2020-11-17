// This will classify your image and display a rainbow on this gesture
// ‾\..()../‾

/*IMPORTANT! 
  You have to train your own model.
  Depending on that you can ofc also change the gesture :)
*/


/* ===
Based on:
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;

// Model URL
// classes: rainbow, me, empty
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/WKbRoq_kR/' // TRAIN THIS A NEW!

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let gif_rainbow = {};

gif_rainbow.fadeOut = 0;
gif_rainbow.fadeIn = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  gif_rainbow.image = createImg("img/rainbow.gif");
}

function setup() {
  createCanvas(680, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);
  
  //reset labels
  if (gif_rainbow.fadeOut < -5000) {
    gif_rainbow.fadeOut = 0;
  }
  if (gif_rainbow.fadeIn > 5000) {
    gif_rainbow.fadeIn = 0;
  }
  
  if (label == 'rainbow' ) {
    gif_rainbow.fadeOut = 255;
    gif_rainbow.fadeIn += 1;
  } 
  else {
    gif_rainbow.fadeIn = 0;
    gif_rainbow.fadeOut -= 50;
  }

  if(gif_rainbow.fadeOut < 0) {
    gif_rainbow.image.hide();
  }

  // check variables for show/not show
  if (gif_rainbow.fadeOut > 0 && gif_rainbow.fadeIn >= 10)  {
    gif_rainbow.image.show();
    gif_rainbow.image.position(25, 50);
    gif_rainbow.image.size(600, 300);
  }

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  //console.log(results[0]);
  label = results[0].label;
  // Classify again!
  classifyVideo();
  flippedVideo.remove() 
}