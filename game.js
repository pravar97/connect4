class game {
    numRows
    numColumns
    board
    turn
    winner = null
    players = ['s', 'e']


    winPatterns = [
        { before: (a, b) => [a, b - 1], after: (a, b) => [a, b + 1] },
        { before: (a, b) => [a - 1, b], after: (a, b) => [a + 1, b] },
        { before: (a, b) => [a - 1, b - 1], after: (a, b) => [a + 1, b + 1] },
        { before: (a, b) => [a + 1, b - 1], after: (a, b) => [a - 1, b + 1] },
    ]

    constructor(rows, columns) {
        this.numRows = parseInt(rows)
        this.numColumns = parseInt(columns)
        this.board = new Array(this.numRows).fill(null).map(() => new Array(this.numColumns).fill(null));
        this.turn = 0

    }
    selectColumn(column) {
        if (this.winner)
            return [this.board, this.winner]
        else
            return [this.takeTurn(column), this.winner]


    }
    takeTurn(column) {
        
        console.log(`Column ${column} selected, Player ${this.players[this.turn%2]} played`)
        for (let r = this.numRows - 1; r >= 0; r--) {
            if (!this.board[r][column]) {
                this.board[r][column] = this.players[this.turn % 2]
                this.winner = this.findWinner(r, column)
                this.turn++
                if (!this.winner && this.turn == this.numRows * this.numColumns)
                    this.winner = 'Nobody'
                break
            }
        }
        return this.board
    }

    findWinner(r, c) {
        const player = this.players[this.turn % 2]
        for (let winPattern of this.winPatterns) {

            let sum = 1
            for (let [ri, ci] = winPattern.before(r, c);
                ri >= 0 && ri < this.numRows && ci >= 0 && ci < this.numColumns;
                [ri, ci] = winPattern.before(ri, ci)) {
                if (this.board[ri][ci] != player || sum == 4)
                    break
                else
                    sum++
            }
            for (let [ri, ci] = winPattern.after(r, c);
                ri >= 0 && ri < this.numRows && ci >= 0 && ci < this.numColumns;
                [ri, ci] = winPattern.after(ri, ci)) {
                if (this.board[ri][ci] != player || sum == 4)
                    break
                else
                    sum++
            }
            if (sum == 4)
                return player == 's' ? 'Scotland' : 'England'



        }
        return null


    }

}
module.exports = {game}


