class PathFinder {
    board = []
    knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1]]
    knightPosition = [0, 0]
    knightTarget = [0, 0]
    graph = new Set()
    startPosition = undefined

    constructor() {
        this.buildBoard()


    }


    getMinimumMoves = (position = 1, target = 1) => {
        this.setKnightPosition(position)
        this.setKnightTarget(target)
        this.doMove(position)

        this.startPosition = position

        /* TODO : replace knightMoves with a map
        * up right = {y:-2, x:1}
        * up left = {y:-2, x:-1}
        * right up = {x:2, y:-1}
        * right down = {x:2, y:1}
        * bottom right = {y:2, x:1}
        * bottom left = {y:2, x:-1}
        * left up = {x:-2, y:-1}
        * left bottom = {x:-2, y:1}
        * */


        return 0
    }

    doMove = (fromCellPosition) => {
        console.log("=>(pathFinder.js:39) fromCellPosition", fromCellPosition);
        const moveList = new Map()

        moveList.set("up right", {y: -2, x: 1})
        moveList.set("up left", {y: -2, x: -1})
        moveList.set("right up", {x: 2, y: -1})
        moveList.set("right down", {x: 2, y: 1})
        moveList.set("bottom right", {y: 2, x: 1})
        moveList.set("bottom left", {y: 2, x: -1})
        moveList.set("left up", {x: -2, y: -1})
        moveList.set("left bottom", {x: -2, y: 1})

        const {rowIndex, cellIndex} = this.getRowAndCellIndexes(fromCellPosition)

        let cells = []

        moveList.forEach(({x, y}) => {
            const targets = this.board[y + rowIndex]?.[x + cellIndex];

            if (targets) {
                cells.push(targets);
            }
        });


        this.graph.add({[fromCellPosition]: cells})

        // if (cells.length) {
        //     cells.forEach(cell => {
        //         this.doMove(cell)
        //     })
        // }
    }

    buildBoard = (size = 8) => {
        const flatBoard = Array.from({length: size ** 2}, (_, index) => index + 1)

        this.board = Array.from({length: size}, this.chunkBoardIntoRows(flatBoard, size));
    }

    chunkBoardIntoRows = (flatBoard, boardSize) => {
        return (_, rowIndex) => {
            const rowStart = rowIndex * boardSize;
            const rowEnd = rowStart + boardSize;

            return flatBoard.slice(rowStart, rowEnd);
        };
    }

    getRowAndCellIndexes = (target) => {
        const rowIndex = this.board.findIndex((row, index) => row.includes(target));
        const cellIndex = this.board[rowIndex].indexOf(target);
        return {rowIndex, cellIndex};
    }

    setKnightPosition = (position) => {
        const {rowIndex, cellIndex} = this.getRowAndCellIndexes(position);

        this.knightPosition = [rowIndex, cellIndex];
    }

    setKnightTarget = (target) => {
        const {rowIndex, cellIndex} = this.getRowAndCellIndexes(target);

        this.knightTarget = [rowIndex, cellIndex]
    }


}


module.exports = PathFinder;
