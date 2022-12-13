////////////////////////////////////////////////////////////////
//  CONSTANTS                                                 //
////////////////////////////////////////////////////////////////

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const WHITE = 0;
const BLACK = 1;

const NULL = 0;
const PAWN = 1;
const KING = 2;
const KNIGHT = 3;
const BISHOP = 4;
const ROOK = 5;
const QUEEN = 6;

const WHITE_KING = makePiece(WHITE, KING);
const WHITE_PAWN = makePiece(WHITE, PAWN);
const WHITE_KNIGHT = makePiece(WHITE, KNIGHT);
const WHITE_BISHOP = makePiece(WHITE, BISHOP);
const WHITE_ROOK = makePiece(WHITE, ROOK);
const WHITE_QUEEN = makePiece(WHITE, QUEEN);
const BLACK_KING = makePiece(BLACK, KING);
const BLACK_PAWN = makePiece(BLACK, PAWN);
const BLACK_KNIGHT = makePiece(BLACK, KNIGHT);
const BLACK_BISHOP = makePiece(BLACK, BISHOP);
const BLACK_ROOK = makePiece(BLACK, ROOK);
const BLACK_QUEEN = makePiece(BLACK, QUEEN);

const UP = -16;
const RIGHT = +1;
const DOWN = +16;
const LEFT = -1;

const PIECE_COLOR_MASK = 0x08;
const PIECE_TYPE_MASK = 0x07;
const PIECE_SLIDER_MASK = 0x04;
const OUT_OF_BOARD_MASK = 0x88;
const FILE_MASK = 0x0F;
const RANK_MASK = 0xF0;
const SQUARE_NULL = 0x88;

const RANK_1 = 0x70;
const RANK_2 = 0x60;
const RANK_7 = 0x10;
const RANK_8 = 0x00;
const PAWN_STARTING_RANK = [RANK_2, RANK_7];
const PAWN_PROMOTING_RANK = [RANK_8, RANK_1];
const FILE_G = 0x06;
const KINGSIDE_CASTLING = new Uint8Array([1, 4]);
const QUEENSIDE_CASTLING = new Uint8Array([2, 8]);

const RESET_PLY_CLOCK_FLAG = 0x80;
const CAPTURE_FLAG = 0x40;
const SPECIAL_MOVE_MASK = 0x3F;
const PAWN_PUSH_2_SQUARES_FLAG = 0x20;
const EN_PASSANT_CAPTURE_FLAG = 0x10;
const CASTLING_MOVE_FLAG = 0x08;
const PROMOTION_MASK = 0x07;

const MF_PAWN_PUSH_1_SQUARE = RESET_PLY_CLOCK_FLAG;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_QUEEN = RESET_PLY_CLOCK_FLAG + QUEEN;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_ROOK = RESET_PLY_CLOCK_FLAG + ROOK;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_BISHOP = RESET_PLY_CLOCK_FLAG + BISHOP;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_KNIGHT = RESET_PLY_CLOCK_FLAG + KNIGHT;
const MF_PAWN_PUSH_2_SQUARES = RESET_PLY_CLOCK_FLAG + PAWN_PUSH_2_SQUARES_FLAG;
const MF_PAWN_CAPTURE = RESET_PLY_CLOCK_FLAG + CAPTURE_FLAG;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_QUEEN = RESET_PLY_CLOCK_FLAG + CAPTURE_FLAG + QUEEN;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_ROOK = RESET_PLY_CLOCK_FLAG + CAPTURE_FLAG + ROOK;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_BISHOP = RESET_PLY_CLOCK_FLAG + CAPTURE_FLAG + BISHOP;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_KNIGHT = RESET_PLY_CLOCK_FLAG + CAPTURE_FLAG + KNIGHT;
const MF_PAWN_CAPTURE_EN_PASSANT = RESET_PLY_CLOCK_FLAG + EN_PASSANT_CAPTURE_FLAG;
const MF_PIECE_NORMAL_MOVE = 0;
const MF_PIECE_CAPTURE_MOVE = RESET_PLY_CLOCK_FLAG + CAPTURE_FLAG;
const MF_KINGSIDE_CASTLING = CASTLING_MOVE_FLAG;
const MF_QUEENSIDE_CASTLING = CASTLING_MOVE_FLAG;

