document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const clickSound = document.getElementById('click-sound');

    // Força o modo de tela cheia
    function requestFullScreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    }

    requestFullScreen();

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

        function handleClickOrTouch(e) {
            e.preventDefault();  // Prevent default touch behavior
            if (e.type === 'touchstart') {
                e.stopPropagation();  // Prevent other touch events
                gameContainer.removeChild(ball);
                clickSound.play();
                createBall();
            } else if (e.type === 'click') {
                gameContainer.removeChild(ball);
                clickSound.play();
                createBall();
            }
        }

        ball.addEventListener('click', handleClickOrTouch);
        ball.addEventListener('touchstart', handleClickOrTouch);

        gameContainer.appendChild(ball);
    }

    createBall();
});
