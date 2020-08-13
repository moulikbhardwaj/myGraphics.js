setup();
var pr = 0;
var sign = 1;
var speed = {x:(Math.random()-0.3), y:(Math.random()-0.3)};
var pos = {x:200,y:0};
var tmp = {};
const fps = document.createElement("div");
var m_delta = 16;
setInterval(()=>{fps.textContent=Math.floor(1000/m_delta);},1000);
document.getElementsByTagName("body")[0].appendChild(fps);
var edgeLength = 10;
draw = (delta)=>{
    m_delta = delta;
    background("#333333FF");
    setStyle({strokeStyle:'white', lineCap:"round", lineWidth:10, fillStyle:"white"})
    tmp.y = pos.y + speed.y*delta;
    tmp.x = pos.x + speed.x*delta;
    if(tmp.y+edgeLength>height){
        tmp.y = height-edgeLength;
        speed.y = -Math.abs(speed.y);
    }
    else if(tmp.y<0){
        tmp.y = 0;
        speed.y = Math.abs(speed.y);
    }
    if(tmp.x+edgeLength>width){
        tmp.x = width-edgeLength;
        speed.x = -Math.abs(speed.x);
    } 
    else if(tmp.x < 0){
        tmp.x = 0;
        speed.x = Math.abs(speed.x);
    }
    pos.x = tmp.x;
    pos.y = tmp.y;
    point(pos.x, pos.y,edgeLength);
}