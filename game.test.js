const {game} = require('./game.js')

describe('Testing the game class', () => {

    test('get smallest blank board', () => {
        const currentGame = new game(4, 4)
        const actual = currentGame.board
        for(let i of actual){
            for(let j of i){
                expect(j).toBe(null)
            }
        }
    })

    test('play one piece in first column', () => {
        const currentGame = new game(4, 4)
        const actual = currentGame.selectColumn(0)[0]
        const expected = [[null, null, null, null],[null, null, null, null],[null, null, null, null],['s', null, null, null],]
        for(let i in actual){
            for(let j in i){
                expect(actual[i][j]).toBe(expected[i][j])
            }
        }
    })
    test('row winner', () => {
        const currentGame = new game(4, 4)
        let actual = null
        for(let i = 0; i < 4; i++){
            actual = currentGame.selectColumn(i)[1]
            actual = currentGame.selectColumn(i)[1]
        }
        
        const expected = 'Scotland'
        expect(actual).toBe(expected)
    })
    test('column winner', () => {
        const currentGame = new game(4, 4)
        let actual = null
        for(let i = 0; i < 4; i++){
            actual = currentGame.selectColumn(0)[1]
            actual = currentGame.selectColumn(1)[1]
        }
        
        const expected = 'Scotland'
        expect(actual).toBe(expected)
    })
    test('diagonal winner', () => {
        const c = new game(4, 4)
        let actual = null
        c.selectColumn(0) //s
        c.selectColumn(1) //e
        c.selectColumn(1) //s
        c.selectColumn(2) //e
        c.selectColumn(2) //s
        c.selectColumn(3) //e
        c.selectColumn(2) //s
        c.selectColumn(3) //e
        c.selectColumn(3) //s
        c.selectColumn(0) //e
        actual = c.selectColumn(3)[1] //s
                
        const expected = 'Scotland'
        expect(actual).toBe(expected)
    })
})
