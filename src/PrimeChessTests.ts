import {
    STARTING_FEN, WHITE, BLACK, KING, QUEEN, OUT_OF_BOARD_MASK, PIECE_CODE_TO_PRINTABLE_CHAR, RIGHT,
    BOARD, PIECE_LIST, initBoard, makePiece, decodeMove, toSquareCoordinates, perft, search
} from './PrimeChess.js';

////////////////////////////////////////////////////////////////
//  DISPLAYING AND DEBUGGING FUNCTIONS                        //
////////////////////////////////////////////////////////////////

function printBoard() {
    let printableBoard = '';
    for (let square = 0; square < BOARD.length; square++) {
        if (square & OUT_OF_BOARD_MASK) continue;
        printableBoard += PIECE_CODE_TO_PRINTABLE_CHAR.get(BOARD[square]) + ' ';
        if ((square + RIGHT) & 0x08) printableBoard += '\n';
    }
    console.log(printableBoard);
}

function printMove(encodedMove: number) {
    let move = decodeMove(encodedMove);
    console.log(PIECE_CODE_TO_PRINTABLE_CHAR.get(BOARD[move.fromSquare]) + ' moves from ' + toSquareCoordinates(move.fromSquare) + ' to ' + toSquareCoordinates(move.toSquare));
}

function printPieceList() {
    let printablePieceList = '';
    for (let color = WHITE; color <= BLACK; color++) {
        for (let pieceType = KING; pieceType <= QUEEN; pieceType++) {
            let pieceCount = PIECE_LIST[color * 80 + pieceType];
            if (pieceCount > 0) {
                let piece = makePiece(color, pieceType);
                printablePieceList += PIECE_CODE_TO_PRINTABLE_CHAR.get(piece) + ' : ';
                for (let p = 0; p < pieceCount; p++) {
                    let square = PIECE_LIST[10 * piece + p];
                    printablePieceList += toSquareCoordinates(square) + ' ';
                }
                printablePieceList += '\n';
            }
        }
    }
    console.log(printablePieceList);
}

function testPerft() {
    let perftTests = new Map<string, number[]>();
    perftTests.set('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', [1, 20, 400, 8902, 197281, 4865609, 119060324]); // Starting position
    perftTests.set('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1', [1, 48, 2039, 97862, 4085603, 193690690]); // Position 2
    perftTests.set('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1', [1, 14, 191, 2812, 43238, 674624, 11030083, 178633661]); // Position 3
    perftTests.set('r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1', [1, 6, 264, 9467, 422333, 15833292]); // Position 4
    perftTests.set('r2q1rk1/pP1p2pp/Q4n2/bbp1p3/Np6/1B3NBn/pPPP1PPP/R3K2R b KQ - 0 1', [1, 6, 264, 9467, 422333, 15833292]); // Position 4 mirrored
    perftTests.set('rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8', [1, 44, 1486, 62379, 2103487, 89941194]); // Position 5
    perftTests.set('r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10', [1, 46, 2079, 89890, 3894594, 164075551]); // Position 6

    console.log('========================================');
    perftTests.forEach((perftCounts, fenString) => {
        initBoard(fenString);
        printBoard();
        for (let depth = 0; depth < perftCounts.length; depth++) {
            let perftCount = perft(depth);
            console.log('Depth = ' + depth + ' ; Perft = ' + perftCount + ' ; ' + (perftCount == perftCounts[depth]));
        }
        console.log('========================================');
    });
}

function bench() {
    let benchPositions = [
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1',
        '8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 0',
        'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8'
    ];
    for (let run = 1; run <= 3; run++) {
        console.time('Run ' + run);
        for (let p = 0; p < benchPositions.length; p++) {
            initBoard(benchPositions[p]);
            perft(5);
        }
        console.timeEnd('Run ' + run);
    }
}

////////////////////////////////////////////////////////////////
//  TESTS                                                     //
////////////////////////////////////////////////////////////////

bench();

testPerft();

for (let run = 1; run <= 3; run++) {
    initBoard(STARTING_FEN);
    console.time('Run ' + run);
    perft(6);
    console.timeEnd('Run ' + run);
}

initBoard('2q3k1/8/8/5N2/6P1/7K/8/8 w - - 0 1'); // 400
printBoard();
search();
initBoard('6k1/5r1p/p2N4/nppP2q1/2P5/1P2N3/PQ5P/7K w - - 0 1'); // 400
printBoard();
search();
initBoard('7k/8/8/4b1n1/8/8/5PPP/5R1K w - - 0 1'); // 400
printBoard();
search();
initBoard('r1bqkb1r/pppp1ppp/2n5/4p3/2B1N3/5N2/PPPP1PPP/R1BQK2R b KQkq - 0 2'); // 0
printBoard();
search();
initBoard('8/8/b5k1/8/8/8/1K6/3R4 w - - 0 1'); // 500
printBoard();
search();
initBoard('4k2r/2n2p1p/6p1/3n4/5Q2/8/5PPP/6K1 w - - 0 1'); // 300
printBoard();
search();
initBoard('r3k3/7p/6p1/5p2/5r2/2NP4/PPP2PPP/R5K1 w - - 0 1'); // 400
printBoard();
search();
initBoard('8/5pk1/8/4p3/pp1qPn2/5P2/PP2B3/2Q2K2 b - - 0 1'); // 300
printBoard();
search();
initBoard('B7/K1B1p1Q1/5r2/7p/1P1kp1bR/3P3R/1P1NP3/2n5 w - - 0 1'); // M2
printBoard();
search();
initBoard('8/6K1/1p1B1RB1/8/2Q5/2n1kP1N/3b4/4n3 w - - 0 1'); // M2
printBoard();
search();

initBoard('2k5/6R1/8/8/8/8/3K4/7R w - - 0 1'); // M1 (require depth 2)
printBoard();
search();
initBoard('2k5/6R1/8/8/8/8/3K4/7R b - - 0 1'); // -M1 (require depth 3)
printBoard();
search();
initBoard('k7/8/8/8/8/8/3K2R1/7R w - - 0 1'); // M2 (require depth 4)
printBoard();
search();
initBoard('k7/8/8/8/8/8/3K2R1/7R b - - 0 1'); // -M3 (require depth 7)
printBoard();
search();
