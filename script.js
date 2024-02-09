/**
 * Description
 * @type {HTMLCanvasElement} ".kertas"
 *
 */

const kertas = document.querySelector(".kertas");
const ctx = kertas.getContext("2d");

const valueSlider = document.querySelector(".x1");
const valueSlider1 = document.querySelector(".x2");

const valueSlider2 = document.querySelector(".y1");
const valueSlider3 = document.querySelector(".y2");
valueSlider.setAttribute("max", `${window.innerWidth / 50}`);
valueSlider1.setAttribute("max", `${window.innerWidth / 50}`);
valueSlider2.setAttribute("max", `${window.innerHeight / 50}`);
valueSlider3.setAttribute("max", `${window.innerHeight / 50}`);

kertas.width = window.innerWidth;
kertas.height = window.innerHeight;
function drawDDA(x1, x2, y1, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (Math.abs(dx) > Math.abs(dy)) {
    steps = Math.abs(dx);
  } else {
    steps = Math.abs(dy);
  }

  // if ((steps = 0)) {
  //   let incX = 0;
  //   let incY = 0;
  // } else {
  let incX = dx / steps;
  let incY = dy / steps;
  // }
  let x = x1;
  let y = y1;
  for (let i = 0; i < steps; i++) {
    ctx.fillStyle = "red";
    ctx.fillRect(Math.floor(x), Math.floor(y), 5, 5);

    x += incX;
    y += incY;
  }
}

function drawCircle(cX, cY, r) {
  let x = r;
  let y = 0;
  let rError = 1 - x;
  while (x >= y) {
    drawPix(cX + x, cY - y);
    drawPix(cX - x, cY - y);
    drawPix(cX + x, cY + y);
    drawPix(cX - x, cY + y);
    drawPix(cX + y, cY - x);
    drawPix(cX - y, cY - x);
    drawPix(cX + y, cY + x);
    drawPix(cX - y, cY + x);
    y++;

    if (rError < 0) {
      rError += 2 * y + 1;
    } else {
      x--;
      rError += 2 * (y - x) + 1;
    }
  }
}
function drawPix(x, y) {
  ctx.fillRect(x, y, 5, 5);
}

function slider() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  x1 = Number(document.querySelector(".x1").value);
  x2 = Number(document.querySelector(".x2").value);
  y1 = Number(document.querySelector(".y1").value);
  y2 = Number(document.querySelector(".y2").value);
  x1 = x1 * 50;
  x2 = x2 * 50;
  y1 *= 50;
  y2 *= 50;
  ctx.reset;
  drawDDA(x1, x2, y1, y2);
  drawCircle(x1,y1,100)
}
drawDDA(300, 300, 1, 600);

