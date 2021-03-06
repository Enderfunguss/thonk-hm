var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
function start(){
    document.getElementById('textBox').innerHTML = "";
    recognition.start();
}
recognition.onresult = function(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById('textBox').innerHTML = content;
    console.log(content);
    if(content == "take my selfie"){
        console.log('Taking selfie');
        speak();
    }
};
function speak(){
    var synth = window.speechSynthesis;
    speakData = "Taking your selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function(){
        takeSnapshot();
        save();
    },5000);
}
Webcam.set({
    width:720,
    height:480,
    imageFormat:"png",
    pngQuality: 100
});
camera = document.getElementById('camera');
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = "<img id='selfie_image' width='720' height='480' src='" + data_uri + "'>"; 
    });
}
function save(){
    link = document.getElementById('link');
    image = document.getElementById('selfie_image').src;
    link.href = image;
    link.click();
}