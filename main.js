
const reset = () => {
    makeHomeScreen()
}

const makeHomeScreen = () => {
    showElement('boardSetup')
    for (let i = 4; i <= 25; i++) {

        id('rowSelector').add(new Option(i))
        id('columnSelector').add(new Option(i))
    }

}

const updateBoard = (updatedBoard) =>{
    for(let [rowIndex, row] of updatedBoard.entries())
    {
        for(let [columnIndex, column] of row.entries()){
            id(`[${rowIndex},${columnIndex}]`).style.backgroundImage = 
                updatedBoard[rowIndex][columnIndex] == 's' ? "url('gb-sct.svg')" :
                updatedBoard[rowIndex][columnIndex] == 'e' ? "url('gb-eng.svg')" :
                ''
        }}
}
const circleSelected = (e) => {
    const c = JSON.parse(e.currentTarget.id)[1]
    const [updatedBoard, winner] = currentGame.selectColumn(c)
    updateBoard(updatedBoard)
    console.log('User clicked on Column', c)
    console.log('Returned Board:', updatedBoard)
    if(winner)
        id('winnerOutput').innerHTML = winner + ' is the winner'

}
const makeGame = (e) => {
    currentGame = new game(
        id('rowSelector').options[id('rowSelector').selectedIndex].value,
        id('columnSelector').options[id('columnSelector').selectedIndex].value

    )
    hideElement('boardSetup')
    const grid = document.createElement("div")
    grid.id = 'currentGrid'
    for (let r = 0; r < currentGame.numRows; r++) {
        for (let c = 0; c < currentGame.numColumns; c++) {
            const div = document.createElement("div")
            div.className = 'circle'
            div.id = `[${r},${c}]`

            div.style.width = (30 / currentGame.numColumns) + 'vw'
            div.style.height = (30 / currentGame.numColumns) + 'vw'
            div.addEventListener('click', circleSelected)
            grid.appendChild(div)
        }
        grid.appendChild(document.createElement("br"))
    }
    


    id("mainBody").appendChild(grid);

}

reset()
let currentGame = null
id('makeField').addEventListener('click', makeGame)
