//
//    +-----------------------------------------------+
//    |           0x88 BOARD REPRESENTATION           |
//    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
//  8 |00|01|02|03|04|05|06|07|08|09|0A|0B|0C|0D|0E|0F|
//  7 |10|11|12|13|14|15|16|17|18|19|1A|1B|1C|1D|1E|1F|
//  6 |20|21|22|23|24|25|26|27|28|29|2A|2B|2C|2D|2E|2F|
//  5 |30|31|32|33|34|35|36|37|38|39|3A|3B|3C|3D|3E|3F|
//  4 |40|41|42|43|44|45|46|47|48|49|4A|4B|4C|4D|4E|4F|
//  3 |50|51|52|53|54|55|56|57|58|59|5A|5B|5C|5D|5E|5F|
//  2 |60|61|62|63|64|65|66|67|68|69|6A|6B|6C|6D|6E|6F|
//  1 |70|71|72|73|74|75|76|77|78|79|7A|7B|7C|7D|7E|7F|
//    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
//      A  B  C  D  E  F  G  H
//
//  +---------------------------------+   +------------------------------------+
//  |          PIECE ENCODING         |   |             MOVE FLAGS             |
//  +-----+-----+------+--------------+   +-----------+------+-----------------+
//  | DEC | HEX | BIN  | DESCRIPTION  |   | BINARY    | HEX  | DESCRIPTION     |
//  +-----+-----+------+--------------+   +-----------+------+-----------------+
//  |   0 |   0 | 0000 | NONE         |   | 0000 0001 | 0x01 | K-SIDE CASTLING |
//  |   1 |   1 | 0001 | WHITE KING   |   | 0000 0010 | 0x02 | Q-SIDE CASTLING |
//  |   2 |   2 | 0010 | WHITE PAWN   |   | 0000 0100 | 0x04 | CAPTURE         |
//  |   3 |   3 | 0011 | WHITE KNIGHT |   | 0000 1000 | 0x08 | PAWN MOVE       |
//  |   4 |   4 | 0100 | WHITE BISHOP |   | 0001 0000 | 0x10 | PAWN SPECIAL    |
//  |   5 |   5 | 0101 | WHITE ROOK   |   | 1110 0000 | 0xE0 | PROMOTED PIECE  |
//  |   6 |   6 | 0110 | WHITE QUEEN  |   +-----------+------+-----------------+
//  |   7 |   7 | 0111 |              |
//  |   8 |   8 | 1000 |              |
//  |   9 |   9 | 1001 | BLACK KING   |
//  |  10 |   A | 1010 | BLACK PAWN   |
//  |  11 |   B | 1011 | BLACK KNIGHT |
//  |  12 |   C | 1100 | BLACK BISHOP |
//  |  13 |   D | 1101 | BLACK ROOK   |
//  |  14 |   E | 1110 | BLACK QUEEN  |
//  |  15 |   F | 1111 |              |
//  +-----+-----+------+--------------+
//  | PIECE_COLOR_MASK  = 1000 = 0x08 |
//  | PIECE_TYPE_MASK   = 0111 = 0x07 |
//  | PIECE_SLIDER_MASK = 0100 = 0x04 |
//  +---------------------------------+
//

////////////////////////////////////////////////////////////////
//  CONSTANTS                                                 //
////////////////////////////////////////////////////////////////

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const NULL = 0;

const KING = 1;
const PAWN = 2;
const KNIGHT = 3;
const BISHOP = 4;
const ROOK = 5;
const QUEEN = 6;

const WHITE = 0;
const BLACK = 1;

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
const FILE_MASK = 0x07;
const RANK_MASK = 0x70;

const RANK_1 = 0x70;
const RANK_2 = 0x60;
const RANK_7 = 0x10;
const RANK_8 = 0x00;
const PAWN_STARTING_RANK = [RANK_2, RANK_7];
const PAWN_PROMOTING_RANK = [RANK_8, RANK_1];

const SQUARE_NULL = 0x7F;
const A1 = 0x70;
const H1 = 0x77;
const A8 = 0x00;
const H8 = 0x07;

const KINGSIDE_CASTLING_BIT = 0x01;
const QUEENSIDE_CASTLING_BIT = 0x02;
const CAPTURE_BIT = 0x04;
const PAWN_MOVE_BIT = 0x08;
const PAWN_SPECIAL_BIT = 0x10;
const PROMOTION_MASK = 0xE0;
const PAWN_MOVE_OR_CAPTURE_MASK = PAWN_MOVE_BIT + CAPTURE_BIT;