const PIECE_TYPE_TO_CHAR = new Map([
    [PAWN, 'p'], [KNIGHT, 'n'], [BISHOP, 'b'], [ROOK, 'r'], [QUEEN, 'q'], [KING, 'k']
]);

const FEN_CHAR_TO_PIECE_CODE = new Map([
    ['P', WHITE_PAWN], ['N', WHITE_KNIGHT], ['B', WHITE_BISHOP], ['R', WHITE_ROOK], ['Q', WHITE_QUEEN], ['K', WHITE_KING],
    ['p', BLACK_PAWN], ['n', BLACK_KNIGHT], ['b', BLACK_BISHOP], ['r', BLACK_ROOK], ['q', BLACK_QUEEN], ['k', BLACK_KING]
]);

const PIECE_CODE_TO_PRINTABLE_CHAR = new Map([
    [WHITE_PAWN, '\u2659'], [WHITE_KNIGHT, '\u2658'], [WHITE_BISHOP, '\u2657'], [WHITE_ROOK, '\u2656'], [WHITE_QUEEN, '\u2655'], [WHITE_KING, '\u2654'],
    [BLACK_PAWN, '\u265F'], [BLACK_KNIGHT, '\u265E'], [BLACK_BISHOP, '\u265D'], [BLACK_ROOK, '\u265C'], [BLACK_QUEEN, '\u265B'], [BLACK_KING, '\u265A'],
    [NULL, '.']
]);

const MOVE_DIRECTIONS = [
    [],
    [], // PAWN
    [UP, RIGHT, DOWN, LEFT, UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT], // KING
    [UP + UP + LEFT, UP + UP + RIGHT, DOWN + DOWN + LEFT, DOWN + DOWN + RIGHT, LEFT + LEFT + UP, LEFT + LEFT + DOWN, RIGHT + RIGHT + UP, RIGHT + RIGHT + DOWN], // KNIGHT
    [UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT], // BISHOP
    [UP, RIGHT, DOWN, LEFT], // ROOK
    [UP, RIGHT, DOWN, LEFT, UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT] // QUEEN
];

const UPDATE_CASTLING_RIGHTS = new Uint8Array([
    7,15,15,15, 3,15,15,11,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   13,15,15,15,12,15,15,14,  0, 0, 0, 0, 0, 0, 0, 0
]);

////////////////////////////////////////////////////////////////
//  GLOBAL VARIABLES                                          //
////////////////////////////////////////////////////////////////

let BOARD = new Uint8Array(128);
let PIECE_COUNT = new Uint8Array(16);
let PIECE_LIST = new Uint8Array(160);
let ACTIVE_COLOR = WHITE;
let EN_PASSANT_SQUARE = SQUARE_NULL;
let CASTLING_RIGHTS = NULL;
let PLY_CLOCK = 0;
let MOVE_NUMBER = 1;

////////////////////////////////////////////////////////////////
//  FUNCTIONS                                                 //
////////////////////////////////////////////////////////////////

function makePiece(color, pieceType) {
    return pieceType | (color << 3);
}

function getPieceColor(piece) {
    return piece >> 3;
}

function getPieceType(piece) {
    return (piece & PIECE_TYPE_MASK);
}

function movePiece(fromSquare, toSquare) {
    let piece = BOARD[fromSquare];
    BOARD[fromSquare] = NULL;
    BOARD[toSquare] = piece;

    let index = BOARD[fromSquare + 8];
    PIECE_LIST[index] = toSquare;
    BOARD[toSquare + 8] = index;
}

