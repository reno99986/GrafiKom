/**
 * Description
 * @type {HTMLCanvasElement} ".kertas"
 *
 */

const tombolCekung = document.querySelector(".cekung");

const tombolCembung = document.querySelector(".cembung");

tombolCekung.addEventListener("click", function () {
  sliderCekung();
  valueSlider.setAttribute("oninput", "sliderCekung()");
  valueSlider1.setAttribute("oninput", "sliderCekung()");
  valueSlider2.setAttribute("oninput", "sliderCekung()");
});
tombolCembung.addEventListener("click", function () {
  sliderCembung();
  valueSlider.setAttribute("oninput", "sliderCembung()");
  valueSlider1.setAttribute("oninput", "sliderCembung()");
  valueSlider2.setAttribute("oninput", "sliderCembung()");
});

const kertas = document.querySelector(".kertas");
const ctx = kertas.getContext("2d");

const valueSlider = document.querySelector(".jarakBenda");
const valueSlider1 = document.querySelector(".tinggiBenda");

const valueSlider2 = document.querySelector(".jarakFokus");
const popup = document.querySelector(".popup");
// const valueSlider3 = document.querySelector(".y2");
valueSlider.setAttribute("max", `${window.innerWidth / 2}`);
valueSlider1.setAttribute("max", `${window.innerHeight}`);
// valueSlider2.setAttribute("min", `${-(window.innerHeight / 2)}`);
valueSlider2.setAttribute("max", `${window.innerWidth}`);

valueSlider.setAttribute("value", `500`);
valueSlider1.setAttribute("value", `${window.innerHeight / 4}`);
valueSlider2.setAttribute("value", `250`);

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

function clearDDA(x1, x2, y1, y2, tebal) {
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
    ctx.clearRect(Math.floor(x), Math.floor(y), tebal, tebal);

    x += incX;
    y += incY;
  }
}

function drawDDA_Continue(x1, x2, y1, y2, tebal, warna) {
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
  for (let i = 0; i < steps + window.innerWidth + window.innerHeight; i++) {
    ctx.fillStyle = warna;
    ctx.fillRect(Math.floor(x), Math.floor(y), tebal, tebal);

    x += incX;
    y += incY;
  }
}

function drawDDA_Dashed(x1, x2, y1, y2, tebal, warna) {
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
    let nopix = false;
    if (i % 8 === 0) {
      nopix = true;
    } else {
      nopix = false;
    }
    if (nopix === false) {
      ctx.fillStyle = warna;
      ctx.fillRect(Math.floor(x), Math.floor(y), 1, tebal);

      x += incX;
      y += incY;
    } else {
      x += incX;
      y += incY;
    }
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
  return (jarakBenda * titikF) / (jarakBenda - titikF);
}

function tinggiBayang(jarakBenda, tinggiBenda, jarakBayang) {
  return (jarakBayang / jarakBenda) * tinggiBenda;
}
function drawAllCircle(cX, cY, r, bold) {
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
//
function drawfillCircle(cX, cY, r, bold) {
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
    r--;

    if (rError < 0) {
      rError += 2 * y + 1;
    } else {
      x--;
      rError += 2 * (y - x) + 1;
    }
  }
}
//
function drawPartCircle(cX, cY, r, bold) {
  let x = r;
  let y = 0;
  let rError = 1 - x;
  while (x >= y) {
    drawPix(cX + x, cY - y, bold);
    // drawPix(cX - x, cY - y, bold);
    drawPix(cX + x, cY + y, bold);
    // drawPix(cX - x, cY + y, bold);
    // drawPix(cX + y, cY - x, bold);
    // drawPix(cX - y, cY - x, bold);
    // drawPix(cX + y, cY + x, bold);
    // drawPix(cX - y, cY + x, bold);
    y++;

    if (rError < 0) {
      rError += 2 * y + 1;
    } else {
      x--;
      rError += 2 * (y - x) + 1;
    }
  }
}