const MF_PAWN_PUSH_1_SQUARE = PAWN_MOVE_BIT;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_QUEEN = PAWN_MOVE_BIT + (QUEEN << 5);
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_ROOK = PAWN_MOVE_BIT + (ROOK << 5);
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_BISHOP = PAWN_MOVE_BIT + (BISHOP << 5);
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_KNIGHT = PAWN_MOVE_BIT + (KNIGHT << 5);
const MF_PAWN_PUSH_2_SQUARES = PAWN_MOVE_BIT + PAWN_SPECIAL_BIT;
const MF_PAWN_CAPTURE = PAWN_MOVE_BIT + CAPTURE_BIT;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_QUEEN = PAWN_MOVE_BIT + CAPTURE_BIT + (QUEEN << 5);
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_ROOK = PAWN_MOVE_BIT + CAPTURE_BIT + (ROOK << 5);
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_BISHOP = PAWN_MOVE_BIT + CAPTURE_BIT + (BISHOP << 5);
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_KNIGHT = PAWN_MOVE_BIT + CAPTURE_BIT + (KNIGHT << 5);
const MF_PAWN_CAPTURE_EN_PASSANT = PAWN_MOVE_BIT + CAPTURE_BIT + PAWN_SPECIAL_BIT;
const MF_PIECE_NORMAL_MOVE = 0;
const MF_PIECE_CAPTURE_MOVE = CAPTURE_BIT;
const MF_KINGSIDE_CASTLING = KINGSIDE_CASTLING_BIT;
const MF_QUEENSIDE_CASTLING = QUEENSIDE_CASTLING_BIT;

const PIECE_TYPE_TO_CHAR = new Map([
    [PAWN, 'p'], [KNIGHT, 'n'], [BISHOP, 'b'], [ROOK, 'r'], [QUEEN, 'q'], [KING, 'k']
]);

const FEN_CHAR_TO_PIECE_CODE = new Map([
    ['P', WHITE_PAWN], ['N', WHITE_KNIGHT], ['B', WHITE_BISHOP], ['R', WHITE_ROOK], ['Q', WHITE_QUEEN], ['K', WHITE_KING],
    ['p', BLACK_PAWN], ['n', BLACK_KNIGHT], ['b', BLACK_BISHOP], ['r', BLACK_ROOK], ['q', BLACK_QUEEN], ['k', BLACK_KING]
]);

const MOVE_DIRECTIONS = [
    [],
    [UP, RIGHT, DOWN, LEFT, UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT], // KING
    [], // PAWN
    [UP + UP + LEFT, UP + UP + RIGHT, DOWN + DOWN + LEFT, DOWN + DOWN + RIGHT, LEFT + LEFT + UP, LEFT + LEFT + DOWN, RIGHT + RIGHT + UP, RIGHT + RIGHT + DOWN], // KNIGHT
    [UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT], // BISHOP
    [UP, RIGHT, DOWN, LEFT], // ROOK
    [UP, RIGHT, DOWN, LEFT, UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT] // QUEEN
];

const PIECE_VALUE = [0, 20000, 100, 320, 330, 500, 900];
const INFINITY = 100000;
const MATE_VALUE = 50000;