function addPiece(piece, square) {
    BOARD[square] = piece;

    let index = 10 * piece + PIECE_COUNT[piece]++;
    PIECE_LIST[index] = square;
    BOARD[square + 8] = index; 
}

function removePiece(square) {
    let piece = BOARD[square];
    BOARD[square] = NULL;

    let index = BOARD[square + 8];
    let lastIndex = 10 * piece + --PIECE_COUNT[piece];
    PIECE_LIST[index] = PIECE_LIST[lastIndex];
    BOARD[PIECE_LIST[lastIndex] + 8] = index;
}

function parseSquare(squareCoordinates) {
    return (squareCoordinates.charCodeAt(0) - 'a'.charCodeAt(0))
        - 16 * (squareCoordinates.charCodeAt(1) - '8'.charCodeAt(0));
}

function initBoard(fen = STARTING_FEN) {
    let fenParts = fen.split(' ');
    BOARD.fill(NULL);
    PIECE_COUNT.fill(NULL);
    PIECE_LIST.fill(NULL);

    let fenBoard = fenParts[0];
    let index = 0;
    for (let c of fenBoard) {
        if (c == '/') {
            index += 8;
        } else if (isNaN(parseInt(c, 10))) {
            addPiece(FEN_CHAR_TO_PIECE_CODE.get(c), index);
            index += 1;
        } else {
            index += parseInt(c, 10);
        }
    }

    let fenActiveColor = fenParts[1] ?? 'w';
    ACTIVE_COLOR = (fenActiveColor == 'b') ? BLACK : WHITE;

    let fenCastlingRights = fenParts[2] ?? '';
    CASTLING_RIGHTS = NULL;
    if (fenCastlingRights.includes('K')) CASTLING_RIGHTS |= KINGSIDE_CASTLING[WHITE];
    if (fenCastlingRights.includes('Q')) CASTLING_RIGHTS |= QUEENSIDE_CASTLING[WHITE];
    if (fenCastlingRights.includes('k')) CASTLING_RIGHTS |= KINGSIDE_CASTLING[BLACK];
    if (fenCastlingRights.includes('q')) CASTLING_RIGHTS |= QUEENSIDE_CASTLING[BLACK];

    let fenEnPassantSquare = fenParts[3] ?? '-';
    EN_PASSANT_SQUARE = (fenEnPassantSquare != '-') ? parseSquare(fenEnPassantSquare) : SQUARE_NULL;

    let fenHalfMoveClock = fenParts[4] ?? '0';
    PLY_CLOCK = parseInt(fenHalfMoveClock, 10);

    let fenFullMoveCount = fenParts[5] ?? '1';
    MOVE_NUMBER = parseInt(fenFullMoveCount, 10);
}

function isSquareAttacked(square, color) {
    let coloredQueen = makePiece(color, QUEEN);
    let coloredRook = makePiece(color, ROOK);
    let coloredBishop = makePiece(color, BISHOP);
    let coloredKnight = makePiece(color, KNIGHT);
    let coloredKing = makePiece(color, KING);
    let coloredPawn = makePiece(color, PAWN);
    let directions, d, step, targetSquare, targetPiece;

    directions = MOVE_DIRECTIONS[BISHOP];
    for (d = 0; d < directions.length; d++) {
        targetSquare = square; step = 0;
        do {
            targetSquare += directions[d]; step++;
            if (targetSquare & OUT_OF_BOARD_MASK) break;
            targetPiece = BOARD[targetSquare];
            if (targetPiece == NULL) continue;
            if (targetPiece == coloredBishop || targetPiece == coloredQueen) return true;
            if (step == 1) {
                if (targetPiece == coloredKing) return true;
                if (targetPiece == coloredPawn && ((1 - 2 * color) ^ directions[d]) > 0) return true;
            }
            break;
        } while (true);
    }

    directions = MOVE_DIRECTIONS[ROOK];
    for (d = 0; d < directions.length; d++) {
        targetSquare = square; step = 0;
        do {
            targetSquare += directions[d]; step++;
            if (targetSquare & OUT_OF_BOARD_MASK) break;
            targetPiece = BOARD[targetSquare];
            if (targetPiece == NULL) continue;
            if (targetPiece == coloredRook || targetPiece == coloredQueen) return true;
            if (step == 1 && targetPiece == coloredKing) return true;
            break;
        } while (true);
    }

    directions = MOVE_DIRECTIONS[KNIGHT];
    for (d = 0; d < directions.length; d++) {
        targetSquare = square + directions[d];
        if (targetSquare & OUT_OF_BOARD_MASK) continue;
        targetPiece = BOARD[targetSquare];
        if (targetPiece == coloredKnight) return true;
    }

    return false;
}

