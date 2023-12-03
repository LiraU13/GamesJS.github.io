// Variables globales
let canvas, ctx;
let ball, paddle;
let bricks = [];
let brickRowCount = 3;
let brickColumnCount = 7;
let score = 0;
let lives = 3;
let playing = false;
// Variables adicionales
let rightPressed = false;
let leftPressed = false;


// Dimensiones del canvas
const canvasWidth = 480;
const canvasHeight = 320;

// Tamaño de la pelota y paleta
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;

// Posición inicial de la pelota y paleta
let ballX = canvasWidth / 2;
let ballY = canvasHeight - 30;
let paddleX = (canvasWidth - paddleWidth) / 2;

// Velocidad de la pelota
let dx = 2;
let dy = -2;

// Información de los ladrillos
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Inicializar el canvas
function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);
}

// Dibujar la pelota
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Dibujar la paleta
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Dibujar los ladrillos
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[c][r] = { x: brickX, y: brickY, status: 1 };
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

// Manejador para tecla presionada
function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

// Manejador para tecla liberada
function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}


// Función principal del juego
function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawBall();
  drawPaddle();
  drawBricks();
  // Otro código relacionado con la lógica del juego, colisiones, etc.
}

init();
setInterval(draw, 10); // Actualización del juego


// Manejador para tecla presionada
function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

// Manejador para tecla liberada
function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Movimiento de la base con el cursor y teclas de flecha
function movePaddle() {
    if (rightPressed && paddleX < canvasWidth - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

// Colisiones de la pelota con la base y los lados del canvas
function ballCollision() {
    // Colisión con la base
    if (ballY + dy > canvasHeight - ballRadius - paddleHeight &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth) {
        dy = -dy;
    }

    // Colisión con los bordes del canvas
    if (ballX + dx > canvasWidth - ballRadius || ballX + dx < ballRadius) {
        dx = -dx;
    }

    if (ballY + dy < ballRadius) {
        dy = -dy;
    }
}

// Colisiones de la pelota con los ladrillos
function ballBrickCollision() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brick = bricks[c][r];
            if (brick.status === 1) {
                if (
                    ballX > brick.x &&
                    ballX < brick.x + brickWidth &&
                    ballY > brick.y &&
                    ballY < brick.y + brickHeight
                ) {
                    dy = -dy;
                    brick.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert('¡Felicidades, has ganado!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Función principal del juego
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBall();
    drawPaddle();
    drawBricks();
    movePaddle();
    ballCollision();
    ballBrickCollision();

    ballX += dx;
    ballY += dy;

    requestAnimationFrame(draw);
}

// Inicialización y llamada al juego
init();
draw();