const PIECE_SQUARE_TABLES = new Int8Array([
    // KING
    -30,-40,-40,-50,-50,-40,-40,-30,  20, 30, 10,  0,  0, 10, 30, 20,
    -30,-40,-40,-50,-50,-40,-40,-30,  20, 20,  0,  0,  0,  0, 20, 20,
    -30,-40,-40,-50,-50,-40,-40,-30, -10,-20,-20,-20,-20,-20,-20,-10,
    -30,-40,-40,-50,-50,-40,-40,-30, -20,-30,-30,-40,-40,-30,-30,-20,
    -20,-30,-30,-40,-40,-30,-30,-20, -30,-40,-40,-50,-50,-40,-40,-30,
    -10,-20,-20,-20,-20,-20,-20,-10, -30,-40,-40,-50,-50,-40,-40,-30,
     20, 20,  0,  0,  0,  0, 20, 20, -30,-40,-40,-50,-50,-40,-40,-30,
     20, 30, 10,  0,  0, 10, 30, 20, -30,-40,-40,-50,-50,-40,-40,-30,
    // PAWN
      0,  0,  0,  0,  0,  0,  0,  0,   0,  0,  0,  0,  0,  0,  0,  0,
     50, 50, 50, 50, 50, 50, 50, 50,   5, 10, 10,-20,-20, 10, 10,  5,
     10, 10, 20, 30, 30, 20, 10, 10,   5, -5,-10,  0,  0,-10, -5,  5,
      5,  5, 10, 25, 25, 10,  5,  5,   0,  0,  0, 20, 20,  0,  0,  0,
      0,  0,  0, 20, 20,  0,  0,  0,   5,  5, 10, 25, 25, 10,  5,  5,
      5, -5,-10,  0,  0,-10, -5,  5,  10, 10, 20, 30, 30, 20, 10, 10,
      5, 10, 10,-20,-20, 10, 10,  5,  50, 50, 50, 50, 50, 50, 50, 50,
      0,  0,  0,  0,  0,  0,  0,  0,   0,  0,  0,  0,  0,  0,  0,  0,
    // KNIGHT
    -50,-40,-30,-30,-30,-30,-40,-50, -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40, -40,-20,  0,  5,  5,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30, -30,  5, 10, 15, 15, 10,  5,-30,
    -30,  5, 15, 20, 20, 15,  5,-30, -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  0, 15, 20, 20, 15,  0,-30, -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  5, 10, 15, 15, 10,  5,-30, -30,  0, 10, 15, 15, 10,  0,-30,
    -40,-20,  0,  5,  5,  0,-20,-40, -40,-20,  0,  0,  0,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50, -50,-40,-30,-30,-30,-30,-40,-50,
    // BISHOP
    -20,-10,-10,-10,-10,-10,-10,-20, -20,-10,-10,-10,-10,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10, -10,  5,  0,  0,  0,  0,  5,-10,
    -10,  0,  5, 10, 10,  5,  0,-10, -10, 10, 10, 10, 10, 10, 10,-10,
    -10,  5,  5, 10, 10,  5,  5,-10, -10,  0, 10, 10, 10, 10,  0,-10,
    -10,  0, 10, 10, 10, 10,  0,-10, -10,  5,  5, 10, 10,  5,  5,-10,
    -10, 10, 10, 10, 10, 10, 10,-10, -10,  0,  5, 10, 10,  5,  0,-10,
    -10,  5,  0,  0,  0,  0,  5,-10, -10,  0,  0,  0,  0,  0,  0,-10,
    -20,-10,-10,-10,-10,-10,-10,-20, -20,-10,-10,-10,-10,-10,-10,-20,
    // ROOK
      0,  0,  0,  0,  0,  0,  0,  0,   0,  0,  0,  5,  5,  0,  0,  0,
      5, 10, 10, 10, 10, 10, 10,  5,  -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,  -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,  -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,  -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,  -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,   5, 10, 10, 10, 10, 10, 10,  5,
      0,  0,  0,  5,  5,  0,  0,  0,   0,  0,  0,  0,  0,  0,  0,  0,
    //QUEEN
    -20,-10,-10, -5, -5,-10,-10,-20, -20,-10,-10, -5, -5,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10, -10,  0,  5,  0,  0,  0,  0,-10,
    -10,  0,  5,  5,  5,  5,  0,-10, -10,  5,  5,  5,  5,  5,  0,-10,
     -5,  0,  5,  5,  5,  5,  0, -5,   0,  0,  5,  5,  5,  5,  0, -5,
      0,  0,  5,  5,  5,  5,  0, -5,  -5,  0,  5,  5,  5,  5,  0, -5,
    -10,  5,  5,  5,  5,  5,  0,-10, -10,  0,  5,  5,  5,  5,  0,-10,
    -10,  0,  5,  0,  0,  0,  0,-10, -10,  0,  0,  0,  0,  0,  0,-10,
    -20,-10,-10, -5, -5,-10,-10,-20, -20,-10,-10, -5, -5,-10,-10,-20
]);

////////////////////////////////////////////////////////////////
//  GLOBAL VARIABLES                                          //
////////////////////////////////////////////////////////////////

let BOARD = new Uint8Array(128);
let PIECE_LIST = new Uint8Array(160);
let PIECE_COUNT = new Uint8Array(16);
let ACTIVE_COLOR = WHITE;
let MOVE_STACK: number[] = [];
let HISTORY_STACK: number[] = [];
let EN_PASSANT_SQUARE = SQUARE_NULL;
let CASTLING_RIGHTS = [NULL, NULL];
let PLY_CLOCK = 0;
let MOVE_NUMBER = 1;

let NODE_COUNT = 0;
let SEARCH_DEPTH = 0;
let BEST_MOVE: number[] = [];

let TIME_LIMIT = Number.MAX_SAFE_INTEGER;
let DEPTH_LIMIT = 7;
let NODE_LIMIT = Number.MAX_SAFE_INTEGER;
let STOP_SEARCH = false;
let FORCE_STOP = false;
let SEARCH_STARTING_TIME = Date.now();

////////////////////////////////////////////////////////////////
//  FUNCTIONS                                                 //
////////////////////////////////////////////////////////////////

let random = 2463534242;
function getRandom() {
    random ^= (random << 13);
    random ^= (random >> 17);
    random ^= (random << 5);
    return random;
}

function makePiece(color: number, pieceType: number) {
    return pieceType | (color << 3);
}

function getPieceColor(piece: number) {
    return (piece & PIECE_COLOR_MASK) >> 3;
}

function getPieceType(piece: number) {
    return (piece & PIECE_TYPE_MASK);
}

function getKingSquare(color: number) {
    return PIECE_LIST[makePiece(color, KING) * 10];
}

function movePiece(fromSquare: number, toSquare: number) {
    let piece = BOARD[fromSquare];
    BOARD[fromSquare] = NULL;
    BOARD[toSquare] = piece;

    let i = 10 * piece;
    while (PIECE_LIST[i] != fromSquare) i++;
    PIECE_LIST[i] = toSquare;
}