function createMove(moveFlags, fromSquare, toSquare, capturedPiece = NULL) {
    return moveFlags | (fromSquare << 8) | (toSquare << 16) | (capturedPiece << 24);
}

function generateMoves() {
    let moveList = [];
    let piece;
    let fromSquare, toSquare;
    let toPiece;
    let forward = UP * (1 - 2 * ACTIVE_COLOR);

    for (let pieceType = PAWN; pieceType <= QUEEN; pieceType++) {
        piece = makePiece(ACTIVE_COLOR, pieceType);
        let pieceCount = PIECE_COUNT[piece];
        for (let p = 0; p < pieceCount; p++) {
            fromSquare = PIECE_LIST[10 * piece + p];

            if (pieceType == PAWN) {
                toSquare = fromSquare + forward;
                if (BOARD[toSquare] == NULL) {
                    if ((toSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR]) {
                        moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_QUEEN, fromSquare, toSquare));
                        moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_ROOK, fromSquare, toSquare));
                        moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_BISHOP, fromSquare, toSquare));
                        moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_KNIGHT, fromSquare, toSquare));
                    } else {
                        moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE, fromSquare, toSquare));

                        if ((fromSquare & RANK_MASK) == PAWN_STARTING_RANK[ACTIVE_COLOR]) {
                            toSquare += forward;
                            if (BOARD[toSquare] == NULL) {
                                moveList.push(createMove(MF_PAWN_PUSH_2_SQUARES, fromSquare, toSquare));
                            }
                        }
                    }
                }

                for (let lr = LEFT; lr <= RIGHT; lr += 2) {
                    toSquare = fromSquare + forward + lr;
                    if (toSquare & OUT_OF_BOARD_MASK) continue;

                    toPiece = BOARD[toSquare];
                    if (toPiece != NULL && getPieceColor(toPiece) != ACTIVE_COLOR) {
                        if ((toSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR]) {
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_QUEEN, fromSquare, toSquare, toPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_ROOK, fromSquare, toSquare, toPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_BISHOP, fromSquare, toSquare, toPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_KNIGHT, fromSquare, toSquare, toPiece));
                        } else {
                            moveList.push(createMove(MF_PAWN_CAPTURE, fromSquare, toSquare, toPiece));
                        }
                    }
                    if (toSquare == EN_PASSANT_SQUARE) {
                        moveList.push(createMove(MF_PAWN_CAPTURE_EN_PASSANT, fromSquare, toSquare));
                    }
                }

            } else {
                let slide = pieceType & PIECE_SLIDER_MASK;
                let directions = MOVE_DIRECTIONS[pieceType];
                for (let d = 0; d < directions.length; d++) {
                    toSquare = fromSquare;
                    do {
                        toSquare += directions[d];
                        if (toSquare & OUT_OF_BOARD_MASK) break;

                        toPiece = BOARD[toSquare];
                        if (toPiece != NULL) {
                            if (getPieceColor(toPiece) != ACTIVE_COLOR) {
                                moveList.push(createMove(MF_PIECE_CAPTURE_MOVE, fromSquare, toSquare, toPiece));
                            }
                            break;
                        }

                        moveList.push(createMove(MF_PIECE_NORMAL_MOVE, fromSquare, toSquare));
                    } while (slide);
                }
            }
        }
    }

    if (KINGSIDE_CASTLING[ACTIVE_COLOR] & CASTLING_RIGHTS) {
        let kingSquare = PIECE_LIST[makePiece(ACTIVE_COLOR, KING) * 10];
        if (BOARD[kingSquare + RIGHT] == NULL
            && BOARD[kingSquare + RIGHT + RIGHT] == NULL) {

            if (!isSquareAttacked(kingSquare, 1 - ACTIVE_COLOR)
                && !isSquareAttacked(kingSquare + RIGHT, 1 - ACTIVE_COLOR)) {
                moveList.push(createMove(MF_KINGSIDE_CASTLING, kingSquare, kingSquare + RIGHT + RIGHT));
            }
        }
    }

    if (QUEENSIDE_CASTLING[ACTIVE_COLOR] & CASTLING_RIGHTS) {
        let kingSquare = PIECE_LIST[makePiece(ACTIVE_COLOR, KING) * 10];
        if (BOARD[kingSquare + LEFT] == NULL
            && BOARD[kingSquare + LEFT + LEFT] == NULL
            && BOARD[kingSquare + LEFT + LEFT + LEFT] == NULL) {

            if (!isSquareAttacked(kingSquare, 1 - ACTIVE_COLOR)
                && !isSquareAttacked(kingSquare + LEFT, 1 - ACTIVE_COLOR)) {
                moveList.push(createMove(MF_QUEENSIDE_CASTLING, kingSquare, kingSquare + LEFT + LEFT));
            }
        }
    }

    return moveList;
}

