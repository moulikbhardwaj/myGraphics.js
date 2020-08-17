setup();
const fps = document.createElement("div");
var m_delta = 16;

function map(num, fromMin, fromMax, toMin, toMax){
    return (num-fromMin)*(toMax-toMin)/(fromMax-fromMin) + toMin;
}

offset = {x:0, y:0};

rectangle = {};
rectangle.width = 100;
rectangle.height = 100;
rectangle.x = 0;
rectangle.y = 0;
rectangle.draw = (offset)=>{
    fillRect(rectangle.x + offset.x, rectangle.y + offset.y, rectangle.width, rectangle.height, {fillStyle:"red"});
};

setInterval(()=>{fps.textContent=Math.floor(1000/m_delta);},1000);
document.getElementsByTagName("body")[0].appendChild(fps);



draw = (delta)=>{
    // d key press
    if(keyPressed(68)){offset.x +=delta*.1;};

    // a key pressed
    if(keyPressed(65)){offset.x -=delta*.1};

    // w key pressed
    if(keyPressed(87)){offset.y -=delta*.1};

    // s key pressed
    if(keyPressed(83)){offset.y +=delta*.1};
    m_delta = delta;
    background("#333333FF");
    setStyle({strokeStyle:'white', lineCap:"round", lineWidth:1, fillStyle:"white"})
    rectangle.draw(offset);
}