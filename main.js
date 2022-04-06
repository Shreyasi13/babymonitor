objects=[];
status1= ""
sound= ""
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380)
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}
img=""
function preload(){
    img= loadImage('dog_cat.jpg')
    sound= loadSound("alarm.mp3")
}
function draw(){
    image(video, 0,0,380,380);
    if(status1 !=""){
        r= random(225)
        g= random(225) 
        b= random(225)
        objectDetector.detect(video, gotresult);
for(i=0; i < objects.length; i++){

    document.getElementById("status").innerHTML = "Status : Object Detected";
person1 = objects[i].label;
if(person1 == "person"){
    document.getElementById("number_of_objects").innerHTML= "baby is found ";
    fill(r,g,b);
    percent = floor(objects[i].confidence*100);
    text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y );
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
} else {
    document.getElementById("number_of_objects").innerHTML= "baby is not found";
    sound.play();
}
if(person1 == ""){
    document.getElementById("number_of_objects").innerHTML= "baby is not found";
    sound.play();
}
    
}
    }
}

function modelLoaded(){
    console.log("MODEL LOADED!")
    status1 =true;

}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects= results;
    
}