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
//  +---------------------------------+   +----------------------------------------+
//  |          PIECE ENCODING         |   |             MOVE FLAGS                 |
//  +-----+-----+------+--------------+   +-----------+------+---------------------+
//  | DEC | HEX | BIN  | DESCRIPTION  |   | BINARY    | HEX  | DESCRIPTION         |
//  +-----+-----+------+--------------+   +-----------+------+---------------------+
//  |   0 |   0 | 0000 | NONE         |   | 0000 0111 | 0x07 | PROMOTED PIECE      |
//  |   1 |   1 | 0001 | WHITE PAWN   |   | 0000 1000 | 0x08 | CASTLING FLAG       |
//  |   2 |   2 | 0010 | WHITE KING   |   | 0001 0000 | 0x10 | EN PASSANT CAPTURE  |
//  |   3 |   3 | 0011 | WHITE KNIGHT |   | 0010 0000 | 0x20 | PAWN PUSH 2 SQUARES |
//  |   4 |   4 | 0100 | WHITE BISHOP |   | 0100 0000 | 0x40 | CAPTURE MOVE        |
//  |   5 |   5 | 0101 | WHITE ROOK   |   | 1000 0000 | 0x80 | RESET PLY CLOCK     |
//  |   6 |   6 | 0110 | WHITE QUEEN  |   +-----------+------+---------------------+
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

const FILE_G = 0x06;
const KINGSIDE_CASTLING = new Uint8Array([1, 4]);
const QUEENSIDE_CASTLING = new Uint8Array([2, 8]);

const RESET_FIFTY_MOVES_CLOCK_FLAG = 0x80;
const CAPTURE_FLAG = 0x40;
const SPECIAL_MOVE_MASK = 0x3F;
const PAWN_PUSH_2_SQUARES_FLAG = 0x20;
const EN_PASSANT_CAPTURE_FLAG = 0x10;
const CASTLING_MOVE_FLAG = 0x08;
const PROMOTION_MASK = 0x07;

const MF_PAWN_PUSH_1_SQUARE = RESET_FIFTY_MOVES_CLOCK_FLAG;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_QUEEN = RESET_FIFTY_MOVES_CLOCK_FLAG + QUEEN;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_ROOK = RESET_FIFTY_MOVES_CLOCK_FLAG + ROOK;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_BISHOP = RESET_FIFTY_MOVES_CLOCK_FLAG + BISHOP;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_KNIGHT = RESET_FIFTY_MOVES_CLOCK_FLAG + KNIGHT;
const MF_PAWN_PUSH_2_SQUARES = RESET_FIFTY_MOVES_CLOCK_FLAG + PAWN_PUSH_2_SQUARES_FLAG;
const MF_PAWN_CAPTURE = RESET_FIFTY_MOVES_CLOCK_FLAG + CAPTURE_FLAG;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_QUEEN = RESET_FIFTY_MOVES_CLOCK_FLAG + CAPTURE_FLAG + QUEEN;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_ROOK = RESET_FIFTY_MOVES_CLOCK_FLAG + CAPTURE_FLAG + ROOK;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_BISHOP = RESET_FIFTY_MOVES_CLOCK_FLAG + CAPTURE_FLAG + BISHOP;
const MF_PAWN_CAPTURE_AND_PROMOTE_TO_KNIGHT = RESET_FIFTY_MOVES_CLOCK_FLAG + CAPTURE_FLAG + KNIGHT;
const MF_PAWN_CAPTURE_EN_PASSANT = RESET_FIFTY_MOVES_CLOCK_FLAG + EN_PASSANT_CAPTURE_FLAG;
const MF_PIECE_NORMAL_MOVE = 0;
const MF_PIECE_CAPTURE_MOVE = RESET_FIFTY_MOVES_CLOCK_FLAG + CAPTURE_FLAG;
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
const PIECE_VALUE_MG = [0, 20000,  98, 336, 370, 485, 1027];
const PIECE_VALUE_EG = [0, 20000, 137, 265, 293, 513,  945];
const PHASE_VALUE_MIN = 522;
const PHASE_VALUE_MAX = 6240;
const PHASE_RANGE = PHASE_VALUE_MAX - PHASE_VALUE_MIN;

