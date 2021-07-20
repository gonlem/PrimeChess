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

const WHITE = 0;
const BLACK = 1;

const NULL = 0;
const KING = 1;
const PAWN = 2;
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
const FILE_MASK = 0x07;
const RANK_MASK = 0x70;
const SQUARE_NULL = 0x7F;

const RANK_1 = 0x70;
const RANK_2 = 0x60;
const RANK_7 = 0x10;
const RANK_8 = 0x00;
const PAWN_STARTING_RANK = [RANK_2, RANK_7];
const PAWN_PROMOTING_RANK = [RANK_8, RANK_1];

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

const KINGSIDE_CASTLING = new Uint8Array([KINGSIDE_CASTLING_BIT, KINGSIDE_CASTLING_BIT << 2]);
const QUEENSIDE_CASTLING = new Uint8Array([QUEENSIDE_CASTLING_BIT, QUEENSIDE_CASTLING_BIT << 2]);

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

const UPDATE_CASTLING_RIGHTS = new Uint8Array([
    7,15,15,15, 3,15,15,11,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   15,15,15,15,15,15,15,15,  0, 0, 0, 0, 0, 0, 0, 0,
   13,15,15,15,12,15,15,14,  0, 0, 0, 0, 0, 0, 0, 0,
]);

const INFINITY = 100000;
const MATE_VALUE = 50000;
const DRAW_VALUE = 0;
const PIECE_VALUE = [0, 20000, 100, 320, 330, 500, 900];
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
let PIECE_LIST = new Uint8Array(16 * 10);
let PIECE_COUNT = new Uint8Array(16);
let ACTIVE_COLOR = WHITE;
let MOVE_STACK: number[] = [];
let EN_PASSANT_SQUARE = SQUARE_NULL;
let CASTLING_RIGHTS = NULL;
let FIFTY_MOVES_CLOCK = 0;
let GAME_PLY = 0;

let NODE_COUNT = 0;
let SEARCH_DEPTH = 0;
let PV_TABLE: number[] = [];
let FOLLOW_PV = false;

let TIME_LIMIT = Number.MAX_SAFE_INTEGER;
let DEPTH_LIMIT = 8;
let NODE_LIMIT = Number.MAX_SAFE_INTEGER;
let STOP_SEARCH = false;
let FORCE_STOP = false;
let SEARCH_STARTING_TIME = Date.now();

////////////////////////////////////////////////////////////////
//  FUNCTIONS                                                 //
////////////////////////////////////////////////////////////////

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
    
    let i = 10 * piece;
    let lastIndex = --PIECE_COUNT[piece] + i;
    while (PIECE_LIST[i] != square) i++;
    PIECE_LIST[i] = PIECE_LIST[lastIndex];
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
    EN_PASSANT_SQUARE = SQUARE_NULL;
    CASTLING_RIGHTS = NULL;
    FIFTY_MOVES_CLOCK = 0;
}