function addPiece(piece: number, square: number) {
    BOARD[square] = piece;

    let pieceCount = PIECE_COUNT[piece]++;
    PIECE_LIST[piece * 10 + pieceCount] = square;
}

function removePiece(square: number) {
    let piece = BOARD[square];
    BOARD[square] = NULL;

    let pieceCount = PIECE_COUNT[piece]--;
    let i = 10 * piece;
    for (let j = 0; j < pieceCount - 1; j++) {
        if (PIECE_LIST[i + j] == square) {
            PIECE_LIST[i + j] = PIECE_LIST[i + pieceCount - 1];
            break;
        }
    }
}

function parseSquare(squareCoordinates: string): number {
    return (squareCoordinates.charCodeAt(0) - 'a'.charCodeAt(0))
        - 16 * (squareCoordinates.charCodeAt(1) - '8'.charCodeAt(0));
}

function toSquareCoordinates(square: number) {
    let file = String.fromCharCode('a'.charCodeAt(0) + (square & FILE_MASK));
    let rank = 8 - ((square & RANK_MASK) >> 4);
    return file + rank;
}

function clearBoard() {
    BOARD.fill(NULL);
    PIECE_COUNT.fill(NULL);
    PIECE_LIST.fill(NULL);
    ACTIVE_COLOR = WHITE;
    MOVE_STACK = [];
    HISTORY_STACK = [];
    EN_PASSANT_SQUARE = SQUARE_NULL;
    CASTLING_RIGHTS = [NULL, NULL];
    PLY_CLOCK = 0;
    MOVE_NUMBER = 1;
}

function initBoard(fen: string = STARTING_FEN) {
    let fenParts = fen.split(' ');

    let fenBoard = fenParts[0];
    let fenActiveColor = fenParts[1];
    let fenCastlingRights = fenParts[2];
    let fenEnPassantSquare = fenParts[3];
    let fenHalfMoveClock = fenParts[4];
    let fenFullMoveCount = fenParts[5];

    clearBoard();

    let index = 0;
    for (let c of fenBoard) {
        if (c == '/') {
            index += 8;
        } else if (isNaN(parseInt(c, 10))) {
            let piece = FEN_CHAR_TO_PIECE_CODE.get(c)!;
            addPiece(piece, index);
            index += 1;
        } else {
            index += parseInt(c, 10);
        }
    }

    if (fenActiveColor == 'b') ACTIVE_COLOR = BLACK;

    if (fenCastlingRights.includes('K')) CASTLING_RIGHTS[WHITE] |= KINGSIDE_CASTLING_BIT;
    if (fenCastlingRights.includes('Q')) CASTLING_RIGHTS[WHITE] |= QUEENSIDE_CASTLING_BIT;
    if (fenCastlingRights.includes('k')) CASTLING_RIGHTS[BLACK] |= KINGSIDE_CASTLING_BIT;
    if (fenCastlingRights.includes('q')) CASTLING_RIGHTS[BLACK] |= QUEENSIDE_CASTLING_BIT;

    if (fenEnPassantSquare != '-') {
        EN_PASSANT_SQUARE = parseSquare(fenEnPassantSquare);
    }

    PLY_CLOCK = parseInt(fenHalfMoveClock, 10);

    MOVE_NUMBER = parseInt(fenFullMoveCount, 10);
}

