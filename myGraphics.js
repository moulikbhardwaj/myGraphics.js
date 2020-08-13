(function () {
    {
        if (document.getElementById("canvas") === null) {
            const canvas = document.createElement("canvas");
            canvas.width = 480;
            canvas.height = 320;
            canvas.id = "canvas";
            document.getElementsByTagName("body")[0].appendChild(canvas);
        }
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        var Framerate = 60;
        const globalStyle = {};
        var color = "rgba(0,0,0,1)";
        var lineWidth = 1;

        var cachedData = {};
        var animationFrame = 0;
        var lastFrame, startTime;

        this.setup = () => {
            ctx.clearRect(0, 0, width, height);
            strokeRect(0, 0, width - 1, height - 1);
        }

        this.setStyle = (style) => {
            const stylekeys = Object.keys(style);
            const ctxKeys = Object.keys(Object.getPrototypeOf(ctx));
            const keys = stylekeys.filter(e => { return ctxKeys.indexOf(e) > -1; });
            for (key of keys) {
                ctx[key] = style[key];
            }
        }

        this.line = (x1, y1, x2, y2, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
        }

        this.strokeRect = (x1, y1, w, h, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath();
            ctx.rect(x1, y1, w, h);
            ctx.stroke();
            ctx.restore();
        }

        this.fillRect = (x1, y1, w, h, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath();
            ctx.rect(x1, y1, w, h);
            ctx.fill();
            ctx.restore();
        }

        this.point = (x, y, size=1, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath()
            ctx.rect(x, y, size, size);
            ctx.fill();
            ctx.restore();
        }

        this.strokeCircle = (x, y, r, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath()
            ctx.arc(x, y, r, 0, style.angle || Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        this.fillCircle = (x, y, r, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath()
            ctx.arc(x, y, r, 0, style.angle || Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        this.strokeEllipse = (x, y, r1, r2, style) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath()
            ctx.ellipse(x, y, r1, r2, 0, style.angle || Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        this.fillEllipse = (x, y, r1, r2, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath()
            ctx.ellipse(x, y, r1, r2, style.rotation || 0, 0, style.angle || Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        this.strokeTriangle = (x1, y1, x2, y2, x3, y3, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath()
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }

        this.fillTriangle = (x1, y1, x2, y2, x3, y3, style = {}) => {
            ctx.save();
            setStyle(style);
            ctx.beginPath()
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        }

        this.text = (text, x, y, style = {}) => {
            ctx.save();
            setStyle(style);
            if (style.maxWidth) {
                ctx.strokeText(text, x, y, style.maxWidth);
            }
            else {
                ctx.strokeText(text, x, y);
            }
            ctx.restore();
        }

        this.background = (color) => {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(0, 0, width, height);
            ctx.fill();
            ctx.restore();
        }

        this.image = (src, dx, dy, style = {}) => {
            if (typeof src == "string") {
                if (cachedData[src] == undefined) {
                    const img = cachedData[src] || document.createElement("img");
                    img.src = src;

                    img.addEventListener("load", e => {
                        cachedData[src] = img;
                        ctx.save();
                        setStyle(style);
                        ctx.drawImage(img, dx, dy);
                        ctx.restore();
                    });
                }
                else {
                    ctx.save();
                    setStyle(style);
                    ctx.drawImage(cachedData[src], dx, dy);
                    ctx.restore();
                }
            }
            else if (src != null && typeof src === "object") {
                ctx.save();
                setStyle(style);
                ctx.drawImage(img, dx, dy);
                ctx.restore();
            }
        }


        this.doLoop = () => {
            startTime = window.performance.now();
            lastFrame = window.performance.now();
            animationFrame = requestAnimationFrame(loop);
        }

        this.noLoop = () => {
            cancelAnimationFrame(animationFrame);
            lastFrame = undefined;
            startTime = undefined;
            animationFrame = undefined;
        }
        this.draw = () => {

        };

        this.loop = (time) => {
            if(startTime === undefined){
                startTime = time;
                lastFrame = 0;
            }
            else{
                const curFrame = time-startTime;
                draw(curFrame-lastFrame);
                lastFrame=curFrame;
            }
            animationFrame = requestAnimationFrame(loop);
        }
        
        this.framerate = (fps) => {
            Framerate = fps;
        }
        this.doLoop();
    }
}());