function initBoard(fen: string = STARTING_FEN) {
    let fenParts = fen.split(' ');
    clearBoard();

    let fenBoard = fenParts[0];
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

    let fenActiveColor = fenParts[1];
    if (fenActiveColor == 'b') ACTIVE_COLOR = BLACK;

    let fenCastlingRights = fenParts[2];
    if (fenCastlingRights.includes('K')) CASTLING_RIGHTS |= KINGSIDE_CASTLING[WHITE];
    if (fenCastlingRights.includes('Q')) CASTLING_RIGHTS |= QUEENSIDE_CASTLING[WHITE];
    if (fenCastlingRights.includes('k')) CASTLING_RIGHTS |= KINGSIDE_CASTLING[BLACK];
    if (fenCastlingRights.includes('q')) CASTLING_RIGHTS |= QUEENSIDE_CASTLING[BLACK];

    let fenEnPassantSquare = fenParts[3];
    if (fenEnPassantSquare != '-') EN_PASSANT_SQUARE = parseSquare(fenEnPassantSquare);

    let fenHalfMoveClock = fenParts[4];
    FIFTY_MOVES_CLOCK = parseInt(fenHalfMoveClock, 10);

    let fenFullMoveCount = fenParts[5];
    GAME_PLY = 2 * (parseInt(fenFullMoveCount, 10) - 1) + ACTIVE_COLOR;
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
        if (KINGSIDE_CASTLING[ACTIVE_COLOR] & CASTLING_RIGHTS) {
            let kingSquare = getKingSquare(ACTIVE_COLOR);
            if (BOARD[kingSquare + RIGHT] == NULL
                && BOARD[kingSquare + RIGHT + RIGHT] == NULL) {

                if (!isSquareAttacked(kingSquare, 1 - ACTIVE_COLOR)
                    && !isSquareAttacked(kingSquare + RIGHT, 1 - ACTIVE_COLOR)) {
                    moveList.push(createMove(MF_KINGSIDE_CASTLING, kingSquare, kingSquare + RIGHT + RIGHT));
                }
            }
        }

        if (QUEENSIDE_CASTLING[ACTIVE_COLOR] & CASTLING_RIGHTS) {
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

function createGlobalState(): number {
    return EN_PASSANT_SQUARE | (CASTLING_RIGHTS << 8) | (FIFTY_MOVES_CLOCK << 12);
}

function restoreGlobalState(state: number) {
    EN_PASSANT_SQUARE = state & 0xFF;
    CASTLING_RIGHTS = (state >> 8) & 0x0F;
    FIFTY_MOVES_CLOCK = (state >> 12) & 0xFF;
}

function makeMove(move: number): void {
    GAME_PLY++;
    MOVE_STACK.push(move);

    EN_PASSANT_SQUARE = SQUARE_NULL;
    FIFTY_MOVES_CLOCK++;

    let moveFlags = getMoveFlags(move);
    let fromSquare = getFromSquare(move);
    let toSquare = getToSquare(move);

    if (moveFlags & PAWN_MOVE_OR_CAPTURE_MASK) {
        FIFTY_MOVES_CLOCK = 0;
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

    if (moveFlags & KINGSIDE_CASTLING_BIT) {
        movePiece(toSquare + RIGHT, toSquare + LEFT);
    } else if (moveFlags & QUEENSIDE_CASTLING_BIT) {
        movePiece(toSquare + LEFT + LEFT, toSquare + RIGHT);
    }

    CASTLING_RIGHTS &= UPDATE_CASTLING_RIGHTS[fromSquare];
    CASTLING_RIGHTS &= UPDATE_CASTLING_RIGHTS[toSquare];

    ACTIVE_COLOR = 1 - ACTIVE_COLOR;
}

function takeback(): void {
    GAME_PLY--;

    ACTIVE_COLOR = 1 - ACTIVE_COLOR;

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

    if (moveFlags & KINGSIDE_CASTLING_BIT) {
        movePiece(toSquare + LEFT, toSquare + RIGHT);
    } else if (moveFlags & QUEENSIDE_CASTLING_BIT) {
        movePiece(toSquare + RIGHT, toSquare + LEFT + LEFT);
    }
}

function isSquareAttacked(square: number, color: number): boolean {
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

function savePrincipalVariation(move: number, depth: number) {
    let index = (SEARCH_DEPTH - depth) * (SEARCH_DEPTH + 1);
    PV_TABLE[index] = move;
    for (let p = 1; p <= depth; p++) {
        PV_TABLE[index + p] = PV_TABLE[index + p + SEARCH_DEPTH];
    }
}

function cleanPrincipalVariation(depth: number) {
    let index = (SEARCH_DEPTH - depth) * (SEARCH_DEPTH + 1);
    for (let p = 0; p < depth; p++) {
        PV_TABLE[index + p] = 0;
    }
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

function sortPVMove(moveList: number[], depth: number) {
    let pvMove = PV_TABLE[SEARCH_DEPTH - depth];
    if (depth <= 1 || pvMove == NULL) {
        FOLLOW_PV = false;
        return;
    }
    let i = 0;
    while (moveList[i] != pvMove) i++;
    while (i > 0) {
        moveList[i] = moveList[i - 1];
        i--;
    }
    moveList[0] = pvMove;
}

function quiesce(alpha: number, beta: number): number {
    let score = evaluate();
    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
    if (STOP_SEARCH) return alpha;

    let state = createGlobalState();
    let moveList = generateMoves(true);
    for (let m = 0; m < moveList.length; m++) {
        makeMove(moveList[m]);
        if (isSquareAttacked(getKingSquare(1 - ACTIVE_COLOR), ACTIVE_COLOR)) {
            takeback();
            restoreGlobalState(state);
            continue;
        }
        score = -quiesce(-beta, -alpha);
        takeback();
        restoreGlobalState(state);

        if (score >= beta) return beta;
        if (score > alpha) alpha = score;
        if (STOP_SEARCH) return alpha;
    }

    return alpha;
}

function alphaBeta(alpha: number, beta: number, depth: number): number {
    if (depth == 0) return quiesce(alpha, beta);

    let legalMoveCount = 0;
    let state = createGlobalState();
    let moveList = generateMoves();
    for (let m = 0; m < moveList.length; m++) {
        if (FOLLOW_PV) sortPVMove(moveList, depth);

        makeMove(moveList[m]);
        if (isSquareAttacked(getKingSquare(1 - ACTIVE_COLOR), ACTIVE_COLOR)) {
            takeback();
            restoreGlobalState(state);
            continue;
        }
        legalMoveCount++;
        let score = -alphaBeta(-beta, -alpha, depth - 1);
        if (FIFTY_MOVES_CLOCK >= 100) score = DRAW_VALUE;
        takeback();
        restoreGlobalState(state);

        if (score >= beta) return beta;
        if (score > alpha) {
            alpha = score;
            savePrincipalVariation(moveList[m], depth);
        }
        if (STOP_SEARCH) return alpha;
    }

    if (legalMoveCount == 0) {
        cleanPrincipalVariation(depth);
        if (isSquareAttacked(getKingSquare(ACTIVE_COLOR), 1 - ACTIVE_COLOR)) {
            return -MATE_VALUE - depth;
        } else {
            return DRAW_VALUE;
        }
    }

    return alpha;
}

function uciWriteInfoString(score: number, elapsedTime: number) {
    let infoString = 'info depth ' + SEARCH_DEPTH;
    if (Math.abs(score) >= MATE_VALUE) {
        let mate = Math.sign(score) * Math.ceil((MATE_VALUE + SEARCH_DEPTH - Math.abs(score)) / 2);
        infoString += ' score mate ' + mate;
    } else {
        infoString += ' score cp ' + score;
    }
    infoString += ' time ' + elapsedTime + ' nodes ' + NODE_COUNT + ' nps ' + Math.round(1000 * NODE_COUNT / elapsedTime) + ' pv';
    for (let i = 0; i < SEARCH_DEPTH; i++) {
        if (PV_TABLE[i] != NULL) infoString += ' ' + toMoveString(PV_TABLE[i]);
    }
    console.log(infoString);
}

function uciWriteBestMove(move: number) {
    console.log('bestmove ' + toMoveString(move));
}

function search() {
    NODE_COUNT = 0;
    SEARCH_DEPTH = 0;
    SEARCH_STARTING_TIME = Date.now();

    let score = 0;
    let elapsedTime = 0;
    let bestMove = 0;
    do {
        SEARCH_DEPTH++;
        score = alphaBeta(-INFINITY, +INFINITY, SEARCH_DEPTH);
        if (STOP_SEARCH) break;
        bestMove = PV_TABLE[0];
        FOLLOW_PV = true;
        elapsedTime = Math.max(1, Date.now() - SEARCH_STARTING_TIME);
        uciWriteInfoString(score, elapsedTime);
    } while ((SEARCH_DEPTH < DEPTH_LIMIT) && (elapsedTime < (TIME_LIMIT / 4)));

    uciWriteBestMove(bestMove);
}

function perft(depth: number): number {
    if (depth == 0) return 1;
    let nodes = 0;
    let state = createGlobalState();
    let moveList = generateMoves();
    for (let m = 0; m < moveList.length; m++) {
        makeMove(moveList[m]);
        if (!isSquareAttacked(getKingSquare(1 - ACTIVE_COLOR), ACTIVE_COLOR)) {
            nodes += perft(depth - 1);
        }
        takeback();
        restoreGlobalState(state);
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
    const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readLine.on('line', (command: string) => {
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
            case 'perft':
                console.time('Time');
                console.log('Nodes: ' + perft(Number.parseInt(commandParts[1], 10)));
                console.timeEnd('Time');
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
                        makeMove(parseMove(move));
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
