import {
    WHITE, BLACK, KING, QUEEN, OUT_OF_BOARD_MASK, RIGHT, NULL,
    WHITE_PAWN, WHITE_KNIGHT, WHITE_BISHOP, WHITE_ROOK, WHITE_QUEEN, WHITE_KING,
    BLACK_PAWN, BLACK_KNIGHT, BLACK_BISHOP, BLACK_ROOK, BLACK_QUEEN, BLACK_KING,
    BOARD, PIECE_LIST, initBoard, makePiece, toSquareCoordinates, perft, search
} from './PrimeChess.js';

////////////////////////////////////////////////////////////////
//  DISPLAYING AND DEBUGGING FUNCTIONS                        //
////////////////////////////////////////////////////////////////

const PIECE_CODE_TO_PRINTABLE_CHAR = new Map([
    [WHITE_PAWN, '\u2659'], [WHITE_KNIGHT, '\u2658'], [WHITE_BISHOP, '\u2657'], [WHITE_ROOK, '\u2656'], [WHITE_QUEEN, '\u2655'], [WHITE_KING, '\u2654'],
    [BLACK_PAWN, '\u265F'], [BLACK_KNIGHT, '\u265E'], [BLACK_BISHOP, '\u265D'], [BLACK_ROOK, '\u265C'], [BLACK_QUEEN, '\u265B'], [BLACK_KING, '\u265A'],
    [NULL, '.']
]);

function printBoard() {
    let printableBoard = '';
    for (let square = 0; square < BOARD.length; square++) {
        if (square & OUT_OF_BOARD_MASK) continue;
        printableBoard += PIECE_CODE_TO_PRINTABLE_CHAR.get(BOARD[square]) + ' ';
        if ((square + RIGHT) & 0x08) printableBoard += '\n';
    }
    console.log(printableBoard);
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
            console.log('Depth = ' + depth + ' ; Perft = ' + perftCount);
            console.assert((perftCount == perftCounts[depth]), 'Wrong perft at depth ' + depth + ', expected count was ' + perftCounts[depth]);
        }
        console.log('========================================');
    });
}

function bench() {
    let benchPositions = new Map<string, number>();
    benchPositions.set('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 6);
    benchPositions.set('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1', 5);
    benchPositions.set('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 0', 7);
    benchPositions.set('rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8', 5);

    for (let run = 1; run <= 3; run++) {
        console.time('Run ' + run + ' - Total time');
        benchPositions.forEach((depth, fenString) => {
            initBoard(fenString);
            let startTime = Date.now();
            let nodes = perft(depth);
            let endTime = Date.now();
            let time = endTime - startTime;
            console.log('Run ' + run + ' - Position : ' + fenString + ' - Nodes : ' + nodes + ' - Time : ' + time + ' - Npms : ' + Math.round(nodes / time));
        });
        console.timeEnd('Run ' + run + ' - Total time');
    }
}

function testSearch() {
    let testPositions = [
        '8/7k/6pp/3N4/3bR3/6P1/5r2/6K1 b - - 0 1',
        'r5k1/1p1bqpp1/p2bp2p/8/8/1BP2N1P/PP2QPP1/2KR4 w - - 0 1',
        '2Q5/1p6/8/8/8/3b4/K2k4/2q5 w - - 0 1',
        '2r2r1k/pp4pp/8/4Q1N1/5P2/1BP4P/P5PK/q7 w - - 0 1',
        '3r1rk1/1p4b1/2p1qp2/5Rp1/pP1P2R1/P1PQ4/1B3P1P/6K1 b - - 0 1',
        '2r2r1k/pb4pp/1p6/4Np2/2BPnP2/1P2R3/PB1b2PP/2R4K w - - 0 1',
        '2r2rk1/p2nbppp/1p3n2/8/N2p4/P3PN2/1P1B1PPP/3R1RK1 b - - 0 1',
        '1r2r1k1/pP3ppp/8/8/2NR3q/2P2P1n/PP2QP2/R1B2K2 b - - 0 1',
        'b1Rr1k2/3r2p1/p3p3/1p4N1/1P2P3/P4P1Q/1q4PP/2R4K b - - 0 1',
        '6k1/2p2R2/1p4p1/1r2p3/3rP3/K7/8/5R2 w - - 0 1',
        '5rk1/pp2q1p1/4p3/3pPpN1/6b1/3Q4/PPP2P2/2K3R1 w - - 0 1',
        '8/8/8/7p/8/2B2k1P/3K4/8 w - - 0 1',
    ];

    for (let run = 1; run <= 3; run++) {
        console.time('Run ' + run + ': Total time');
        testPositions.forEach((fenString) => {
            console.time('Run ' + run + ': Position ' + fenString);
            initBoard(fenString);
            search();
            console.timeEnd('Run ' + run + ': Position ' + fenString);
        });
        console.timeEnd('Run ' + run + ': Total time');
    }
}

////////////////////////////////////////////////////////////////
//  TESTS                                                     //
////////////////////////////////////////////////////////////////

//bench();
//testPerft();
testSearch();