function makeMove(move) {
    EN_PASSANT_SQUARE = SQUARE_NULL;
    PLY_CLOCK++;
    
    let fromSquare = (move >> 8) & 0xFF;
    let toSquare = (move >> 16) & 0xFF;

    if (move & RESET_PLY_CLOCK_FLAG) PLY_CLOCK = 0;

    if (move & SPECIAL_MOVE_MASK) {
        if (move & PAWN_PUSH_2_SQUARES_FLAG) {
            EN_PASSANT_SQUARE = (fromSquare + toSquare) / 2;
        } else if (move & PROMOTION_MASK) {
            removePiece(fromSquare);
            let promotedPiece = makePiece(ACTIVE_COLOR, (move & PROMOTION_MASK));
            addPiece(promotedPiece, fromSquare);
        } else if (move & CASTLING_MOVE_FLAG) {
            ((toSquare & FILE_MASK) == FILE_G) ? movePiece(toSquare + RIGHT, toSquare + LEFT) : movePiece(toSquare + LEFT + LEFT, toSquare + RIGHT);
        } else {
            removePiece((fromSquare & RANK_MASK) + (toSquare & FILE_MASK));
        }
    }

    if (move & CAPTURE_FLAG) removePiece(toSquare);
    movePiece(fromSquare, toSquare);

    CASTLING_RIGHTS &= UPDATE_CASTLING_RIGHTS[fromSquare];
    CASTLING_RIGHTS &= UPDATE_CASTLING_RIGHTS[toSquare];

    ACTIVE_COLOR = 1 - ACTIVE_COLOR;
}