const PIECE_SQUARE_TABLES = new Int16Array([
    // KING
     -49,  39,  32,   1, -40, -18,  18,  29,  -77, -38, -21, -21, -14,  12,   1, -20,
      45,  15,  -4,   9,   8,  12, -22, -13,  -15,  14,  11,  14,  14,  35,  20,   8,
       7,  40,  18,   0,  -4,  22,  38,  -6,    7,  14,  20,  12,  17,  42,  41,  10,
      -1,  -4,   4, -11, -14,  -9,   2, -20,  -11,  19,  21,  24,  23,  30,  23,   0,
     -33,  15, -11, -23, -30, -28, -17, -35,  -21,  -7,  18,  21,  24,  20,   6, -14,
       2,   2,  -6, -30, -28, -14,   1, -11,  -22,  -6,   8,  18,  20,  13,   4, -12,
      17,  23,   8, -48, -27,   0,  25,  24,  -30, -14,   1,  10,  11,   1,  -8, -20,
       1,  52,  28, -38,  24, -12,  40,  30,  -56, -37, -24, -14, -31, -17, -27, -46,
    // PAWN
       0,   0,   0,   0,   0,   0,   0,   0,    0,   0,   0,   0,   0,   0,   0,   0,
      82, 118,  45,  79,  52, 110,  18, -27,  135, 130, 115,  91, 104,  89, 122, 144,
     -22,  -9,  10,  15,  49,  40,   9, -36,   51,  57,  42,  24,  13,  10,  39,  41,
     -30,  -3, -10,   5,   7,  -4,   1, -39,  -11, -19, -30, -38, -45, -39, -26, -26,
     -43, -18, -21,  -4,   1, -10,  -6, -41,  -30, -34, -46, -50, -50, -51, -40, -44,
     -42, -20, -20, -26, -13, -13,  17, -28,  -39, -36, -49, -42, -43, -48, -44, -51,
     -51, -17, -36, -39, -31,   8,  22, -38,  -30, -35, -35, -33, -30, -43, -41, -50,
       0,   0,   0,   0,   0,   0,   0,   0,    0,   0,   0,   0,   0,   0,   0,   0,
    // KNIGHT
    -166, -88, -33, -48,  62, -96, -14,-106,  -42, -22,   3, -12, -15, -11, -47, -83,
     -72, -40,  73,  37,  24,  63,   8, -16,   -9,   8,  -9,  14,   7,  -9,  -8, -36,
     -46,  61,  38,  66,  85, 130,  74,  45,   -8,  -4,  26,  25,  15,   7,  -3, -25,
      -8,  18,  20,  54,  38,  70,  19,  23,   -1,  19,  38,  38,  38,  27,  24,  -2,
     -12,   5,  17,  14,  29,  20,  22,  -7,   -2,  10,  32,  41,  32,  33,  20,  -2,
     -22,  -8,  13,  11,  20,  18,  26, -15,   -7,  13,  15,  31,  26,  13,  -4,  -6,
     -28, -52, -11,  -2,   0,  19, -13, -18,  -26,  -4,   6,  11,  14,  -4,  -7, -28,
    -104, -20, -57, -32, -16, -27, -18, -22,  -13, -35,  -7,   1,  -6,  -2, -34, -48,
    // BISHOP
     -34,  -1, -87, -42, -30, -47,   2, -13,  -10, -17,  -7,  -4,  -3,  -5, -13, -20,
     -31,  11, -23, -18,  25,  54,  13, -52,   -4,   0,  11,  -8,   1,  -9,   0, -10,
     -21,  32,  38,  35,  30,  45,  32,  -7,    6,  -4,   4,   3,   2,  10,   4,   8,
      -9,   0,  14,  45,  32,  32,   2,  -7,    1,  13,  16,  13,  18,  14,   7,   6,
     -11,   8,   8,  21,  29,   7,   5,  -1,   -2,   7,  17,  23,  11,  14,   1,  -5,
      -5,  10,  10,  10,   9,  22,  13,   5,   -8,   1,  12,  14,  17,   7,  -3, -11,
      -1,  10,  11,  -5,   2,  16,  28,  -4,  -10, -14,  -3,   3,   8,  -5, -11, -23,
     -38,  -8, -19, -26, -18, -17, -44, -26,  -19,  -5, -19,  -1,  -5, -12,  -1, -13,
    // ROOK
      24,  34,  24,  43,  55,   1,  23,  35,   12,   9,  17,  14,  11,  11,   7,   4,
      19,  24,  50,  54,  72,  59,  18,  36,   10,  12,  12,  10,  -4,   2,   7,   2,
     -13,  11,  18,  28,   9,  37,  53,   8,    6,   6,   6,   4,   3,  -4,  -6,  -4,
     -32, -19,  -1,  18,  16,  27, -16, -28,    3,   2,  12,   0,   1,   0,  -2,   1,
     -44, -34, -20,  -9,   1, -15,  -2, -31,    2,   4,   7,   3,  -6,  -7,  -9, -12,
     -53, -33, -24, -25,  -5,  -8, -13, -41,   -5,  -1,  -6,  -2,  -8, -13,  -9, -17,
     -52, -24, -28, -17,  -9,   3, -14, -79,   -7,  -7,  -1,   1, -10, -10, -12,  -4,
     -27, -21,  -7,   9,   8,  -1, -45, -34,  -10,   1,   2,  -2,  -6, -14,   3, -21,
    //QUEEN
     -30,  -2,  27,  10,  57,  42,  41,  43,  -18,  13,  13,  18,  18,  10,   1,  11,
     -26, -41,  -7,  -1, -18,  55,  26,  52,  -26,  11,  23,  32,  49,  16,  21,  -9,
     -15, -19,   5,   6,  27,  54,  45,  55,  -29,  -3,   0,  40,  38,  26,  10,   0,
     -29, -29, -18, -18,  -3,  15,  -4,  -1,   -6,  13,  15,  36,  48,  31,  48,  27,
     -11, -28, -11, -12,  -4,  -6,   1,  -5,  -27,  19,  10,  38,  22,  25,  30,  14,
     -16,   0, -13,  -4,  -7,   0,  12,   3,  -25, -36,   6,  -3,   0,   8,   1,  -4,
     -37, -10,   9,   0,   6,  13,  -5,  -1,  -31, -32, -39, -25, -25, -32, -45, -41,
      -3, -20, -11,   8, -17, -27, -33, -52,  -42, -37, -31, -52, -14, -41, -29, -50
]);