function generateMoves(captureOnly: boolean = false): number[] {
    let moveList: number[] = [];

    let fromSquare;
    let piece;
    let toSquare;
    let capturedPiece;
    let direction = UP * (1 - 2 * ACTIVE_COLOR);

    for (let pieceType = KING; pieceType <= QUEEN; pieceType++) {
        piece = makePiece(ACTIVE_COLOR, pieceType);
        let pieceCount = PIECE_COUNT[piece];
        for (let p = 0; p < pieceCount; p++) {
            fromSquare = PIECE_LIST[10 * piece + p];

            if (pieceType == PAWN) {
                if (!captureOnly) {
                    toSquare = fromSquare + direction;
                    if (BOARD[toSquare] == NULL) {
                        if ((toSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR]) {
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_QUEEN, fromSquare, toSquare));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_ROOK, fromSquare, toSquare));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_BISHOP, fromSquare, toSquare));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_KNIGHT, fromSquare, toSquare));
                        } else {
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE, fromSquare, toSquare));

                            if ((fromSquare & RANK_MASK) == PAWN_STARTING_RANK[ACTIVE_COLOR]) {
                                toSquare += direction;
                                if (BOARD[toSquare] == NULL) {
                                    moveList.push(createMove(MF_PAWN_PUSH_2_SQUARES, fromSquare, toSquare));
                                }
                            }
                        }
                    }
                }

                for (let lr = LEFT; lr <= RIGHT; lr += 2) {
                    toSquare = fromSquare + direction + lr;
                    if (toSquare & OUT_OF_BOARD_MASK) continue;

                    capturedPiece = BOARD[toSquare];
                    if (capturedPiece != NULL && getPieceColor(capturedPiece) != ACTIVE_COLOR) {
                        if ((toSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR]) {
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_QUEEN, fromSquare, toSquare, capturedPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_ROOK, fromSquare, toSquare, capturedPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_BISHOP, fromSquare, toSquare, capturedPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_KNIGHT, fromSquare, toSquare, capturedPiece));
                        } else {
                            moveList.push(createMove(MF_PAWN_CAPTURE, fromSquare, toSquare, capturedPiece));
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

                        capturedPiece = BOARD[toSquare];
                        if (capturedPiece != NULL) {
                            if (getPieceColor(capturedPiece) != ACTIVE_COLOR) {
                                moveList.push(createMove(MF_PIECE_CAPTURE_MOVE, fromSquare, toSquare, capturedPiece));
                            }
                            break;
                        }
                        if (!captureOnly) {
                            moveList.push(createMove(MF_PIECE_NORMAL_MOVE, fromSquare, toSquare));
                        }
                    } while (slide);
                }
            }
        }
    }

    if (!captureOnly) {
        if (CASTLING_RIGHTS[ACTIVE_COLOR] & KINGSIDE_CASTLING_BIT) {
            let kingSquare = getKingSquare(ACTIVE_COLOR);
            if (BOARD[kingSquare + RIGHT] == NULL
                && BOARD[kingSquare + RIGHT + RIGHT] == NULL) {

                if (!isSquareAttacked(kingSquare, 1 - ACTIVE_COLOR)
                    && !isSquareAttacked(kingSquare + RIGHT, 1 - ACTIVE_COLOR)) {
                    moveList.push(createMove(MF_KINGSIDE_CASTLING, kingSquare, kingSquare + RIGHT + RIGHT));
                }
            }
        }

        if (CASTLING_RIGHTS[ACTIVE_COLOR] & QUEENSIDE_CASTLING_BIT) {
            let kingSquare = getKingSquare(ACTIVE_COLOR);
            if (BOARD[kingSquare + LEFT] == NULL
                && BOARD[kingSquare + LEFT + LEFT] == NULL
                && BOARD[kingSquare + LEFT + LEFT + LEFT] == NULL) {

                if (!isSquareAttacked(kingSquare, 1 - ACTIVE_COLOR)
                    && !isSquareAttacked(kingSquare + LEFT, 1 - ACTIVE_COLOR)) {
                    moveList.push(createMove(MF_QUEENSIDE_CASTLING, kingSquare, kingSquare + LEFT + LEFT));
                }
            }
        }
    }

    return sortMoveList(moveList);
}

function sortMoveList(moveList: number[]) {
    let j = 0;
    let key = 0;
    let capturedPiece = 0;
    for (let i = 1; i < moveList.length; i++) {
        key = moveList[i];
        capturedPiece = getCapturedPiece(key);
        j = i - 1;
        while (j >= 0 && getCapturedPiece(moveList[j]) < capturedPiece) {
            moveList[j + 1] = moveList[j];
            j = j - 1;
        }
        moveList[j + 1] = key;
    }
    return moveList;
}

function createMove(moveFlags: number, fromSquare: number, toSquare: number, capturedPiece: number = NULL): number {
    return moveFlags | (fromSquare << 8) | (toSquare << 16) | (capturedPiece << 24);
}

function getMoveFlags(move: number) {
    return move & 0xFF;
}

function getFromSquare(move: number) {
    return (move >> 8) & 0xFF;
}

function getToSquare(move: number) {
    return (move >> 16) & 0xFF;
}

function getCapturedPiece(move: number) {
    return (move >> 24) & 0x0F;
}

function createHistory(enPassantSquare: number, castlingRights: number[], plyClock: number): number {
    return enPassantSquare | (castlingRights[WHITE] << 8) | (castlingRights[BLACK] << 10) | (plyClock << 12);
}

function getEnPassantSquare(history: number) {
    return history & 0xFF;
}

function getWhiteCastlingRights(history: number) {
    return (history >> 8) & 0x03;
}

function getBlackCastlingRights(history: number) {
    return (history >> 10) & 0x03;
}

function getPlyClock(history: number) {
    return (history >> 12) & 0xFF;
}

