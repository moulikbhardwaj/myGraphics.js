
if (document.getElementById("canvas") === null) {
    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 320;
    canvas.id = "canvas";
    document.getElementsByTagName("body")[0].appendChild(canvas);
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
var Framerate = 60;
var color = "rgba(0,0,0,1)";
var lineWidth = 1;

var doLoop = true;
var now, before = Date.now();

function setup() {
    ctx.clearRect(0, 0, width, height);
    strokeRect(0, 0, width - 1, height - 1);
}

function line(x1, y1, x2, y2, style) {
    ctx.save();
    style = style || {};
    ctx.strokeStyle = style.color || color;
    ctx.lineWidth = style.lineWidth || lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

function strokeRect(x1, y1, w, h, style) {
    ctx.save();
    style = style || {};
    ctx.strokeStyle = style.color || color;
    ctx.lineWidth = style.lineWidth || lineWidth;
    ctx.beginPath();
    ctx.rect(x1, y1, w, h);
    ctx.stroke();
    ctx.restore();
}

function fillRect(x1, y1, w, h, style) {
    ctx.save();
    style = style || {};
    ctx.fillStyle = style.style.color || color;
    ctx.lineWidth = style.lineWidth || lineWidth;
    ctx.beginPath();
    ctx.rect(x1, y1, w, h);
    ctx.fill();
    ctx.restore();
}

function point(x, y, style) {
    ctx.save();
    style = style || {};
    ctx.fillStyle = style.style.color || color;
    ctx.lineWidth = style.lineWidth || lineWidth;
    ctx.beginPath()
    ctx.rect(x, y, 1, 1);
    ctx.fill();
    ctx.restore();
}

function strokeCircle(x, y, r, style) {
    ctx.save();
    style = style || {};
    ctx.strokeStyle = style.color || color;
    ctx.lineWidth = style.lineWidth || lineWidth;
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function fillCircle(x, y, r, style) {
    ctx.save();
    style = style || {};
    ctx.fillStyle = style.color || color;
    ctx.lineWidth = style.lineWidth || lineWidth;
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function strokeEllipse(x, y, r1, r2, style){
    ctx.save();
    style = style || {};
    ctx.strokeStyle = style.color || color;
    ctx.lineWidth = style.lineWidth || lineWidth;
    ctx.beginPath()
    ctx.ellipse(x, y, r1, r2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function fillEllipse(x, y, r1, r2, style) {
    ctx.save();
    style = style || {};
    ctx.fillStyle = style.color || color;
    ctx.lineWidth = style.lineWidth || lineWidth;
    ctx.beginPath()
    ctx.ellipse(x, y, r1, r2, style.rotation||0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function background(fillStyle) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.rect(0,0,width,height);
    ctx.fill();
    ctx.restore();
}

function doLoop(){
    doLoop = true;
}

function noLoop(){
    doLoop = false;
}

var draw = function(delta){

};

requestAnimationFrame(function loop(){
    requestAnimationFrame(loop);
    now = Date.now();
    const fps = 1000/Math.round(now-before);
    if(doLoop && fps<=Framerate){
        draw(Math.round(now-before));
        before = now;
    }
})

function framerate(fps){
    Framerate = fps;
}