////////////////////////////////////////////////////////////////
//  GLOBAL VARIABLES                                          //
////////////////////////////////////////////////////////////////

let BOARD = new Uint8Array(128);
let PIECE_LIST = new Uint8Array(16 * 10);
let PIECE_COUNT = new Uint8Array(16);
let ACTIVE_COLOR = WHITE;
let EN_PASSANT_SQUARE = SQUARE_NULL;
let CASTLING_RIGHTS = NULL;
let FIFTY_MOVES_CLOCK = 0;
let GAME_PLY = 0;
let SEARCH_PLY = 0;

let NODE_COUNT = 0;
let SEARCH_DEPTH = 0;
let REPETITION_TABLE: number[] = [];
let PV_TABLE: number[] = [];
let FOLLOW_PV = false;

let TIME_LIMIT = Number.MAX_SAFE_INTEGER;
let DEPTH_LIMIT = 8;
let NODE_LIMIT = Number.MAX_SAFE_INTEGER;
let STOP_SEARCH = false;
let SEARCH_STARTING_TIME = Date.now();

let POSITION_HASH_KEY = 0;
let HASH_KEYS = new Uint32Array(16 * 128);
let COLOR_HASH_KEY = 0;

////////////////////////////////////////////////////////////////
//  FUNCTIONS                                                 //
////////////////////////////////////////////////////////////////

let random = 2463534242;
function nextRandom() {
    random ^= (random << 13);
    random ^= (random >> 17);
    random ^= (random << 5);
    return random;
}

function initRandomKeys() {
    for (let i = 0; i < HASH_KEYS.length; i++) HASH_KEYS[i] = nextRandom();
    COLOR_HASH_KEY = nextRandom();
}

function makePiece(color: number, pieceType: number) {
    return pieceType | (color << 3);
}

function getPieceColor(piece: number) {
    return piece >> 3;
}

function getPieceType(piece: number) {
    return (piece & PIECE_TYPE_MASK);
}