function makeMove(move: number): void {
    MOVE_STACK.push(move);
    HISTORY_STACK.push(createHistory(EN_PASSANT_SQUARE, CASTLING_RIGHTS, PLY_CLOCK));
    EN_PASSANT_SQUARE = SQUARE_NULL;
    PLY_CLOCK++;
    MOVE_NUMBER += ACTIVE_COLOR;

    let moveFlags = getMoveFlags(move);
    let fromSquare = getFromSquare(move);
    let toSquare = getToSquare(move);

    if (moveFlags & PAWN_MOVE_OR_CAPTURE_MASK) {
        PLY_CLOCK = 0;
    }

    if (moveFlags & CAPTURE_BIT) {
        if (moveFlags & PAWN_SPECIAL_BIT) {
            removePiece((fromSquare & RANK_MASK) + (toSquare & FILE_MASK));
        } else {
            removePiece(toSquare);
        }
    } else {
        if (moveFlags & PAWN_SPECIAL_BIT) {
            EN_PASSANT_SQUARE = (fromSquare + toSquare) / 2;
        }
    }

    if (moveFlags & PROMOTION_MASK) {
        removePiece(fromSquare);
        let promotedPiece = makePiece(ACTIVE_COLOR, (moveFlags & PROMOTION_MASK) >> 5);
        addPiece(promotedPiece, toSquare);
    } else {
        movePiece(fromSquare, toSquare);
    }

    if ((BOARD[toSquare] & PIECE_TYPE_MASK) == KING) {
        CASTLING_RIGHTS[ACTIVE_COLOR] = NULL;

        if (moveFlags & KINGSIDE_CASTLING_BIT) {
            movePiece(toSquare + RIGHT, toSquare + LEFT);
        } else if (moveFlags & QUEENSIDE_CASTLING_BIT) {
            movePiece(toSquare + LEFT + LEFT, toSquare + RIGHT);
        }
    }

    if (fromSquare == A1 || toSquare == A1) CASTLING_RIGHTS[WHITE] &= KINGSIDE_CASTLING_BIT;
    if (fromSquare == H1 || toSquare == H1) CASTLING_RIGHTS[WHITE] &= QUEENSIDE_CASTLING_BIT;
    if (fromSquare == A8 || toSquare == A8) CASTLING_RIGHTS[BLACK] &= KINGSIDE_CASTLING_BIT;
    if (fromSquare == H8 || toSquare == H8) CASTLING_RIGHTS[BLACK] &= QUEENSIDE_CASTLING_BIT;

    ACTIVE_COLOR = 1 - ACTIVE_COLOR;
}

function takeback(): void {
    ACTIVE_COLOR = 1 - ACTIVE_COLOR;

    let history = HISTORY_STACK.pop()!;
    EN_PASSANT_SQUARE = getEnPassantSquare(history);
    CASTLING_RIGHTS[WHITE] = getWhiteCastlingRights(history);
    CASTLING_RIGHTS[BLACK] = getBlackCastlingRights(history);
    PLY_CLOCK = getPlyClock(history);
    MOVE_NUMBER -= ACTIVE_COLOR;

    let move = MOVE_STACK.pop()!;
    let moveFlags = getMoveFlags(move);
    let fromSquare = getFromSquare(move);
    let toSquare = getToSquare(move);

    if (moveFlags & PROMOTION_MASK) {
        removePiece(toSquare);
        addPiece(makePiece(ACTIVE_COLOR, PAWN), fromSquare);
    } else {
        movePiece(toSquare, fromSquare);
    }

    if (moveFlags & CAPTURE_BIT) {
        if (moveFlags & PAWN_SPECIAL_BIT) {
            addPiece(makePiece(1 - ACTIVE_COLOR, PAWN), (fromSquare & RANK_MASK) + (toSquare & FILE_MASK));
        } else {
            addPiece(getCapturedPiece(move), toSquare);
        }
    }

    if ((BOARD[fromSquare] & PIECE_TYPE_MASK) == KING) {
        if (moveFlags & KINGSIDE_CASTLING_BIT) {
            movePiece(toSquare + LEFT, toSquare + RIGHT);
        } else if (moveFlags & QUEENSIDE_CASTLING_BIT) {
            movePiece(toSquare + RIGHT, toSquare + LEFT + LEFT);
        }
    }
}

function isSquareAttacked(square: number, color: number): boolean {
    for (let pieceType = KING; pieceType <= QUEEN; pieceType++) {
        let piece = makePiece(color, pieceType);
        if (pieceType == PAWN) {
            let direction = DOWN * (1 - 2 * color);
            for (let lr = LEFT; lr <= RIGHT; lr += 2) {
                let targetSquare = square + direction + lr;
                if (!(targetSquare & OUT_OF_BOARD_MASK) && BOARD[targetSquare] == piece) {
                    return true;
                }
            }
        } else {
            let slide = pieceType & PIECE_SLIDER_MASK;
            let directions = MOVE_DIRECTIONS[pieceType];
            for (let d = 0; d < directions.length; d++) {
                let targetSquare = square;
                do {
                    targetSquare += directions[d];
                    if (targetSquare & OUT_OF_BOARD_MASK) break;
                    let targetPiece = BOARD[targetSquare];
                    if (targetPiece != NULL) {
                        if (targetPiece == piece) return true;
                        break;
                    }
                } while (slide);
            }
        }
    }
    return false;
}

function checkStopConditions() {
    if (FORCE_STOP && (NODE_COUNT & 2047)) {
        if ((Date.now() - SEARCH_STARTING_TIME > TIME_LIMIT - 10) || (NODE_COUNT + 2048 > NODE_LIMIT)) {
            STOP_SEARCH = true;
        }
    }
}

