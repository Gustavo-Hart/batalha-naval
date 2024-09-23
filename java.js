const ships = [
    { size: 3, count: 1 }, // 1 navio de 3
    { size: 2, count: 2 }, // 2 navios de 2
    { size: 1, count: 3 }  // 3 navios de 1
];

let gridSize = 10;
let grid = [];
let shipPositions = [];
let hits = 0;
let totalHits = 0;

function setGridSize(size) {
    gridSize = size;
    createGrid();
    placeShips();
    updateStatus();
}

function createGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gridElement.appendChild(cell);
        }
    }
}

function placeShips() {
    shipPositions = [];
    totalHits = 0;

    ships.forEach(ship => {
        for (let i = 0; i < ship.count; i++) {
            let placed = false;
            while (!placed) {
                const orientation = Math.random() < 0.5; // Horizontal ou vertical
                const row = Math.floor(Math.random() * gridSize);
                const col = Math.floor(Math.random() * gridSize);
                if (canPlaceShip(row, col, ship.size, orientation)) {
                    for (let j = 0; j < ship.size; j++) {
                        if (orientation) {
                            grid[row][col + j] = 'ship';
                            shipPositions.push({ row, col: col + j });
                        } else {
                            grid[row + j][col] = 'ship';
                            shipPositions.push({ row: row + j, col });
                        }
                    }
                    placed = true;
                    totalHits += ship.size;
                }
            }
        }
    });
}

function canPlaceShip(row, col, size, orientation) {
    for (let j = 0; j < size; j++) {
        const r = orientation ? row : row + j;
        const c = orientation ? col + j : col;
        if (r >= gridSize || c >= gridSize || grid[r][c] === 'ship') {
            return false;
        }
    }
    return true;
}

function handleCellClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (grid[row][col] === 'ship') {
        event.target.classList.add('hit');
        hits++;
        alert('Você acertou um navio!');
        checkGameOver();
    } else if (grid[row][col] === '') {
        event.target.classList.add('miss');
        alert('Você errou!');
    } else {
        alert('Essa célula já foi clicada!');
    }
    updateStatus();
}

function checkGameOver() {
    if (hits === totalHits) {
        alert('Parabéns! Você afundou todos os navios!');
    }
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    statusElement.innerText = `Acertos: ${hits} | Total de navios: ${totalHits}`;
}

function initGame() {
    const difficulty = document.getElementById('difficulty').value;
    const sizeMap = { easy: 5, medium: 10, hard: 15 };
    setGridSize(sizeMap[difficulty]);
}

document.getElementById('difficulty').addEventListener('change', initGame);
document.getElementById('restart-btn').addEventListener('click', initGame);

// Inicializa o jogo na primeira execução
initGame();