function movePiece(fromSquare: number, toSquare: number) {
    let piece = BOARD[fromSquare];
    BOARD[fromSquare] = NULL;
    BOARD[toSquare] = piece;

    let index = BOARD[fromSquare + 8];
    PIECE_LIST[index] = toSquare;
    BOARD[toSquare + 8] = index;
}

function addPiece(piece: number, square: number) {
    BOARD[square] = piece;

    let index = 10 * piece + PIECE_COUNT[piece]++;
    PIECE_LIST[index] = square;
    BOARD[square + 8] = index; 
}

function removePiece(square: number) {
    let piece = BOARD[square];
    BOARD[square] = NULL;

    let index = BOARD[square + 8];
    let lastIndex = 10 * piece + --PIECE_COUNT[piece];
    PIECE_LIST[index] = PIECE_LIST[lastIndex];
    BOARD[PIECE_LIST[lastIndex] + 8] = index;
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

function createMove(moveFlags: number, fromSquare: number, toSquare: number, fromPiece: number, toPiece: number): number {
    return moveFlags | (fromSquare << 8) | (toSquare << 16) | (fromPiece << 24) | (toPiece << 28);
}

function getFromSquare(move: number) {
    return (move >> 8) & 0xFF;
}

function getToSquare(move: number) {
    return (move >> 16) & 0xFF;
}

function getFromPiece(move: number) {
    return (move >> 24) & 0x0F;
}

function getToPiece(move: number) {
    return (move >> 28) & 0x0F;
}

function createGlobalState(): number {
    return EN_PASSANT_SQUARE | (CASTLING_RIGHTS << 8) | (FIFTY_MOVES_CLOCK << 12);
}

function restoreGlobalState(state: number) {
    EN_PASSANT_SQUARE = state & 0xFF;
    CASTLING_RIGHTS = (state >> 8) & 0x0F;
    FIFTY_MOVES_CLOCK = (state >> 12) & 0xFF;
    POSITION_HASH_KEY = REPETITION_TABLE[GAME_PLY];
}

function isRepetition() {
    for (let i = 0; i < GAME_PLY; i++) {
        if (REPETITION_TABLE[i] == POSITION_HASH_KEY) return true;
    }
    return false;
}

function initBoard(fen: string = STARTING_FEN) {
    let fenParts = fen.split(' ');
    BOARD.fill(NULL);
    PIECE_COUNT.fill(NULL);
    PIECE_LIST.fill(NULL);
    POSITION_HASH_KEY = 0;
    REPETITION_TABLE = [];

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

    let fenActiveColor = fenParts[1] ?? 'w';
    ACTIVE_COLOR = (fenActiveColor == 'b') ? BLACK : WHITE;

    let fenCastlingRights = fenParts[2] ?? '';
    CASTLING_RIGHTS = NULL;
    if (fenCastlingRights.includes('K')) CASTLING_RIGHTS |= KINGSIDE_CASTLING[WHITE];
    if (fenCastlingRights.includes('Q')) CASTLING_RIGHTS |= QUEENSIDE_CASTLING[WHITE];
    if (fenCastlingRights.includes('k')) CASTLING_RIGHTS |= KINGSIDE_CASTLING[BLACK];
    if (fenCastlingRights.includes('q')) CASTLING_RIGHTS |= QUEENSIDE_CASTLING[BLACK];
    POSITION_HASH_KEY ^= HASH_KEYS[CASTLING_RIGHTS];

    let fenEnPassantSquare = fenParts[3] ?? '-';
    EN_PASSANT_SQUARE = (fenEnPassantSquare != '-') ? parseSquare(fenEnPassantSquare) : SQUARE_NULL;
    POSITION_HASH_KEY ^= HASH_KEYS[EN_PASSANT_SQUARE];

    let fenHalfMoveClock = fenParts[4] ?? '0';
    FIFTY_MOVES_CLOCK = parseInt(fenHalfMoveClock, 10);

    let fenFullMoveCount = fenParts[5] ?? '1';
    GAME_PLY = 2 * (parseInt(fenFullMoveCount, 10) - 1) + ACTIVE_COLOR;
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

function generateMoves(captureOnly: boolean = false): number[] {
    let moveList: number[] = [];
    let fromSquare, fromPiece;
    let toSquare, toPiece;
    let direction = UP * (1 - 2 * ACTIVE_COLOR);

    for (let pieceType = KING; pieceType <= QUEEN; pieceType++) {
        fromPiece = makePiece(ACTIVE_COLOR, pieceType);
        let pieceCount = PIECE_COUNT[fromPiece];
        for (let p = 0; p < pieceCount; p++) {
            fromSquare = PIECE_LIST[10 * fromPiece + p];

            if (pieceType == PAWN) {
                if (!captureOnly) {
                    toSquare = fromSquare + direction;
                    if (BOARD[toSquare] == NULL) {
                        if ((toSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR]) {
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_QUEEN, fromSquare, toSquare, fromPiece, NULL));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_ROOK, fromSquare, toSquare, fromPiece, NULL));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_BISHOP, fromSquare, toSquare, fromPiece, NULL));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_KNIGHT, fromSquare, toSquare, fromPiece, NULL));
                        } else {
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE, fromSquare, toSquare, fromPiece, NULL));

                            if ((fromSquare & RANK_MASK) == PAWN_STARTING_RANK[ACTIVE_COLOR]) {
                                toSquare += direction;
                                if (BOARD[toSquare] == NULL) {
                                    moveList.push(createMove(MF_PAWN_PUSH_2_SQUARES, fromSquare, toSquare, fromPiece, NULL));
                                }
                            }
                        }
                    }
                }

                for (let lr = LEFT; lr <= RIGHT; lr += 2) {
                    toSquare = fromSquare + direction + lr;
                    if (toSquare & OUT_OF_BOARD_MASK) continue;

                    toPiece = BOARD[toSquare];
                    if (toPiece != NULL && getPieceColor(toPiece) != ACTIVE_COLOR) {
                        if ((toSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR]) {
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_QUEEN, fromSquare, toSquare, fromPiece, toPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_ROOK, fromSquare, toSquare, fromPiece, toPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_BISHOP, fromSquare, toSquare, fromPiece, toPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_KNIGHT, fromSquare, toSquare, fromPiece, toPiece));
                        } else {
                            moveList.push(createMove(MF_PAWN_CAPTURE, fromSquare, toSquare, fromPiece, toPiece));
                        }
                    }
                    if (toSquare == EN_PASSANT_SQUARE) {
                        moveList.push(createMove(MF_PAWN_CAPTURE_EN_PASSANT, fromSquare, toSquare, fromPiece, toPiece));
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
                                moveList.push(createMove(MF_PIECE_CAPTURE_MOVE, fromSquare, toSquare, fromPiece, toPiece));
                            }
                            break;
                        }
                        if (!captureOnly) {
                            moveList.push(createMove(MF_PIECE_NORMAL_MOVE, fromSquare, toSquare, fromPiece, toPiece));
                        }
                    } while (slide);
                }
            }
        }
    }

    if (!captureOnly) {
        let king = makePiece(ACTIVE_COLOR, KING);
        let kingSquare = PIECE_LIST[10 * king];

        if (KINGSIDE_CASTLING[ACTIVE_COLOR] & CASTLING_RIGHTS) {
            if (BOARD[kingSquare + RIGHT] == NULL
                && BOARD[kingSquare + RIGHT + RIGHT] == NULL) {

                if (!isSquareAttacked(kingSquare, 1 - ACTIVE_COLOR)
                    && !isSquareAttacked(kingSquare + RIGHT, 1 - ACTIVE_COLOR)) {
                    moveList.push(createMove(MF_KINGSIDE_CASTLING, kingSquare, kingSquare + RIGHT + RIGHT, king, NULL));
                }
            }
        }

        if (QUEENSIDE_CASTLING[ACTIVE_COLOR] & CASTLING_RIGHTS) {
            if (BOARD[kingSquare + LEFT] == NULL
                && BOARD[kingSquare + LEFT + LEFT] == NULL
                && BOARD[kingSquare + LEFT + LEFT + LEFT] == NULL) {

                if (!isSquareAttacked(kingSquare, 1 - ACTIVE_COLOR)
                    && !isSquareAttacked(kingSquare + LEFT, 1 - ACTIVE_COLOR)) {
                    moveList.push(createMove(MF_QUEENSIDE_CASTLING, kingSquare, kingSquare + LEFT + LEFT, king, NULL));
                }
            }
        }
    }
    
    return moveList;
}