function drawPartCircleInverted(cX, cY, r, bold) {
  let x = r;
  let y = 0;
  let rError = 1 - x;
  while (x >= y) {
    // drawPix(cX + x, cY - y, bold);
    drawPix(cX - x, cY - y, bold);
    // drawPix(cX + x, cY + y, bold);
    drawPix(cX - x, cY + y, bold);
    // drawPix(cX + y, cY - x, bold);
    // drawPix(cX - y, cY - x, bold);
    // drawPix(cX + y, cY + x, bold);
    // drawPix(cX - y, cY + x, bold);
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
  ctx.fillStyle = "#224400";
  ctx.fillRect(x, y, bold, bold);
}
function tulisText(x, y, text, color, size) {
  ctx.font = `${size}px Arial`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
l = Number(document.querySelector(".jarakBenda").value);
h = koorY(Number(document.querySelector(".tinggiBenda").value));
f = Number(document.querySelector(".jarakFokus").value);
let jarakBenda = l;
let tinggiBenda = h;
let titikF = f;

function sliderCekung() {
  l = Number(document.querySelector(".jarakBenda").value);
  h = koorY(Number(document.querySelector(".tinggiBenda").value));
  f = Number(document.querySelector(".jarakFokus").value);
  jarakBenda = l;
  tinggiBenda = h;
  titikF = f;

  if (jarakBenda === titikF) {
    var shadowHeight = 0;
    var shadowLength = 0;
  } else {
    var shadowLength = (jarakBenda * titikF) / (jarakBenda - titikF);
    var shadowHeight = (shadowLength / jarakBenda) * tinggiBenda;
  }

  if (jarakBenda > titikF) {
    popup.style.display = "none";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // shadow = jarakBayang(jarakBenda,titikF)
    // shadowHeight = tinggiBayang(jarakBenda,tinggiBenda,shadow)
    // Mulai Menggabar garis koordinat
    drawDDA(xTengah, xTengah, 0, yTengah * 2, 6, "red");
    drawDDA(0, xTengah * 2, yTengah, yTengah, 6, "red");

    // menggambar titik fokus
    drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - titikF, yTengah - 5, "F", "green", 20);
    //menggambar curvature
    drawDDA(
      koorX(titikF * 2),
      koorX(titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - titikF * 2, yTengah - 5, "C", "green", 20);

    //menggambar benda
    drawDDA(
      koorX(jarakBenda),
      koorX(jarakBenda),
      koorY(0),
      koorY(tinggiBenda),
      7,
      "blue"
    );
    drawDDA(
      koorX(jarakBenda + 50),
      koorX(jarakBenda + 50),
      koorY(0),
      koorY(tinggiBenda),
      7,
      "blue"
    );
    drawDDA(
      koorX(jarakBenda + 50),
      koorX(jarakBenda),
      koorY(tinggiBenda),
      koorY(tinggiBenda),
      7,
      "blue"
    );
    drawDDA(
      koorX(jarakBenda + 50),
      koorX(jarakBenda),
      koorY(0),
      koorY(0),
      7,
      "blue"
    );
    //menggambar bayangan
    drawDDA(
      koorX(shadowLength),
      koorX(shadowLength),
      koorY(0),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength + 50),
      koorX(shadowLength + 50),
      koorY(0),
      koorY(-shadowHeight),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength + 50),
      koorX(shadowLength),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      8,
      "orange"
    );
    drawDDA(
      koorX(shadowLength + 50),
      koorX(shadowLength),
      koorY(0),
      koorY(0),
      5,
      "orange"
    );
    //Mengambar lingkaran kurvature
    drawPartCircle(koorX(2 * titikF), koorY(0), 2 * titikF, 5);

    //menggambar garis istimewa 1
    drawDDA(0, xTengah, koorY(tinggiBenda), koorY(tinggiBenda), 5, "purple");
    drawDDA(koorX(0), koorX(titikF), koorY(tinggiBenda), koorY(0), 5, "purple");
    drawDDA(
      koorX(titikF),
      koorX(shadowLength),
      koorY(0),
      koorY(-shadowHeight),
      5,
      "purple"
    );

    //menggambar garis istimewa 2
    drawDDA_Continue(
      koorX(titikF),
      koorX(jarakBenda),
      koorY(0),
      koorY(tinggiBenda),
      5,
      "grey"
    );
    drawDDA(koorX(titikF), koorX(0), koorY(0), koorY(-shadowHeight), 5, "grey");
    drawDDA(
      koorX(0),
      koorX(window.innerWidth / 2),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );
  } else {
    popup.style.display = "none";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // shadow = jarakBayang(jarakBenda,titikF)
    // shadowHeight = tinggiBayang(jarakBenda,tinggiBenda,shadow)
    // Mulai Menggabar garis koordinat
    drawDDA(xTengah, xTengah, 0, yTengah * 2, 6, "red");
    drawDDA(0, xTengah * 2, yTengah, yTengah, 6, "red");

    // menggambar titik fokus
    drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - titikF, yTengah - 5, "F", "green", 20);
    //menggambar curvature
    drawDDA(
      koorX(titikF * 2),
      koorX(titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - titikF * 2, yTengah - 5, "C", "green", 20);

    //menggambar benda
    drawDDA(
      koorX(jarakBenda),
      koorX(jarakBenda),
      koorY(0),
      koorY(tinggiBenda),
      7,
      "blue"
    );
    drawDDA(
      koorX(jarakBenda + 50),
      koorX(jarakBenda + 50),
      koorY(0),
      koorY(tinggiBenda),
      7,
      "blue"
    );
    drawDDA(
      koorX(jarakBenda + 50),
      koorX(jarakBenda),
      koorY(tinggiBenda),
      koorY(tinggiBenda),
      7,
      "blue"
    );
    drawDDA(
      koorX(jarakBenda + 50),
      koorX(jarakBenda),
      koorY(0),
      koorY(0),
      7,
      "blue"
    );
    //menggambar bayangan
    drawDDA(
      koorX(shadowLength),
      koorX(shadowLength),
      koorY(0),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength + 50),
      koorX(shadowLength + 50),
      koorY(0),
      koorY(-shadowHeight),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength + 50),
      koorX(shadowLength),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      8,
      "orange"
    );
    drawDDA(
      koorX(shadowLength + 50),
      koorX(shadowLength),
      koorY(0),
      koorY(0),
      5,
      "orange"
    );
    //Mengambar lingkaran kurvature
    drawPartCircle(koorX(2 * titikF), koorY(0), 2 * titikF, 5);

    //menggambar garis istimewa 1
    drawDDA(0, xTengah, koorY(tinggiBenda), koorY(tinggiBenda), 5, "purple");
    drawDDA_Continue(
      koorX(0),
      koorX(titikF),
      koorY(tinggiBenda),
      koorY(0),
      5,
      "purple"
    );

    drawDDA_Dashed(
      koorX(titikF),
      koorX(shadowLength),
      koorY(0),
      koorY(-shadowHeight),
      5,
      "purple"
    );

    //menggambar garis istimewa 2
    drawDDA(koorX(titikF), koorX(0), koorY(0), koorY(-shadowHeight), 5, "grey");
    drawDDA(
      koorX(window.innerWidth / 2),
      koorX(0),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );
    drawDDA_Continue(
      koorX(0),
      koorX(titikF),
      koorY(-shadowHeight),
      koorY(0),
      5,
      "grey"
    );
    drawDDA_Dashed(
      koorX(0),
      koorX(shadowLength),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );

    // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // popup.style.display = "flex";
  }
}
//nambah makin jauh
//kurang mkin tinggi

