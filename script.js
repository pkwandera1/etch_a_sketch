const gridContainer = document.querySelector('.grid-container');
const button = document.querySelector('.createGridButton');

function createGrids() {
    for (let i = 0; i < 256; i++) {
        let square = document.createElement('div');
        square.classList.add("small-squares");
        gridContainer.appendChild(square);

        square.addEventListener('mouseover', function () {
            square.style.backgroundColor = "blue";
        });

        square.addEventListener('mouseout', function () {
            square.style.backgroundColor = "blue"; 
        });
    }
}

function createUserGrid(gridSize) {
    gridContainer.innerHTML = "";
    const squareSize = 670 / gridSize;

    let isMouseDown = false; // Flag to track whether the left mouse button is down

    for (let i = 0; i < gridSize * gridSize; i++) {
        let square = document.createElement('div');
        square.classList.add('user-squares');
        gridContainer.appendChild(square);
        square.style.width = square.style.height = squareSize + 'px';

        const randomSquareColor = randomColor();

        // Mouseover event only if the left mouse button is down
        square.addEventListener('mouseover', function (event) {
            if (isMouseDown) {
                square.style.backgroundColor = randomSquareColor;
            }
        });

        // Mouseup event to reset the flag when the left mouse button is released
        document.addEventListener('mouseup', function () {
            isMouseDown = false;
        });

        // Mousedown event to set the flag when the left mouse button is pressed
        square.addEventListener('mousedown', function () {
            isMouseDown = true;
            square.style.backgroundColor = randomSquareColor;
        });

        // Prevent text selection during dragging
        square.addEventListener('selectstart', function () {
            return false;
        });
    }
}


function randomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            console.log(color);
            return color;
          }

function promptGridSize() {
    let newSize = prompt('Enter the number of squares on one side of the grid (17 - 100):');

    // Validate input
    newSize = parseInt(newSize);
    if (isNaN(newSize) || newSize < 17 || newSize > 100) {
        alert('Please enter a valid number between 17 and 100.');
        return;
    }

    createUserGrid(newSize);
}

createGrids();
button.addEventListener('click', promptGridSize);