function makeMove(move: number): void {
    REPETITION_TABLE[GAME_PLY] = POSITION_HASH_KEY;
    POSITION_HASH_KEY ^= HASH_KEYS[EN_PASSANT_SQUARE];
    POSITION_HASH_KEY ^= HASH_KEYS[CASTLING_RIGHTS];

    GAME_PLY++;
    SEARCH_PLY++;
    EN_PASSANT_SQUARE = SQUARE_NULL;
    FIFTY_MOVES_CLOCK++;

    let fromSquare = getFromSquare(move);
    let toSquare = getToSquare(move);
    let fromPiece = BOARD[fromSquare];
    let toPiece = BOARD[toSquare];

    if (move & RESET_FIFTY_MOVES_CLOCK_FLAG) FIFTY_MOVES_CLOCK = 0;

    if (move & SPECIAL_MOVE_MASK) {
        if (move & PAWN_PUSH_2_SQUARES_FLAG) {
            EN_PASSANT_SQUARE = (fromSquare + toSquare) / 2;
        } else if (move & PROMOTION_MASK) {
            removePiece(fromSquare);
            POSITION_HASH_KEY ^= HASH_KEYS[fromPiece * 128 + fromSquare];
            let promotedPiece = makePiece(ACTIVE_COLOR, (move & PROMOTION_MASK));
            addPiece(promotedPiece, fromSquare);
            POSITION_HASH_KEY ^= HASH_KEYS[promotedPiece * 128 + fromSquare];
        } else if (move & CASTLING_MOVE_FLAG) {
            if ((toSquare & FILE_MASK) == FILE_G) {
                movePiece(toSquare + RIGHT, toSquare + LEFT);
                let rook = BOARD[toSquare + LEFT];
                POSITION_HASH_KEY ^= HASH_KEYS[rook * 128 + toSquare + RIGHT];
                POSITION_HASH_KEY ^= HASH_KEYS[rook * 128 + toSquare + LEFT];
            } else {
                movePiece(toSquare + LEFT + LEFT, toSquare + RIGHT);
                let rook = BOARD[toSquare + RIGHT];
                POSITION_HASH_KEY ^= HASH_KEYS[rook * 128 + toSquare + LEFT + LEFT];
                POSITION_HASH_KEY ^= HASH_KEYS[rook * 128 + toSquare + RIGHT];
            }
        } else {
            removePiece((fromSquare & RANK_MASK) + (toSquare & FILE_MASK));
            POSITION_HASH_KEY ^= HASH_KEYS[fromPiece * 128 + fromSquare];
        }
    }

    if (move & CAPTURE_FLAG) {
        removePiece(toSquare);
        POSITION_HASH_KEY ^= HASH_KEYS[toPiece * 128 + toSquare];
    }
    movePiece(fromSquare, toSquare);
    POSITION_HASH_KEY ^= HASH_KEYS[fromPiece * 128 + fromSquare];
    POSITION_HASH_KEY ^= HASH_KEYS[fromPiece * 128 + toSquare];

    CASTLING_RIGHTS &= UPDATE_CASTLING_RIGHTS[fromSquare];
    CASTLING_RIGHTS &= UPDATE_CASTLING_RIGHTS[toSquare];
    POSITION_HASH_KEY ^= HASH_KEYS[CASTLING_RIGHTS];
    POSITION_HASH_KEY ^= HASH_KEYS[EN_PASSANT_SQUARE];
        
    ACTIVE_COLOR = 1 - ACTIVE_COLOR;
    POSITION_HASH_KEY ^= COLOR_HASH_KEY;
}