function evaluateMaterial(color: number): number {
    let score = 0;
    for (let pieceType = PAWN; pieceType <= QUEEN; pieceType++) {
        score += PIECE_COUNT[makePiece(color, pieceType)] * PIECE_VALUE[pieceType];
    }
    return score;
}

function evaluatePST(color: number): number {
    let score = 0;
    for (let pieceType = KING; pieceType <= QUEEN; pieceType++) {
        let pstIndex = (pieceType - 1) * 128 + color * 8;
        let piece = makePiece(color, pieceType);
        let pieceCount = PIECE_COUNT[piece];
        for (let p = 0; p < pieceCount; p++) {
            let square = PIECE_LIST[10 * piece + p];
            score += PIECE_SQUARE_TABLES[pstIndex + square];
        }
    }
    return score;
}

function evaluate(): number {
    NODE_COUNT++;
    checkStopConditions();

    let score = 0;
    score += evaluateMaterial(ACTIVE_COLOR) - evaluateMaterial(1 - ACTIVE_COLOR);
    score += evaluatePST(ACTIVE_COLOR) - evaluatePST(1 - ACTIVE_COLOR);
    return score;
}

function quiesce(alpha: number, beta: number): number {
    let score = evaluate();
    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
    if (STOP_SEARCH) return alpha;

    let moveList = generateMoves(true);
    for (let m = 0; m < moveList.length; m++) {
        makeMove(moveList[m]);

        if (isSquareAttacked(getKingSquare(1 - ACTIVE_COLOR), ACTIVE_COLOR)) {
            takeback();
            continue;
        }

        score = -quiesce(-beta, -alpha);
        takeback();

        if (score >= beta) return beta;
        if (score > alpha) alpha = score;
        if (STOP_SEARCH) return alpha;
    }

    return alpha;
}

function alphaBeta(alpha: number, beta: number, depth: number): number {
    if (depth == 0) return quiesce(alpha, beta);

    let legalMoveCount = 0;
    let moveList = generateMoves();
    for (let m = 0; m < moveList.length; m++) {
        makeMove(moveList[m]);

        if (isSquareAttacked(getKingSquare(1 - ACTIVE_COLOR), ACTIVE_COLOR)) {
            takeback();
            continue;
        }

        legalMoveCount++;
        let score = -alphaBeta(-beta, -alpha, depth - 1);
        takeback();
        
        if (score >= beta) return beta;
        if (score > alpha) {
            alpha = score;
            if (depth == SEARCH_DEPTH) {
                BEST_MOVE[SEARCH_DEPTH] = moveList[m];
            }
        }
        if (STOP_SEARCH) return alpha;
    }

    if (legalMoveCount == 0) {
        if (isSquareAttacked(getKingSquare(ACTIVE_COLOR), 1 - ACTIVE_COLOR)) {
            return -MATE_VALUE - depth;
        } else {
            return 0;
        }
    }

    return alpha;
}

function search() {
    NODE_COUNT = 0;
    SEARCH_DEPTH = 0;
    SEARCH_STARTING_TIME = Date.now();

    let score = 0;
    let elapsedTime = 0;
    do {
        SEARCH_DEPTH++;
        score = alphaBeta(-INFINITY, +INFINITY, SEARCH_DEPTH);
        if (STOP_SEARCH) break;
        elapsedTime = Math.max(1, Date.now() - SEARCH_STARTING_TIME);
        let infoString = 'info depth ' + SEARCH_DEPTH;
        if (Math.abs(score) >= MATE_VALUE) {
            let mate = Math.sign(score) * Math.ceil((SEARCH_DEPTH - Math.abs(score) + MATE_VALUE) / 2);
            infoString += ' score mate ' + mate;
        } else {
            infoString += ' score cp ' + score;
        }
        infoString += ' time ' + elapsedTime + ' nodes ' + NODE_COUNT + ' nps ' + Math.round(1000 * NODE_COUNT / elapsedTime) + ' pv ' + toMoveString(BEST_MOVE[SEARCH_DEPTH]);
        console.log(infoString);
    } while ((SEARCH_DEPTH < DEPTH_LIMIT) && (elapsedTime < (TIME_LIMIT / 4)));

    if (STOP_SEARCH) SEARCH_DEPTH--;
    console.log('bestmove ' + toMoveString(BEST_MOVE[SEARCH_DEPTH]));
}

function perft(depth: number): number {
    if (depth == 0) return 1;
    let nodes = 0;
    let moveList = generateMoves();
    for (let m = 0; m < moveList.length; m++) {
        makeMove(moveList[m]);
        if (!isSquareAttacked(getKingSquare(1 - ACTIVE_COLOR), ACTIVE_COLOR)) {
            nodes += perft(depth - 1);
        }
        takeback();
    }
    return nodes;
}

////////////////////////////////////////////////////////////////
//  UCI INTEGRATION                                           //
////////////////////////////////////////////////////////////////

