document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const clickSound = document.getElementById('click-sound');

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomPosition(containerWidth, containerHeight, elementWidth, elementHeight) {
        const x = Math.floor(Math.random() * (containerWidth - elementWidth));
        const y = Math.floor(Math.random() * (containerHeight - elementHeight));
        return { x, y };
    }

    function createBall() {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.backgroundColor = getRandomColor();

        const { x, y } = getRandomPosition(gameContainer.clientWidth, gameContainer.clientHeight, 50, 50);
        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;

        ball.addEventListener('click', () => {
            clickSound.play();
            gameContainer.removeChild(ball);
            createBall();
        });

        gameContainer.appendChild(ball);
    }

    createBall();
});