function takeback(move: number): void {
    GAME_PLY--;
    SEARCH_PLY--;

    ACTIVE_COLOR = 1 - ACTIVE_COLOR;

    let fromSquare = getFromSquare(move);
    let toSquare = getToSquare(move);

    movePiece(toSquare, fromSquare);
    if (move & CAPTURE_FLAG) addPiece(getToPiece(move), toSquare);

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
        PV_TABLE[index + p] = NULL;
    }
}

function checkStopConditions() {
    if ((Date.now() - SEARCH_STARTING_TIME > TIME_LIMIT) || (NODE_COUNT + 2048 > NODE_LIMIT)) {
        STOP_SEARCH = true;
    }
}

function evaluateColor(color: number): number[] {
    let phase = 0, scoreMG = 0, scoreEG = 0;
    for (let pieceType = PAWN; pieceType <= QUEEN; pieceType++) {
        let piece = makePiece(color, pieceType);
        let pieceCount = PIECE_COUNT[piece];
        if (pieceType >= KNIGHT) phase += pieceCount * PIECE_VALUE_MG[pieceType];
        scoreMG += pieceCount * PIECE_VALUE_MG[pieceType];
        scoreEG += pieceCount * PIECE_VALUE_EG[pieceType];
        for (let p = 0; p < pieceCount; p++) {
            let square = PIECE_LIST[10 * piece + p];
            let pstIndex = (pieceType - 1) * 128 + square ^ (color * 0x70);
            scoreMG += PIECE_SQUARE_TABLES[pstIndex];
            scoreEG += PIECE_SQUARE_TABLES[pstIndex + 8];
        }
    }
    return [phase, scoreMG, scoreEG];
}

