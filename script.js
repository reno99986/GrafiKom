/**
 * Description
 * @type {HTMLCanvasElement} ".kertas"
 *
 */
const tombolCekung = document.querySelector(".cekung");

const tombolCembung = document.querySelector(".cembung");
const tombolLensaCekung = document.querySelector(".lensacekung");
const tombolLensaCembung = document.querySelector(".lensacembung");

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

tombolLensaCekung.addEventListener("click", function () {
  sliderLensaCekung();
  valueSlider.setAttribute("oninput", "sliderLensaCekung()");
  valueSlider1.setAttribute("oninput", "sliderLensaCekung()");
  valueSlider2.setAttribute("oninput", "sliderLensaCekung()");
});
tombolLensaCembung.addEventListener("click", function () {
  sliderLensaCembung();
  valueSlider.setAttribute("oninput", "sliderLensaCembung()");
  valueSlider1.setAttribute("oninput", "sliderLensaCembung()");
  valueSlider2.setAttribute("oninput", "sliderLensaCembung()");
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

valueSlider.setAttribute("value", `${window.inn}`);
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


  let incX = dx / steps;
  let incY = dy / steps;

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


  let incX = dx / steps;
  let incY = dy / steps;

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


  let incX = dx / steps;
  let incY = dy / steps;
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

  let incX = dx / steps;
  let incY = dy / steps;
  let x = x1;
  let y = y1;
  for (let i = 0; i < steps; i++) {
    let nopix = false;
    if (i % 8 === 0) {
      nopix = !nopix;
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
function drawAllCircle(cX, cY, r, bold, color) {
  let x = r;
  let y = 0;
  let rError = 1 - x;
  ctx.fillStyle = color;
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
function drawPartCircle(cX, cY, r, bold, color) {
  ctx.fillStyle = color;
  let x = r;
  let y = 0;
  let rError = 1 - x;
  while (x >= y) {
    drawPix(cX + x, cY - y, bold);

    drawPix(cX + x, cY + y, bold);
    y++;

    if (rError < 0) {
      rError += 2 * y + 1;
    } else {
      x--;
      rError += 2 * (y - x) + 1;
    }
  }
}

function drawPartCircleInverted(cX, cY, r, bold, color) {
  ctx.fillStyle = color;
  let x = r;
  let y = 0;
  let rError = 1 - x;
  while (x >= y) {
    drawPix(cX - x, cY - y, bold);
    drawPix(cX - x, cY + y, bold);

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
  // ctx.fillStyle = "#224400";
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
nilai = document.querySelector(".value");
nilai.innerHTML = `<p>Jarak Benda: ${jarakBenda}</p><p>Tinggi Benda: ${tinggiBenda}</p><p>Titik Fokus : ${-titikF}</p>`;

function drawCoor() {
  // Mulai Menggabar garis koordinat
  drawDDA(koorX(0), koorX(0), 0, koorY(0) * 2, 6, "red");
  drawDDA(0, koorX(0) * 2, koorY(0), koorY(0), 6, "red");
}

function drawObj() {
  //menggambar benda
  drawDDA(
    koorX(jarakBenda),
    koorX(jarakBenda),
    koorY(0),
    koorY(tinggiBenda),
    5,
    "blue"
  );

  drawDDA(
    koorX(jarakBenda),
    koorX(jarakBenda - tinggiBenda * 0.4),
    koorY(tinggiBenda),
    koorY(tinggiBenda - tinggiBenda * 0.2),
    5,
    "blue"
  );
  drawDDA(
    koorX(jarakBenda),
    koorX(jarakBenda + tinggiBenda * 0.4),
    koorY(tinggiBenda),
    koorY(tinggiBenda - tinggiBenda * 0.2),
    5,
    "blue"
  );

  drawDDA(
    koorX(jarakBenda),
    koorX(jarakBenda + tinggiBenda * 0.4),
    koorY(0),
    koorY(tinggiBenda - tinggiBenda * 0.2),
    5,
    "blue"
  );
  drawDDA(
    koorX(jarakBenda),
    koorX(jarakBenda - tinggiBenda * 0.4),
    koorY(0),
    koorY(tinggiBenda - tinggiBenda * 0.2),
    5,
    "blue"
  );
  drawDDA(
    koorX(jarakBenda + tinggiBenda * 0.4),
    koorX(jarakBenda - tinggiBenda * 0.4),
    koorY(tinggiBenda - tinggiBenda * 0.2),
    koorY(tinggiBenda - tinggiBenda * 0.2),
    5,
    "blue"
  );
}

function sliderCekung() {
  l = Number(document.querySelector(".jarakBenda").value);
  h = koorY(Number(document.querySelector(".tinggiBenda").value));
  f = Number(document.querySelector(".jarakFokus").value);
  jarakBenda = l;
  tinggiBenda = h;
  titikF = f;
  nilai = document.querySelector(".value");
  nilai.innerHTML = `<p>Jarak Benda: ${jarakBenda}</p><p>Tinggi Benda: ${tinggiBenda}</p><p>Titik Fokus : ${titikF}</p>`;

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

    drawObj();
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
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength + shadowHeight * 0.4),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight * 0.2),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    //Mengambar lingkaran kurvature
    drawPartCircle(koorX(2 * titikF), koorY(0), 2 * titikF, 5, "green");

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

    drawCoor();

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

    drawObj();

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
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength + shadowHeight * 0.4),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight * 0.2),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    //Mengambar lingkaran kurvature
    drawPartCircle(koorX(2 * titikF), koorY(0), 2 * titikF, 5, "green");

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
  }
}
//nambah makin jauh
//kurang mkin tinggi

window.onload = sliderLensaCekung();

// todo: Memperindah objek, menambah fitur di depan titik fokus dan  cermin cembung

function sliderCembung() {
  l = Number(document.querySelector(".jarakBenda").value);
  h = koorY(Number(document.querySelector(".tinggiBenda").value));
  f = -Number(document.querySelector(".jarakFokus").value);
  jarakBenda = l;
  tinggiBenda = h;
  titikF = f;
  let nilai;
  nilai = document.querySelector(".value");
  nilai.innerHTML = `<p>Jarak Benda: ${jarakBenda}</p><p>Tinggi Benda: ${tinggiBenda}</p><p>Titik Fokus : ${-titikF}</p>`;

  if (jarakBenda === titikF) {
    var shadowHeight = 0;
    var shadowLength = 0;
  } else {
    var shadowLength = (jarakBenda * titikF) / (jarakBenda - titikF);
    var shadowHeight = (shadowLength / jarakBenda) * tinggiBenda;
  }

  popup.style.display = "none";
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

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

  drawObj();

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
    koorX(shadowLength + shadowHeight * 0.4),
    koorX(shadowLength),
    koorY(-shadowHeight + shadowHeight * 0.2),
    koorY(-shadowHeight),
    5,
    "orange"
  );
  drawDDA(
    koorX(shadowLength - shadowHeight * 0.4),
    koorX(shadowLength),
    koorY(-shadowHeight + shadowHeight * 0.2),
    koorY(-shadowHeight),
    5,
    "orange"
  );
  drawDDA(
    koorX(shadowLength - shadowHeight * 0.4),
    koorX(shadowLength + shadowHeight * 0.4),
    koorY(-shadowHeight + shadowHeight * 0.2),
    koorY(-shadowHeight + shadowHeight * 0.2),
    5,
    "orange"
  );

  drawDDA(
    koorX(shadowLength + shadowHeight * 0.4),
    koorX(shadowLength),
    koorY(-shadowHeight + shadowHeight * 0.2),
    koorY(-shadowHeight + shadowHeight),
    5,
    "orange"
  );

  drawDDA(
    koorX(shadowLength - shadowHeight * 0.4),
    koorX(shadowLength),
    koorY(-shadowHeight + shadowHeight * 0.2),
    koorY(-shadowHeight + shadowHeight),
    5,
    "orange"
  );

  drawCoor();

  //Mengambar lingkaran kurvature
  drawPartCircleInverted(koorX(2 * titikF), koorY(0), -2 * titikF, 5, "green");
}

function sliderLensaCekung() {
  l = Number(document.querySelector(".jarakBenda").value);
  h = koorY(Number(document.querySelector(".tinggiBenda").value));
  f = Number(document.querySelector(".jarakFokus").value);
  jarakBenda = l;
  tinggiBenda = h;
  titikF = -f;
  nilai = document.querySelector(".value");
  nilai.innerHTML = `<p>Jarak Benda: ${jarakBenda}</p><p>Tinggi Benda: ${tinggiBenda}</p><p>Titik Fokus : ${titikF}</p>`;

  if (jarakBenda === titikF) {
    var shadowHeight = 0;
    var shadowLength = 0;
  } else {
    var shadowLength = -(jarakBenda * titikF) / (jarakBenda - titikF);
    var shadowHeight = -(shadowLength / jarakBenda) * tinggiBenda;
  }

  if (jarakBenda > titikF) {
    popup.style.display = "none";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    drawDDA_Continue(
      koorX(jarakBenda),
      koorX(0),
      koorY(tinggiBenda),
      koorY(0),
      5,
      "purple"
    );
    drawDDA_Continue(
      koorX(-jarakBenda),
      koorX(0),
      koorY(-tinggiBenda),
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
    clearDDA(koorX(0), koorX(titikF), koorY(-shadowHeight), koorY(0), 5);
    drawDDA(
      koorX(-window.innerWidth),
      koorX(0),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );
    drawDDA_Dashed(
      koorX(window.innerWidth),
      koorX(0),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );

    drawCoor();

    // menggambar titik fokus 1
    drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - titikF, yTengah - 5, "F1", "green", 20);

    // menggambar titik fokus 2
    drawDDA(koorX(-titikF), koorX(-titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - -titikF, yTengah - 5, "F2", "green", 20);
    //menggambar curvature 1
    drawDDA(
      koorX(titikF * 2),
      koorX(titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - titikF * 2, yTengah - 5, "C1", "green", 20);

    //menggambar curvature 2
    drawDDA(
      koorX(-titikF * 2),
      koorX(-titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - -titikF * 2, yTengah - 5, "C2", "green", 20);

    drawObj();

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
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength + shadowHeight * 0.4),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight * 0.2),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    //Mengambar lingkaran kurvature
    drawPartCircle(koorX(2 * -titikF), koorY(0), 2 * -titikF, 5, "green");
    drawPartCircleInverted(
      koorX(2 * titikF),
      koorY(0),
      2 * -titikF,
      5,
      "green"
    );
  } else {
    popup.style.display = "none";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    drawCoor();

    // menggambar titik fokus 1
    drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - titikF, yTengah - 5, "F1", "green", 20);

    // menggambar titik fokus 2
    drawDDA(koorX(-titikF), koorX(-titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - -titikF, yTengah - 5, "F2", "green", 20);
    //menggambar curvature 1
    drawDDA(
      koorX(titikF * 2),
      koorX(titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - titikF * 2, yTengah - 5, "C1", "green", 20);

    drawObj();

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
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength + shadowHeight * 0.4),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight * 0.2),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    //Mengambar lingkaran kurvature
    drawPartCircle(koorX(2 * titikF), koorY(0), 2 * titikF, 5, "green");

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
  }
}
//nambah makin jauh
//kurang mkin tinggi

function sliderLensaCembung() {
  l = Number(document.querySelector(".jarakBenda").value);
  h = koorY(Number(document.querySelector(".tinggiBenda").value));
  f = Number(document.querySelector(".jarakFokus").value);
  jarakBenda = l;
  tinggiBenda = h;
  titikF = f;
  nilai = document.querySelector(".value");
  nilai.innerHTML = `<p>Jarak Benda: ${jarakBenda}</p><p>Tinggi Benda: ${tinggiBenda}</p><p>Titik Fokus : ${titikF}</p>`;

  if (jarakBenda === titikF) {
    var shadowHeight = 0;
    var shadowLength = 0;
  } else {
    var shadowLength = -(jarakBenda * titikF) / (jarakBenda - titikF);
    var shadowHeight = -(shadowLength / jarakBenda) * tinggiBenda;
  }

  if (jarakBenda > titikF) {
    popup.style.display = "none";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawDDA(xTengah, xTengah, 0, yTengah * 2, 6, "red");
    drawDDA(0, xTengah * 2, yTengah, yTengah, 6, "red");

    // menggambar titik fokus 1
    drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - titikF, yTengah - 5, "F1", "green", 20);

    // menggambar titik fokus 2
    drawDDA(koorX(-titikF), koorX(-titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - -titikF, yTengah - 5, "F2", "green", 20);
    //menggambar curvature 1
    drawDDA(
      koorX(titikF * 2),
      koorX(titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - titikF * 2, yTengah - 5, "C1", "green", 20);

    //menggambar curvature 2
    drawDDA(
      koorX(-titikF * 2),
      koorX(-titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - -titikF * 2, yTengah - 5, "C2", "green", 20);

    tulisText(xTengah - titikF * 2, yTengah - 5, "C", "green", 20);

    drawObj();

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
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength + shadowHeight * 0.4),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight * 0.2),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    //Mengambar lingkaran kurvature
    drawPartCircle(koorX(titikF), koorY(0), titikF * 1.45, 5, "green");
    drawPartCircleInverted(koorX(-titikF), koorY(0), titikF * 1.45, 5, "green");

    //menggambar garis istimewa 1
    drawDDA_Continue(
      koorX(jarakBenda),
      koorX(0),
      koorY(tinggiBenda),
      koorY(0),
      5,
      "purple"
    );
    drawDDA_Continue(
      koorX(0),
      koorX(jarakBenda),
      koorY(0),
      koorY(tinggiBenda),
      5,
      "purple"
    );

    drawDDA(koorX(titikF), koorX(0), koorY(0), koorY(-shadowHeight), 5, "grey");
    drawDDA_Continue(
      koorX(titikF),
      koorX(jarakBenda),
      koorY(0),
      koorY(tinggiBenda),
      5,
      "grey"
    );
    drawDDA(
      koorX(0),
      koorX(-window.innerWidth / 2),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );
  } else {
    popup.style.display = "none";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    drawCoor();

    // menggambar titik fokus 1
    drawDDA(koorX(titikF), koorX(titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - titikF, yTengah - 5, "F1", "green", 20);

    // menggambar titik fokus 2
    drawDDA(koorX(-titikF), koorX(-titikF), koorY(1), koorY(-1), 5, "green");
    tulisText(xTengah - -titikF, yTengah - 5, "F2", "green", 20);
    //menggambar curvature 1
    drawDDA(
      koorX(titikF * 2),
      koorX(titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - titikF * 2, yTengah - 5, "C1", "green", 20);

    //menggambar curvature 2
    drawDDA(
      koorX(-titikF * 2),
      koorX(-titikF * 2),
      koorY(1),
      koorY(-1),
      5,
      "green"
    );
    tulisText(xTengah - -titikF * 2, yTengah - 5, "C2", "green", 20);

    tulisText(xTengah - titikF * 2, yTengah - 5, "C", "green", 20);

    drawObj();

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
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight),
      5,
      "orange"
    );
    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength + shadowHeight * 0.4),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight * 0.2),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength + shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    drawDDA(
      koorX(shadowLength - shadowHeight * 0.4),
      koorX(shadowLength),
      koorY(-shadowHeight + shadowHeight * 0.2),
      koorY(-shadowHeight + shadowHeight),
      5,
      "orange"
    );

    //Mengambar lingkaran kurvature
    drawPartCircle(koorX(titikF), koorY(0), titikF * 1.45, 5, "green");
    drawPartCircleInverted(koorX(-titikF), koorY(0), titikF * 1.45, 5, "green");
    //menggambar garis istimewa 1
    drawDDA_Continue(
      koorX(jarakBenda),
      koorX(0),
      koorY(tinggiBenda),
      koorY(0),
      5,
      "purple"
    );
    drawDDA_Continue(
      koorX(0),
      koorX(jarakBenda),
      koorY(0),
      koorY(tinggiBenda),
      5,
      "purple"
    );

    drawDDA(koorX(titikF), koorX(0), koorY(0), koorY(-shadowHeight), 5, "grey");

    drawDDA_Dashed(
      koorX(0),
      koorX(window.innerWidth / 2),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );
    drawDDA(
      koorX(0),
      koorX(-window.innerWidth / 2),
      koorY(-shadowHeight),
      koorY(-shadowHeight),
      5,
      "grey"
    );
  }
}
//nambah makin jauh
//kurang mkin tinggi
