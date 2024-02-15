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
function drawDDA(x1, x2, y1, y2, tebal, warna) {
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
    ctx.fillStyle = warna;
    ctx.fillRect(Math.floor(x), Math.floor(y), tebal, tebal);

    x += incX;
    y += incY;
  }
}
let xTengah = window.innerWidth / 2;
let yTengah = window.innerHeight / 2;

window.addEventListener("resize", () => {
  kertas.width = window.innerWidth;
  kertas.height = window.innerHeight;
  
  xTengah = window.innerWidth / 2;
  yTengah = window.innerHeight / 2;

});

//
function koorX(x) {
  return Math.floor(window.innerWidth / 2) + x * -1;
}
function koorY(y) {
  return Math.floor(window.innerHeight / 2) + y * -1;
}

function jarakBayang(jarakBenda, titikF) {
  return (jarakBay = (jarakBenda * titikF) / (jarakBenda - titikF));
}

function tinggiBayang(jarakBenda, tinggiBenda, jarakBayang) {
  return (tinggiBay = (jarakBayang / jarakBenda) * tinggiBenda);
}

jarakBenda = 300;
tinggiBenda = 150;
titikF = 100;

//
function drawCircle(cX, cY, r, bold) {
  let x = r;
  let y = 0;
  let rError = 1 - x;
  while (x >= y) {
    drawPix(cX + x, cY - y, bold);
    drawPix(cX - x, cY - y, bold);
    drawPix(cX + x, cY + y, bold);
    drawPix(cX - x, cY + y, bold);
    drawPix(cX + y, cY - x, bold);
    drawPix(cX - y, cY - x, bold);
    drawPix(cX + y, cY + x, bold);
    drawPix(cX - y, cY + x, bold);
    y++;

    if (rError < 0) {
      rError += 2 * y + 1;
    } else {
      x--;
      rError += 2 * (y - x) + 1;
    }
  }
}
function drawPix(x, y, bold) {
  ctx.fillRect(x, y, bold, bold);
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
  drawDDA(koorX(x1), koorX(x2), koorY(y1), koorY(y2), 5, "black");
  drawCircle(koorX(x1), koory(y1), 100, 5);
}
// drawDDA(300, 300, 1, 600);

// Mulai Menggabar garis koordinat
drawDDA(xTengah, xTengah, 0, yTengah*2, 2, "red");
drawDDA(0, xTengah*2, yTengah, yTengah, 2, "red");

// menggambar titik fokus
ctx.fillRect(koorX(titikF), koorY(0), 7, 7);
drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