function evaluate(): number {
    NODE_COUNT++;
    if ((NODE_COUNT & 2047) == 0) checkStopConditions();

    let [phaseA, scoreMGA, scoreEGA] = evaluateColor(ACTIVE_COLOR);
    let [phaseB, scoreMGB, scoreEGB] = evaluateColor(1 - ACTIVE_COLOR);
    let phase = Math.max(PHASE_VALUE_MIN, Math.min(PHASE_VALUE_MAX, phaseA + phaseB));
    let scoreMG = scoreMGA - scoreMGB;
    let scoreEG = scoreEGA - scoreEGB;
    return ((scoreMG * (phase - PHASE_VALUE_MIN) + scoreEG * (PHASE_VALUE_MAX - phase)) / PHASE_RANGE) | 0;
}

function sortMoveList(moveList: number[]) {
    let move, capturedPiece, j = 0;
    for (let i = 1; i < moveList.length; i++) {
        move = moveList[i];
        capturedPiece = getToPiece(move);
        j = i - 1;
        while (j >= 0 && getToPiece(moveList[j]) < capturedPiece) {
            moveList[j + 1] = moveList[j];
            j = j - 1;
        }
        moveList[j + 1] = move;
    }
    return moveList;
}

function sortPVMove(moveList: number[], depth: number) {
    let pvMove = PV_TABLE[SEARCH_DEPTH - depth];
    if (depth <= 1 || pvMove == NULL) {
        FOLLOW_PV = false;
        return;
    }
    let i = 0;
    while (moveList[i] != pvMove) i++;
    while (i--) moveList[i + 1] = moveList[i];
    moveList[0] = pvMove;
}

