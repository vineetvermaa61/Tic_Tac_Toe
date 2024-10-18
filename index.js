const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create a function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // UI par bhi boxes ko empty dikhana hoga, kyonki aage jake isi function ko call kar rahe to restart the game
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // green color bhi hatana hai, isliye, initialize the box with initial CSS properties again
        // ab current box/element ki CSS property ye wali class ki rakh do
        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    // har winning position par jakar check kar rahe ki kya game win ho gaya hai
    winningPositions.forEach((position)=>{
        // all 3 boxes should be same non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && ( gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]] === gameGrid[position[2]] ) ){
                
                // check if winner is X
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "O";
                }

                // disable pointer events - taaki game aage continue na ho paaye ab
                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none";
                })

                // now we know the winner - changing color to green 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    })

    // ab winner ko show karenge UI par
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // agar winner nahi mila, to let's check if there is tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    // if board is filled, then there is a tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    // agar blank hai sirf tabhi click hoga
    if(gameGrid[index] === ""){
        // UI mein change ho raha hai
        boxes[index].innerText = currentPlayer;
        // humne jo grid banaya hai upar, game ke status ka track rakhne ke liye usmein changes ho rahe hain
        gameGrid[index] = currentPlayer;

        // jo clicked ho chuka hai us par se cursor pointer bhi hata diya
        boxes[index].style.pointerEvents = "none";

        // now after this change the turn of player
        swapTurn();
        // check if anyone WIN
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

// jab new game par click karenge toh wapas se sab kuch initialize hoga
newGameBtn.addEventListener("click", initGame);