window.onload = sliderCembung();

// todo: Memperindah objek, menambah fitur di depan titik fokus dan  cermin cembung

function sliderCembung() {
  l = Number(document.querySelector(".jarakBenda").value);
  h = koorY(Number(document.querySelector(".tinggiBenda").value));
  f = -Number(document.querySelector(".jarakFokus").value);
  jarakBenda = l;
  tinggiBenda = h;
  titikF = f;

  if (jarakBenda === titikF) {
    var shadowHeight = 0;
    var shadowLength = 0;
  } else {
    var shadowLength = (jarakBenda * titikF) / (jarakBenda - titikF);
    var shadowHeight = (shadowLength / jarakBenda) * tinggiBenda;
  }

  // if (jarakBenda > titikF) {
  popup.style.display = "none";
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // shadow = jarakBayang(jarakBenda,titikF)
  // shadowHeight = tinggiBayang(jarakBenda,tinggiBenda,shadow)
  // Mulai Menggabar garis koordinat
  drawDDA(xTengah, xTengah, 0, yTengah * 2, 6, "red");
  drawDDA(0, xTengah * 2, yTengah, yTengah, 6, "red");
  //menggambar garis istimewa 1
  drawDDA(0, xTengah, koorY(tinggiBenda), koorY(tinggiBenda), 5, "purple");
  drawDDA_Continue(
    koorX(titikF),
    koorX(0),
    koorY(0),
    koorY(tinggiBenda),
    5,
    "purple"
  );
  clearDDA(koorX(0), koorX(titikF), koorY(tinggiBenda), koorY(0), 5);
  drawDDA_Dashed(
    koorX(0),
    koorX(titikF),
    koorY(tinggiBenda),
    koorY(0),
    5,
    "purple"
  );
    //menggambar garis istimewa 2
    drawDDA_Continue(
      koorX(titikF),
      koorX(jarakBenda),
      koorY(0),
      koorY(tinggiBenda),
      5,
      "grey"
    );
    clearDDA(koorX(titikF), koorX(0), koorY(0), koorY(-shadowHeight), 5, "grey");
    drawDDA_Dashed(
      koorX(shadowLength),
      koorX(0),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );
    drawDDA(
      koorX(0),
      koorX(window.innerWidth / 2),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );

  // menggambar titik fokus
  drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
  tulisText(xTengah - titikF, yTengah - 5, "F", "green", 20);
  //menggambar curvature
  drawDDA(
    koorX(titikF * 2),
    koorX(titikF * 2),
    koorY(1),
    koorY(-1),
    5,
    "green"
  );
  tulisText(xTengah - titikF * 2, yTengah - 5, "C", "green", 20);

  //menggambar benda
  drawDDA(
    koorX(jarakBenda),
    koorX(jarakBenda),
    koorY(0),
    koorY(tinggiBenda),
    7,
    "blue"
  );
  drawDDA(
    koorX(jarakBenda + 50),
    koorX(jarakBenda + 50),
    koorY(0),
    koorY(tinggiBenda),
    7,
    "blue"
  );
  drawDDA(
    koorX(jarakBenda + 50),
    koorX(jarakBenda),
    koorY(tinggiBenda),
    koorY(tinggiBenda),
    7,
    "blue"
  );
  drawDDA(
    koorX(jarakBenda + 50),
    koorX(jarakBenda),
    koorY(0),
    koorY(0),
    7,
    "blue"
  );
  //menggambar bayangan
  drawDDA(
    koorX(shadowLength),
    koorX(shadowLength),
    koorY(0),
    koorY(-shadowHeight),
    5,
    "orange"
  );
  drawDDA(
    koorX(shadowLength + 50),
    koorX(shadowLength + 50),
    koorY(0),
    koorY(-shadowHeight),
    5,
    "orange"
  );

  drawDDA(
    koorX(shadowLength + 50),
    koorX(shadowLength),
    koorY(-shadowHeight),
    koorY(-shadowHeight),
    8,
    "orange"
  );
  drawDDA(
    koorX(shadowLength + 50),
    koorX(shadowLength),
    koorY(0),
    koorY(0),
    5,
    "orange"
  );
  //Mengambar lingkaran kurvature
  drawPartCircleInverted(koorX(2 * titikF), koorY(0), -2 * titikF, 5);

  

  // drawDDA(
  //   koorX(titikF),
  //   koorX(shadowLength),
  //   koorY(0),
  //   koorY(-shadowHeight),
  //   5,
  //   "purple"
  // );


  // } else {
  // popup.style.display = "none";
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // // shadow = jarakBayang(jarakBenda,titikF)
  // // shadowHeight = tinggiBayang(jarakBenda,tinggiBenda,shadow)
  // // Mulai Menggabar garis koordinat
  // drawDDA(xTengah, xTengah, 0, yTengah * 2, 6, "red");
  // drawDDA(0, xTengah * 2, yTengah, yTengah, 6, "red");

  // // menggambar titik fokus
  // drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
  // tulisText(xTengah - titikF, yTengah - 5, "F", "green", 20);
  // //menggambar curvature
  // drawDDA(
  //   koorX(titikF * 2),
  //   koorX(titikF * 2),
  //   koorY(1),
  //   koorY(-1),
  //   5,
  //   "green"
  // );
  // tulisText(xTengah - titikF * 2, yTengah - 5, "C", "green", 20);

  // //menggambar benda
  // drawDDA(
  //   koorX(jarakBenda),
  //   koorX(jarakBenda),
  //   koorY(0),
  //   koorY(tinggiBenda),
  //   7,
  //   "blue"
  // );
  // drawDDA(
  //   koorX(jarakBenda + 50),
  //   koorX(jarakBenda + 50),
  //   koorY(0),
  //   koorY(tinggiBenda),
  //   7,
  //   "blue"
  // );
  // drawDDA(
  //   koorX(jarakBenda + 50),
  //   koorX(jarakBenda),
  //   koorY(tinggiBenda),
  //   koorY(tinggiBenda),
  //   7,
  //   "blue"
  // );
  // drawDDA(
  //   koorX(jarakBenda + 50),
  //   koorX(jarakBenda),
  //   koorY(0),
  //   koorY(0),
  //   7,
  //   "blue"
  // );
  // //menggambar bayangan
  // drawDDA(
  //   koorX(shadowLength),
  //   koorX(shadowLength),
  //   koorY(0),
  //   koorY(-shadowHeight),
  //   5,
  //   "orange"
  // );
  // drawDDA(
  //   koorX(shadowLength + 50),
  //   koorX(shadowLength + 50),
  //   koorY(0),
  //   koorY(-shadowHeight),
  //   5,
  //   "orange"
  // );

  // drawDDA(
  //   koorX(shadowLength + 50),
  //   koorX(shadowLength),
  //   koorY(-shadowHeight),
  //   koorY(-shadowHeight),
  //   8,
  //   "orange"
  // );
  // drawDDA(
  //   koorX(shadowLength + 50),
  //   koorX(shadowLength),
  //   koorY(0),
  //   koorY(0),
  //   5,
  //   "orange"
  // );
  // //Mengambar lingkaran kurvature
  // drawPartCircleInverted(koorX(2 * titikF), -koorY(0), 2 * titikF, 5);

  // //menggambar garis istimewa 1
  // drawDDA(0, xTengah, koorY(tinggiBenda), koorY(tinggiBenda), 5, "purple");
  // drawDDA_Continue(
  //   koorX(0),
  //   koorX(titikF),
  //   koorY(tinggiBenda),
  //   koorY(0),
  //   5,
  //   "purple"
  // );

  // drawDDA_Dashed(
  //   koorX(titikF),
  //   koorX(shadowLength),
  //   koorY(0),
  //   koorY(-shadowHeight),
  //   5,
  //   "purple"
  // );

  // //menggambar garis istimewa 2
  // drawDDA(koorX(titikF), koorX(0), koorY(0), koorY(-shadowHeight), 5, "grey");
  // drawDDA(
  //   koorX(window.innerWidth / 2),
  //   koorX(0),
  //   koorY(-shadowHeight),
  //   koorY(-shadowHeight),
  //   5,
  //   "grey"
  // );
  // drawDDA_Continue(
  //   koorX(0),
  //   koorX(titikF),
  //   koorY(-shadowHeight),
  //   koorY(0),
  //   5,
  //   "grey"
  // );
  // drawDDA_Dashed(
  //   koorX(0),
  //   koorX(shadowLength),
  //   koorY(-shadowHeight),
  //   koorY(-shadowHeight),
  //   5,
  //   "grey"
  // );

  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // popup.style.display = "flex";
//   drawfillCircle(koorX(jarakBenda),koorY(0),20,25)
// drawfillCircle(koorX(jarakBenda+jarakBenda*0.3),koorY(0),20,25)
// drawDDA(koorX(jarakBenda-jarakBenda*0.2),koorX(jarakBenda+jarakBenda*0.4),koorY(0),koorY(0),6,"black")
// drawDDA(koorX(jarakBenda+jarakBenda*0.4),koorX(jarakBenda+jarakBenda*0.42),koorY(0),koorY(jarakBenda/10),6,"black")
// drawDDA(koorX(jarakBenda-jarakBenda*0.2),koorX(jarakBenda-jarakBenda*0.2),koorY(0),koorY(jarakBenda/10),6,"black")
//line atas

// drawDDA(koorX(jarakBenda+jarakBenda*0.4),koorX(jarakBenda+jarakBenda*0.42),koorY(jarakBenda/4),koorY(jarakBenda/6),6,"black")
// drawDDA(koorX(jarakBenda-jarakBenda*0.2),koorX(jarakBenda-jarakBenda*0.1),koorY(jarakBenda/10),koorY(jarakBenda/10),6,"black")
// drawDDA(koorX(jarakBenda-jarakBenda/10),koorX(jarakBenda-jarakBenda/20),koorY(jarakBenda/10),koorY(jarakBenda/6),6,"black")
// drawDDA(koorX(jarakBenda-jarakBenda/20),koorX(jarakBenda+jarakBenda*0.4),koorY(jarakBenda/6),koorY(jarakBenda/6),6,"black")
// drawDDA(koorX(jarakBenda-jarakBenda/10),koorX(jarakBenda+jarakBenda*0.43),koorY(jarakBenda/10),koorY(jarakBenda/10),6,"black")
// drawDDA(koorX(jarakBenda-jarakBenda/10),koorX(jarakBenda-jarakBenda/20),koorY(jarakBenda/10),koorY(jarakBenda/6),6,"black")
// drawDDA(koorX(jarakBenda-jarakBenda*0.2),koorX(jarakBenda-jarakBenda*0.2),koorY(tinggiBenda),koorY(0),6,"black")
// drawPartCircle(koorX(jarakBenda-jarakBenda*0.05),koorY(tinggiBenda-tinggiBenda*0.8),koorX(jarakBenda+jarakBenda*1.),10)
}