function quiesce(alpha: number, beta: number): number {
    let score = evaluate();
    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
    if (STOP_SEARCH) return alpha;

    let state = createGlobalState();
    let moveList = sortMoveList(generateMoves(true));
    for (let m = 0; m < moveList.length; m++) {
        makeMove(moveList[m]);
        if (isSquareAttacked(PIECE_LIST[10 * makePiece(1 - ACTIVE_COLOR, KING)], ACTIVE_COLOR)) {
            takeback(moveList[m]);
            restoreGlobalState(state);
            continue;
        }
        score = -quiesce(-beta, -alpha);
        takeback(moveList[m]);
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
    let moveList = sortMoveList(generateMoves());
    for (let m = 0; m < moveList.length; m++) {
        if (FOLLOW_PV) sortPVMove(moveList, depth);

        makeMove(moveList[m]);
        if (isSquareAttacked(PIECE_LIST[10 * makePiece(1 - ACTIVE_COLOR, KING)], ACTIVE_COLOR)) {
            takeback(moveList[m]);
            restoreGlobalState(state);
            continue;
        }
        legalMoveCount++;
        let score = -alphaBeta(-beta, -alpha, depth - 1);
        if (isRepetition() || FIFTY_MOVES_CLOCK >= 100) score = DRAW_VALUE;
        takeback(moveList[m]);
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
        if (isSquareAttacked(PIECE_LIST[10 * makePiece(ACTIVE_COLOR, KING)], 1 - ACTIVE_COLOR)) {
            return -MATE_VALUE - depth;
        } else {
            return DRAW_VALUE;
        }
    }

    return alpha;
}

function toMoveString(move: number) {
    let moveString = toSquareCoordinates(getFromSquare(move)) + toSquareCoordinates(getToSquare(move));
    if (move & PROMOTION_MASK) {
        moveString += PIECE_TYPE_TO_CHAR.get((move & PROMOTION_MASK) >> 5);
    }
    return moveString;
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

    let score = 0, elapsedTime = 0, bestMove = 0;
    do {
        SEARCH_DEPTH++;
        score = alphaBeta(-INFINITY, +INFINITY, SEARCH_DEPTH);
        if (STOP_SEARCH) break;
        bestMove = PV_TABLE[0];
        FOLLOW_PV = true;
        elapsedTime = Math.max(1, Date.now() - SEARCH_STARTING_TIME);
        uciWriteInfoString(score, elapsedTime);
    } while ((SEARCH_DEPTH < DEPTH_LIMIT) && (elapsedTime < (TIME_LIMIT / 2)));

    uciWriteBestMove(bestMove);
}

////////////////////////////////////////////////////////////////
//  UTILITY FUNCTION                                          //
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

function perft(depth: number): number {
    if (depth == 0) return 1;
    let nodes = 0;
    let state = createGlobalState();
    let moveList = generateMoves();
    for (let m = 0; m < moveList.length; m++) {
        makeMove(moveList[m]);
        if (!isSquareAttacked(PIECE_LIST[10 * makePiece(1 - ACTIVE_COLOR, KING)], ACTIVE_COLOR)) {
            nodes += perft(depth - 1);
        }
        takeback(moveList[m]);
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
    let fromPiece = BOARD[fromSquare];
    let toPiece = BOARD[toSquare];
    let moveFlags = 0;
    if (toPiece != NULL) moveFlags |= (CAPTURE_FLAG | RESET_FIFTY_MOVES_CLOCK_FLAG);

    switch (getPieceType(fromPiece)) {
        case PAWN:
            moveFlags |= RESET_FIFTY_MOVES_CLOCK_FLAG;
            let moveDistance = Math.abs(fromSquare - toSquare);
            if (moveDistance == 32) moveFlags |= PAWN_PUSH_2_SQUARES_FLAG;
            if ((moveDistance == 15 || moveDistance == 17) && toPiece == NULL) {
                moveFlags |= EN_PASSANT_CAPTURE_FLAG;
            }
            if (move.length > 4) {
                let promotedPiece = FEN_CHAR_TO_PIECE_CODE.get(move.charAt(4))!;
                moveFlags |= getPieceType(promotedPiece);
            }
            return createMove(moveFlags, fromSquare, toSquare, fromPiece, toPiece);
        case KING:
            if (Math.abs(fromSquare - toSquare) == 2) moveFlags |= CASTLING_MOVE_FLAG;
            return createMove(moveFlags, fromSquare, toSquare, fromPiece, toPiece);
        default:
            return createMove(moveFlags, fromSquare, toSquare, fromPiece, toPiece);
    }
}

function parseGoCommand(commandParts: string[]) {
    TIME_LIMIT = Number.MAX_SAFE_INTEGER;
    DEPTH_LIMIT = Number.MAX_SAFE_INTEGER;
    NODE_LIMIT = Number.MAX_SAFE_INTEGER;
    STOP_SEARCH = false;

    switch (commandParts[1]) {
        case 'depth':
            DEPTH_LIMIT = parseInt(commandParts[2], 10);
            break;
        case 'nodes':
            NODE_LIMIT = parseInt(commandParts[2], 10);
            break;
        case 'movetime':
            TIME_LIMIT = parseInt(commandParts[2], 10) - 10;
            break;
        case 'infinite':
            break;
        default:
            let availableTime = (ACTIVE_COLOR == WHITE) ? commandParts.indexOf('wtime') : commandParts.indexOf('btime');
            if (availableTime > 0) availableTime = parseInt(commandParts[availableTime + 1], 10);
            let movesToGo = commandParts.indexOf('movestogo');
            movesToGo = (movesToGo > 0) ? Math.min(40, parseInt(commandParts[movesToGo + 1], 10)) : 40;
            TIME_LIMIT = 1.4 * availableTime / (movesToGo + 0.4) - 10;
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

initRandomKeys();
uci();

export { initBoard, printBoard, perft, search };
