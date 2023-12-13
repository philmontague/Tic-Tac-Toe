// Elements on page
const board = document.querySelector('.board'); 
const resetButton = document.querySelector('#reset-btn'); 

// Game Variables 
let currentPlayer = 'X'; 
let spaces = Array(9).fill(null); 

// Winning Combos 
const winningCombos = [ 
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 

// Draw Board 
function drawBoard() { 
    for (let i = 0; i < 9; i++) { 
        const cell = document.createElement('div'); 
        cell.addEventListener('click', cellClicked); 
        board.appendChild(cell); 
    }
}

// Cell Clicked Function
function cellClicked(e) { 
    const cell = e.target; 
    const index = [...cell.parentNode.children].indexOf(cell); 

    if (spaces[index] === null) { 
        spaces[index] = currentPlayer; 
        cell.textContent = currentPlayer; 
        switchPlayer(); 

        // Check for winner
        checkForWinner(); 
    }
}

// Switch Player
function switchPlayer() { 
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
}

// Check Winner Function 
function checkForWinner() { 
    for (let combo of winningCombos) { 
        const [a, b, c] = combo; 

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) { 
            alert(`Player ${spaces[a]} has won!`); 

            // End Game 
            return; 
        }
    }

    // Check for tie 
    if (!spaces.includes(null)) { 
        alert('Game is a tie!'); 

        // End Game
        return; 
    }
}

// Reset Board
function resetBoard() { 
    spaces.fill(null); 

    for (let cell of board.children) { 
        cell.textContent = ''; 
    }

    currentPlayer = 'X'; 
}

// Draw board on page load 
drawBoard(); 

// Add event listener to reset button 
resetButton.addEventListener('click', resetBoard); 