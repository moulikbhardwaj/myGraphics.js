setup();
const fps = document.createElement("div");
var m_delta = 16;

function map(num, fromMin, fromMax, toMin, toMax){
    return (num-fromMin)*(toMax-toMin)/(fromMax-fromMin) + toMin;
}

class box{
    constructor(edgeLength, mass, pos = {}, velocity = {}){
        this.mass = mass;
        if(velocity.x === undefined){velocity.x = map(Math.random(),0,1,-.5,.5);}
        if(velocity.y === undefined){velocity.y = map(Math.random(),0,1,-.5,.5);}
        if(pos.x === undefined){pos.x = Math.random()*width;}
        if(pos.y === undefined){pos.y = Math.random()*height;}
        this.velocity = velocity;
        this.pos = pos;
        this.tmp = {x:0,y:0};
        this.edgeLength = edgeLength;
    }
    draw(delta){
        this.tmp.y = this.pos.y + this.velocity.y * delta;
        this.tmp.x = this.pos.x + this.velocity.x * delta;
        if (this.tmp.y + this.edgeLength > height) {
            this.tmp.y = height - this.edgeLength;
            this.velocity.y = -Math.abs(this.velocity.y);
        }
        else if (this.tmp.y < 0) {
            this.tmp.y = 0;
            this.velocity.y = Math.abs(this.velocity.y);
        }
        if (this.tmp.x + this.edgeLength > width) {
            this.tmp.x = width - this.edgeLength;
            this.velocity.x = -Math.abs(this.velocity.x);
        }
        else if (this.tmp.x < 0) {
            this.tmp.x = 0;
            this.velocity.x = Math.abs(this.velocity.x);
        }
        this.pos.x = this.tmp.x;
        this.pos.y = this.tmp.y;
        point(this.pos.x, this.pos.y, this.edgeLength);
    }
    checkCollision(that){
        if(this.pos.x < (that.pos.x + that.edgeLength) && 
        (this.pos.x + this.edgeLength) > (that.pos.x) &&
        this.pos.y < (that.pos.y + that.edgeLength) && 
        (this.pos.y + this.edgeLength) > (that.pos.y)){
            console.log("Collision Detected");
            const fn = (ths,that) =>{
                    return subtract(ths.velocity,
                        multiply(
                            (2*that.mass/(ths.mass+that.mass))*dot(subtract(ths.velocity,that.velocity),subtract(ths.pos,that.pos))/modSq(subtract(ths.pos,that.pos)),
                            subtract(ths.pos,that.pos)
                        )
                    );

            }
            var tmpa = fn(this, that);
            var tmpb = fn(that, this);
            this.velocity.x = tmpa.x;
            this.velocity.y = tmpa.y;
            that.velocity.x = tmpb.x;
            that.velocity.y = tmpb.y;
        }
    }
}
function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}

function modSq(a){
    return a.x*a.x+a.y*a.y
}

function subtract(a,b){
    return {x:a.x-b.x,y:a.y-b.y};
}

function dot(a, b){
    return a.x*b.x + a.y*b.y;
}

function multiply(scalar, pos){
    return {x:pos.x*scalar, y:pos.y*scalar};
}

function divide(scalar, pos) {
    return { x: pos.x / scalar, y: pos.y / scalar };
}


setInterval(()=>{fps.textContent=Math.floor(1000/m_delta);},1000);
document.getElementsByTagName("body")[0].appendChild(fps);
var edgeLength = 10;

var boxes = [];
for(let i = 0; i < 20; i++){
    boxes.push(new box(map(Math.random(),0,1,5,30), Math.random()*4+1));
}


draw = (delta)=>{
    m_delta = delta;
    background("#333333FF");
    setStyle({strokeStyle:'white', lineCap:"round", lineWidth:1, fillStyle:"white"})
    for(let l = 0; l < boxes.length; l++){
        if(boxes[l])
        boxes[l].draw(delta);
    }
    for(let i = 0; i < boxes.length; i++){
        for(let j = i+1; j < boxes.length; j++){
            boxes[i].checkCollision(boxes[j]);
        }
    }
    
}