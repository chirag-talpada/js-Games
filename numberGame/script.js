
const allCell = [...document.querySelectorAll(".cell")];
const number = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const mainBoard = document.querySelector('.mainBoard');
const moveLabel = document.querySelector('#move');
const hscoreLabel = document.querySelector('#hscore');

let blankCellIndex;
let move = 0;



if (localStorage.getItem('numberGame')) {
    hscoreLabel.innerHTML = localStorage.getItem('numberGame');
} else {
    hscoreLabel.innerHTML = "Not Found";
}

startGame();



mainBoard.addEventListener('click', function (e) {
    let targetedElement = e.target;

    if (!targetedElement.classList.contains("cell")) {
        return
    }

    if (!targetedElement.classList.contains('canMove')) {
        return
    }

    let shiftCellIndex = targetedElement.dataset.index - 1;
    let shift_blankCellIndex = blankCellIndex - 1;

    let Num = allCell[shiftCellIndex].innerHTML;

    allCell[shift_blankCellIndex].innerHTML = Num;
    allCell[shiftCellIndex].innerHTML = ""

    allCell[shift_blankCellIndex].classList.remove("blankCell");
    allCell[shiftCellIndex].classList.add("blankCell");

    move++;
    moveLabel.innerHTML = move;

    clearMovedCell();
    shiftCellIndex++;
    blankCellIndex = shiftCellIndex;
    identifyMovedCell(shiftCellIndex);

    isWin()

});


function identifyMovedCell(blankCellIndex) {
    let rowNumber = getRow(blankCellIndex);


    if (blankCellIndex % 2 === 0) {

        if (rowNumber === 1) {
            allCell[blankCellIndex - 1 - 1].classList.add("canMove");
            allCell[blankCellIndex + 1 - 1].classList.add("canMove");
            allCell[blankCellIndex + 3 - 1].classList.add("canMove");
        } else if (rowNumber === 3) {
            allCell[blankCellIndex - 3 - 1].classList.add("canMove");
            allCell[blankCellIndex - 1 - 1].classList.add("canMove");
            allCell[blankCellIndex + 1 - 1].classList.add("canMove");
        } else if (rowNumber === 2) {
            allCell[blankCellIndex - 3 - 1].classList.add("canMove");

            if (blankCellIndex === 6) {

                allCell[blankCellIndex - 1 - 1].classList.add("canMove");
            } else {
                allCell[blankCellIndex + 1 - 1].classList.add("canMove");
            }

            allCell[blankCellIndex + 3 - 1].classList.add("canMove");
        }

    } else if (blankCellIndex === 5) {
        allCell[blankCellIndex - 3 - 1].classList.add("canMove");
        allCell[blankCellIndex - 1 - 1].classList.add("canMove");
        allCell[blankCellIndex + 1 - 1].classList.add("canMove");
        allCell[blankCellIndex + 3 - 1].classList.add("canMove");
    } else {

        if (rowNumber === 1) {
            allCell[blankCellIndex + 3 - 1].classList.add("canMove");

            if (blankCellIndex === 1) {
                allCell[blankCellIndex + 1 - 1].classList.add("canMove");
            } else if (blankCellIndex === 3) {
                allCell[blankCellIndex - 1 - 1].classList.add("canMove");
            }
        } else if (rowNumber === 3) {
            allCell[blankCellIndex - 3 - 1].classList.add("canMove");

            if (blankCellIndex === 7) {
                allCell[blankCellIndex + 1 - 1].classList.add("canMove");
            } else if (blankCellIndex === 9) {
                allCell[blankCellIndex - 1 - 1].classList.add("canMove");

            }

        }
    }

}

function getRandomNum(arr) {
    let lastindex = arr.length - 1;

    for (let index = 0; index < lastindex; index++) {
        let randomIndex = Math.round(Math.random() * (lastindex - index) + index);

        let temp = arr[index];
        arr[index] = arr[randomIndex];
        arr[randomIndex] = temp;
    }

    return arr;

}

function getRow(index) {
    return Math.ceil(index / 3);
}

function startGame() {
    getRandomNum(number);


    for (let index = 0; index < allCell.length; index++) {


        allCell[index].setAttribute('data-index', index + 1);

        if (number[index] == "0") {
            allCell[index].innerHTML = "";
            allCell[index].classList.add("blankCell");
            blankCellIndex = index + 1;
            continue
        }
        allCell[index].innerHTML = number[index];
    }


    identifyMovedCell(blankCellIndex);

}

function clearMovedCell() {
    allCell.forEach(cell => {
        cell.classList.remove("canMove");
    });
}

function isWin() {
    let counter = 0;
    for (let index = 0; index < allCell.length; index++) {

        if (Number(allCell[index].innerText) === (index + 1)) {
            counter++;
        }
    }
    if (counter === 8) {

        let exitingScore = localStorage.getItem("numberGame");

        if(!exitingScore){
            hscoreLabel.innerHTML = move;
            localStorage.setItem("numberGame", move);
        }

        if (move<exitingScore) {
            localStorage.setItem("numberGame", move);
            hscoreLabel.innerHTML = move;
        }

        alert("congratulation, You did that!!!")
    }

}