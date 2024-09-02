const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions based on window size
function setCanvasDimensions() {
    if (window.innerWidth < 768) { // mobile and tablet
        canvas.width = window.innerWidth;
    } else { // laptop and desktop
        canvas.width = window.innerWidth / 2;
    }
    canvas.height = 400; // adjust the height as needed
}

setCanvasDimensions();

// Add event listener to resize canvas on window resize
window.addEventListener('resize', setCanvasDimensions);

// ... rest of the code remains the same ...

canvas.width = window.innerWidth;
canvas.height = 400; // adjust the height as needed

let snake = [
    { x: canvas.width / 2, y: canvas.height / 2 },
    { x: canvas.width / 2 - 10, y: canvas.height / 2 },
    { x: canvas.width / 2 - 20, y: canvas.height / 2 }
];

let food = {
    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y: Math.floor(Math.random() * (canvas.height / 10)) * 10
};

let score = 0;
let direction = 'right';
let gameOver = false;
let paused = false;


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);
    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '36px Arial';
        ctx.fillText('You are a loser👎 Game Over!', canvas.width / 2, canvas.height / 2);
    }
}

function update() {
    if (!paused && !gameOver) {
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i] = { ...snake[i - 1] };
        }
        switch (direction) {
            case 'up':
                snake[0].y -= 10;
                break;
            case 'down':
                snake[0].y += 10;
                break;
            case 'left':
                snake[0].x -= 10;
                break;
            case 'right':
                snake[0].x += 10;
                break;
        }
        if (snake[0].x === food.x && snake[0].y === food.y) {
            score++;
            snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
            food = {
                x: Math.floor(Math.random() * 40) * 10,
                y: Math.floor(Math.random() * 40) * 10
            };
        }
        if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
            gameOver = true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                gameOver = true;
            }
        }
    }
}

function handleInput(event) {
    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
    }
}

document.addEventListener('keydown', handleInput);

const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const restartButton = document.getElementById('restart-button');

playButton.addEventListener('click', () => {
    paused = false;
});

pauseButton.addEventListener('click', () => {
    paused = true;
});

restartButton.addEventListener('click', () => {
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 }
    ];
    food = {
        x: Math.floor(Math.random() * 40) * 10,
        y: Math.floor(Math.random() * 40) * 10
    };
    score = 0;
    direction = 'right';
    gameOver = false;
    paused = false;
});

setInterval(() => {
    update();
    draw();
}, 100);