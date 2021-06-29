/*
1. Выводить счёт в режиме реального времени:
    HTML - добавлен div-тег c id "score";
    CSS - добавлен стиль для #score
    добавлен объект score;
    модифицированы фунции:
        game.reset(),
        game.tickHandler(),
        game.finish().

2. Генерировать временные препятствия на поле:
    CSS - стиль для .obstacle;
    добавлен объект obstacle;
    модифицированы функции:
        game.reset(), 
        game.tickHandler(), 
        game.render(), 
        game.canMakeStep(), 
        game.getRandomFreeCoordinates()
        map.render().

3. *Убрать границы поля. Т.е. при пересечении границы
поля змейка появляется с противоположной стороны: 
    изменены функции:
        snake.getNextStepHeadPoint(),
        game.canMakeStep().
*/

"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 40,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';
        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);

                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    render(snakePointsArray, foodPoint, obstaclePointsArray) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        obstaclePointsArray.forEach((point, index) => {
            const obstacleCell = this.cells[`x${point.x}_y${point.y}`];
            obstacleCell.classList.add('obstacle');
            this.usedCells.push(obstacleCell);
        });


        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

    },
};

const obstacle = {
    coordinates: [],

    init: function () {
        this.coordinates = [];
    },

    getCoordinates: function () {
        return this.coordinates;
    },

    setCoordinates: function (point) {
        this.coordinates.push(point);
    },

    isOnPoint: function (point) {
        return this.coordinates.some((obsElem) => {
            return obsElem.x === point.x && obsElem.y === point.y;
        });
    },
};


const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some((snakePoint) => {
            return snakePoint.x === point.x && snakePoint.y === point.y;
        });
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextStepHeadPoint());
        this.getBody().pop();
    },

    growUp() {
        const lastBodyIndex = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        this.getBody().push(lastBodyPointClone);
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];
        let nextX, nextY;
        switch (this.direction) {
            case 'up':
                nextY = firstPoint.y > 0 ? firstPoint.y - 1 : config.getRowsCount() - 1;
                return { x: firstPoint.x, y: nextY };
            case 'right':
                nextX = (firstPoint.x + 1) < config.getColsCount() ? firstPoint.x + 1 : 0;
                return { x: nextX, y: firstPoint.y };
            case 'down':
                nextY = (firstPoint.y + 1) < config.getRowsCount() ? firstPoint.y + 1 : 0;
                return { x: firstPoint.x, y: nextY };
            case 'left':
                nextX = firstPoint.x > 0 ? firstPoint.x - 1 : config.getColsCount() - 1;
                return { x: nextX, y: firstPoint.y };
        }
    },
};

const score = {
    value: 0,
    banner: document.getElementById('score'),
    init: function () {
        this.value = 0;
    },
    increase: function () {
        this.value++;
    },
    put: function () {
        this.banner.textContent = `SCORE: ${this.value}`;
    },
    putMessage: function (message) {
        this.banner.textContent = message;
    },
}

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};


const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    obstacle,
    status,
    score,
    tickInterval: null,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.log(err);
            }

            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.obstacle.init();
        this.obstacle.setCoordinates(this.getRandomFreeCoordinates());
        this.render();
        this.score.init();
        this.score.put();
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => {
            this.tickHandler();
        }, 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    finish(message) {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
        this.score.putMessage(message);
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish('YOU LOSE!');

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.obstacle.setCoordinates(this.getRandomFreeCoordinates());
            this.food.setCoordinates(this.getRandomFreeCoordinates());

            if (this.isGameWon()) return this.finish('YOU WON!');

            this.score.increase();
            this.score.put();
        }

        this.snake.makeStep();
        this.render();
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isOnPoint(nextHeadPoint) &&
            !this.obstacle.isOnPoint(nextHeadPoint);
    },

    setPlayButton(txt, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = txt;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    getRandomFreeCoordinates() {
        const exclude = [
            this.food.getCoordinates(),
            ...this.snake.getBody(),
            ...this.obstacle.getCoordinates()
        ];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            // if (!exclude.some((exPoint) => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) return rndPoint;
            if (!exclude.some((exPoint) => {
                return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
            })) return rndPoint;
        }
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', (event) => {
            this.keyDownHandler(event);
        });
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.obstacle.getCoordinates());
    },
};

game.init({ speed: 5 });
