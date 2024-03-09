const clearBtn = document.querySelector("#btnLimpar");
const canvas = document.querySelector("#myCanvas");
const data = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> <defs> <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"> <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#f0f0f0" stroke-width="0.5" /> </pattern> <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"> <rect width="80" height="80" fill="url(#smallGrid)" /> <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#f0f0f0" stroke-width="1" /> </pattern> </defs> <rect width="100%" height="100%" fill="url(#grid)" /> </svg>';

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
clear();

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [x, y] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.lineWidth = 10;
});
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousemove', draw);
clearBtn.addEventListener('click', clear)

let [x, y, hue] = [0, 0, 0];
let isDrawing = false;

function draw(e) {
    if (!isDrawing) return;

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [x, y] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) hue = 0;

    if(ctx.lineWidth < 50) ctx.lineWidth++;
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = 'data:image/svg+xml,' + encodeURIComponent(data);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
}