function parseMove(move: string) {
    let fromSquare = parseSquare(move.substring(0, 2));
    let toSquare = parseSquare(move.substring(2, 4));
    let piece = BOARD[fromSquare];
    let targetPiece = BOARD[toSquare];
    let moveFlags = 0;
    if (targetPiece != NULL) moveFlags |= CAPTURE_BIT;

    switch (getPieceType(piece)) {
        case PAWN:
            moveFlags |= PAWN_MOVE_BIT;
            let moveDistance = Math.abs(fromSquare - toSquare);
            if (moveDistance == 32) moveFlags |= PAWN_SPECIAL_BIT;
            if ((moveDistance == 15 || moveDistance == 17) && targetPiece == NULL) {
                moveFlags |= CAPTURE_BIT;
                moveFlags |= PAWN_SPECIAL_BIT;
            }
            if (move.length > 4) {
                let promotedPiece = FEN_CHAR_TO_PIECE_CODE.get(move.charAt(4))!;
                moveFlags |= (getPieceType(promotedPiece) << 5);
            }
            return createMove(moveFlags, fromSquare, toSquare, targetPiece);
        case KING:
            if ((fromSquare - toSquare) == 2) moveFlags |= QUEENSIDE_CASTLING_BIT;
            if ((fromSquare - toSquare) == -2) moveFlags |= KINGSIDE_CASTLING_BIT;
            return createMove(moveFlags, fromSquare, toSquare, targetPiece);
        default:
            return createMove(moveFlags, fromSquare, toSquare, targetPiece);
    }
}

function toMoveString(move: number) {
    let moveString = toSquareCoordinates(getFromSquare(move)) + toSquareCoordinates(getToSquare(move));
    let moveFlags = getMoveFlags(move);
    if (moveFlags & PROMOTION_MASK) {
        moveString += PIECE_TYPE_TO_CHAR.get((moveFlags & PROMOTION_MASK) >> 5);
    }
    return moveString;
}

function parseGoCommand(commandParts: string[]) {
    TIME_LIMIT = Number.MAX_SAFE_INTEGER;
    DEPTH_LIMIT = Number.MAX_SAFE_INTEGER;
    NODE_LIMIT = Number.MAX_SAFE_INTEGER;
    STOP_SEARCH = false;
    FORCE_STOP = true;

    switch (commandParts[1]) {
        case 'depth':
            DEPTH_LIMIT = parseInt(commandParts[2], 10);
            break;
        case 'nodes':
            NODE_LIMIT = parseInt(commandParts[2], 10);
            break;
        case 'movetime':
            TIME_LIMIT = parseInt(commandParts[2], 10);
            break;
        case 'infinite':
            break;
        default:
            let availableTime = (ACTIVE_COLOR == WHITE) ? commandParts.indexOf('wtime') : commandParts.indexOf('btime');
            if (availableTime > 0) availableTime = parseInt(commandParts[availableTime + 1], 10);
            let increment = (ACTIVE_COLOR == WHITE) ? commandParts.indexOf('winc') : commandParts.indexOf('binc');
            if (increment > 0) increment = parseInt(commandParts[increment + 1], 10);
            let movesToGo = commandParts.indexOf('movestogo');
            if (movesToGo > 0) {
                movesToGo = Math.min(40, parseInt(commandParts[movesToGo + 1], 10));
            } else {
                movesToGo = 40;
            }
            if (movesToGo > 3) FORCE_STOP = false;
            TIME_LIMIT = (availableTime / movesToGo) + increment;
    }
}

function uci() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (command: string) => {
        let commandParts = command.split(' ');
        switch (commandParts[0]) {
            case 'uci':
                console.log('id name PrimeChess');
                console.log('id author Gonlem');
                console.log('uciok');
                break;
            case 'isready':
                console.log('readyok');
                break;
            case 'ucinewgame':
                initBoard();
                break;
            case 'position':
                if (commandParts[1] == 'fen') {
                    initBoard(command.split(' fen ')[1]);
                } else {
                    initBoard();
                }
                if (command.includes(' moves ')) {
                    let moves = command.split(' moves ')[1].split(' ');
                    for (let move of moves) {
                        makeMove(parseMove(move)!);
                    }
                }
                break;
            case 'go':
                parseGoCommand(commandParts);
                search();
                break;
            case 'stop':
                STOP_SEARCH = true;
                break;
            case 'quit':
                process.exit();
        }
    });
}

////////////////////////////////////////////////////////////////
//  MAIN                                                      //
////////////////////////////////////////////////////////////////

uci();

export {
    WHITE, BLACK, KING, QUEEN, OUT_OF_BOARD_MASK, RIGHT, NULL,
    WHITE_PAWN, WHITE_KNIGHT, WHITE_BISHOP, WHITE_ROOK, WHITE_QUEEN, WHITE_KING,
    BLACK_PAWN, BLACK_KNIGHT, BLACK_BISHOP, BLACK_ROOK, BLACK_QUEEN, BLACK_KING,
    BOARD, PIECE_LIST, initBoard, makePiece, getFromSquare, getToSquare, toSquareCoordinates, perft, search
};