function takeback(move) {
    ACTIVE_COLOR = 1 - ACTIVE_COLOR;

    let fromSquare = (move >> 8) & 0xFF;
    let toSquare = (move >> 16) & 0xFF;

    movePiece(toSquare, fromSquare);
    if (move & CAPTURE_FLAG) addPiece((move >> 24) & 0x0F, toSquare);

    if (move & SPECIAL_MOVE_MASK) {
        if (move & PAWN_PUSH_2_SQUARES_FLAG) {
            // Nothing to takeback
        } else if (move & PROMOTION_MASK) {
            removePiece(fromSquare);
            addPiece(makePiece(ACTIVE_COLOR, PAWN), fromSquare);
        } else if (move & CASTLING_MOVE_FLAG) {
            ((toSquare & FILE_MASK) == FILE_G) ? movePiece(toSquare + LEFT, toSquare + RIGHT) : movePiece(toSquare + RIGHT, toSquare + LEFT + LEFT);
        } else {
            addPiece(makePiece(1 - ACTIVE_COLOR, PAWN), (fromSquare & RANK_MASK) + (toSquare & FILE_MASK));
        }
    }
}

function createGlobalState() {
    return EN_PASSANT_SQUARE | (CASTLING_RIGHTS << 8) | (PLY_CLOCK << 12);
}

function restoreGlobalState(state) {
    EN_PASSANT_SQUARE = state & 0xFF;
    CASTLING_RIGHTS = (state >> 8) & 0x0F;
    PLY_CLOCK = (state >> 12) & 0xFF;
}

function perft(depth) {
    if (depth == 0) return 1;
    let nodes = 0, m, move;
    let state = createGlobalState();
    let moveList = generateMoves();
    for (m = 0; m < moveList.length; m++) {
        move = moveList[m];
        makeMove(move);
        if (!isSquareAttacked(PIECE_LIST[makePiece(1 - ACTIVE_COLOR, KING) * 10], ACTIVE_COLOR)) {
            nodes += perft(depth - 1);
        }
        takeback(move);
        restoreGlobalState(state);
    }
    return nodes;
}

////////////////////////////////////////////////////////////////
//  DISPLAYING AND DEBUGGING FUNCTIONS                        //
////////////////////////////////////////////////////////////////

function toSquareCoordinates(square) {
    let file = String.fromCharCode('a'.charCodeAt(0) + (square & FILE_MASK));
    let rank = 8 - ((square & RANK_MASK) >> 4);
    return file + rank;
}

function toMoveString(move) {
    let moveString = toSquareCoordinates((move >> 8) & 0xFF) + toSquareCoordinates((move >> 16) & 0xFF);
    if (move & PROMOTION_MASK) {
        moveString += PIECE_TYPE_TO_CHAR.get((move & PROMOTION_MASK) >> 5);
    }
    return moveString;
}

function printBoard() {
    let printableBoard = '';
    for (let square = 0; square < BOARD.length; square++) {
        if (square & OUT_OF_BOARD_MASK) continue;
        printableBoard += PIECE_CODE_TO_PRINTABLE_CHAR.get(BOARD[square]) + ' ';
        if ((square + RIGHT) & 0x08) printableBoard += '\n';
    }
    console.log(printableBoard);
}

function divide(depth) {
    printBoard();
    let startTime = Date.now();
    let totalNodes = 0, moveNodes;
    let state = createGlobalState();
    let move, moveList = generateMoves();
    for (let m = 0; m < moveList.length; m++) {
        move = moveList[m];
        makeMove(move);
        if (!isSquareAttacked(PIECE_LIST[makePiece(1 - ACTIVE_COLOR, KING) * 10], ACTIVE_COLOR)) {
            moveNodes = perft(depth - 1);
            console.log(toMoveString(move) + ' : ' + moveNodes);
            totalNodes += moveNodes;
        }
        takeback(move);
        restoreGlobalState(state);
    }
    let endTime = Date.now();
    let time = endTime - startTime;
    console.log('Total nodes : ' + totalNodes);
    console.log('Total time (ms) : ' + time);
    console.log('Nodes per second : ' + Math.round(1000 * totalNodes / time))
    return totalNodes;
}

function testPerft() {
    let perftTests = new Map();
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
    let benchPositions = new Map();
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

////////////////////////////////////////////////////////////////
//  MAIN                                                      //
////////////////////////////////////////////////////////////////

//bench();
//testPerft();

initBoard('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1');
divide(5);
