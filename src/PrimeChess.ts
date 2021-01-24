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
const FILE_MASK = 0x0F;
const RANK_MASK = 0xF0;

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
]

const PIECE_VALUE = [0, 20000, 100, 300, 300, 500, 900];
const INFINITY = 100000;
const MATE_VALUE = 50000;

////////////////////////////////////////////////////////////////
//  CUSTOM TYPES                                              //
////////////////////////////////////////////////////////////////

type Move = {
    moveFlags: number;
    fromSquare: number;
    toSquare: number;
    movingPiece: number;
    capturedPiece?: number;
};

type HistoryEntry = {
    enPassantSquare: number;
    whiteCastlingRights: number;
    blackCastlingRights: number;
    plyClock: number;
}

////////////////////////////////////////////////////////////////
//  GLOBAL VARIABLES                                          //
////////////////////////////////////////////////////////////////

let BOARD = new Uint8Array(128);
let PIECE_LIST = new Uint8Array(160);
let ACTIVE_COLOR = WHITE;
let MOVE_STACK: number[] = [];
let HISTORY_STACK: number[] = [];
let EN_PASSANT_SQUARE = SQUARE_NULL;
let CASTLING_RIGHTS = [NULL, NULL];
let PLY_CLOCK = 0;
let MOVE_NUMBER = 1;

let NODE_COUNT = 0;
let SEARCH_DEPTH = 0;
let BEST_MOVE = 0;

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

function getPieceCount(color: number, pieceType: number) {
    return PIECE_LIST[color * 80 + pieceType];
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

    let pieceCount = PIECE_LIST[getPieceColor(piece) * 80 + getPieceType(piece)]++;
    PIECE_LIST[piece * 10 + pieceCount] = square;
}

function removePiece(square: number) {
    let piece = BOARD[square];
    BOARD[square] = NULL;

    let pieceCount = PIECE_LIST[getPieceColor(piece) * 80 + getPieceType(piece)]--;
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

function clearBoard() {
    for (let i = 0; i < BOARD.length; i++) {
        BOARD[i] = NULL;
    }
    for (let i = 0; i < PIECE_LIST.length; i++) {
        PIECE_LIST[i] = NULL;
    }
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
    let targetPiece;
    let direction = UP * (1 - 2 * ACTIVE_COLOR);

    for (let pieceType = KING; pieceType <= QUEEN; pieceType++) {
        piece = makePiece(ACTIVE_COLOR, pieceType);
        let pieceCount = PIECE_LIST[ACTIVE_COLOR * 80 + pieceType];
        for (let p = 0; p < pieceCount; p++) {
            fromSquare = PIECE_LIST[10 * piece + p];

            if (pieceType == PAWN) {
                if (!captureOnly) {
                    toSquare = fromSquare + direction;
                    if (BOARD[toSquare] == NULL) {
                        if ((toSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR]) {
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_QUEEN, fromSquare, toSquare, piece));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_ROOK, fromSquare, toSquare, piece));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_BISHOP, fromSquare, toSquare, piece));
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE_TO_KNIGHT, fromSquare, toSquare, piece));
                        } else {
                            moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE, fromSquare, toSquare, piece));

                            if ((fromSquare & RANK_MASK) == PAWN_STARTING_RANK[ACTIVE_COLOR]) {
                                toSquare += direction;
                                if (BOARD[toSquare] == NULL) {
                                    moveList.push(createMove(MF_PAWN_PUSH_2_SQUARES, fromSquare, toSquare, piece));
                                }
                            }
                        }
                    }
                }

                for (let lr = LEFT; lr <= RIGHT; lr += 2) {
                    toSquare = fromSquare + direction + lr;
                    if (toSquare & OUT_OF_BOARD_MASK) continue;

                    targetPiece = BOARD[toSquare];
                    if (targetPiece != NULL && getPieceColor(targetPiece) != ACTIVE_COLOR) {
                        if ((toSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR]) {
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_QUEEN, fromSquare, toSquare, piece, targetPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_ROOK, fromSquare, toSquare, piece, targetPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_BISHOP, fromSquare, toSquare, piece, targetPiece));
                            moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE_TO_KNIGHT, fromSquare, toSquare, piece, targetPiece));
                        } else {
                            moveList.push(createMove(MF_PAWN_CAPTURE, fromSquare, toSquare, piece, targetPiece));
                        }
                    }
                    if (toSquare == EN_PASSANT_SQUARE) {
                        moveList.push(createMove(MF_PAWN_CAPTURE_EN_PASSANT, fromSquare, toSquare, piece));
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

                        targetPiece = BOARD[toSquare];
                        if (targetPiece != NULL) {
                            if (getPieceColor(targetPiece) != ACTIVE_COLOR) {
                                moveList.push(createMove(MF_PIECE_CAPTURE_MOVE, fromSquare, toSquare, piece, targetPiece));
                            }
                            break;
                        }
                        if (!captureOnly) {
                            moveList.push(createMove(MF_PIECE_NORMAL_MOVE, fromSquare, toSquare, piece));
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
                    moveList.push(createMove(MF_KINGSIDE_CASTLING, kingSquare, kingSquare + RIGHT + RIGHT, BOARD[kingSquare]));
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
                    moveList.push(createMove(MF_QUEENSIDE_CASTLING, kingSquare, kingSquare + LEFT + LEFT, BOARD[kingSquare]));
                }
            }
        }
    }

    return moveList;
}

function createMove(moveFlags: number, fromSquare: number, toSquare: number, movingPiece: number, capturedPiece: number = NULL): number {
    return moveFlags | (fromSquare << 8) | (toSquare << 16) | (movingPiece << 24) | (capturedPiece << 28);
}

function decodeMove(move: number): Move {
    return {
        moveFlags: move & 0xFF,
        fromSquare: (move >> 8) & 0xFF,
        toSquare: (move >> 16) & 0xFF,
        movingPiece: (move >> 24) & 0x0F,
        capturedPiece: (move >> 28) & 0x0F
    };
}

function createHistory(enPassantSquare: number, castlingRights: number[], plyClock: number): number {
    return enPassantSquare | (castlingRights[WHITE] << 8) | (castlingRights[BLACK] << 10) | (plyClock << 12);
}

function decodeHistory(history: number): HistoryEntry {
    return {
        enPassantSquare: history & 0xFF,
        whiteCastlingRights: (history >> 8) & 0x03,
        blackCastlingRights: (history >> 10) & 0x03,
        plyClock: (history >> 12) & 0xFF
    };
}

function makeMove(encodedMove: number): void {
    MOVE_STACK.push(encodedMove);
    HISTORY_STACK.push(createHistory(EN_PASSANT_SQUARE, CASTLING_RIGHTS, PLY_CLOCK));
    EN_PASSANT_SQUARE = SQUARE_NULL;
    PLY_CLOCK++;
    MOVE_NUMBER += ACTIVE_COLOR;

    let move = decodeMove(encodedMove);
    let moveFlags = move.moveFlags;
    let fromSquare = move.fromSquare;
    let toSquare = move.toSquare;

    let piece = BOARD[fromSquare];

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

    if ((piece & PIECE_TYPE_MASK) == KING) {
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

    let history = decodeHistory(HISTORY_STACK.pop()!);
    EN_PASSANT_SQUARE = history.enPassantSquare;
    CASTLING_RIGHTS[WHITE] = history.whiteCastlingRights;
    CASTLING_RIGHTS[BLACK] = history.blackCastlingRights;
    PLY_CLOCK = history.plyClock;
    MOVE_NUMBER -= ACTIVE_COLOR;

    let move = decodeMove(MOVE_STACK.pop()!);
    let moveFlags = move.moveFlags;
    let fromSquare = move.fromSquare;
    let toSquare = move.toSquare;

    let piece = BOARD[toSquare];

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
            addPiece(move.capturedPiece!, toSquare);
        }
    }

    if ((piece & PIECE_TYPE_MASK) == KING) {
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

function evaluate(): number {
    NODE_COUNT++;
    let score = 0;
    for (let pieceType = KING; pieceType <= QUEEN; pieceType++) {
        score += (getPieceCount(ACTIVE_COLOR, pieceType) - getPieceCount(1 - ACTIVE_COLOR, pieceType)) * PIECE_VALUE[pieceType];
    }
    return score;
}

function quiesce(alpha: number, beta: number): number {
    let score = evaluate();
    if (score >= beta) return beta;
    if (score > alpha) alpha = score;

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
                BEST_MOVE = moveList[m];
            }
        }
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
    let score = 0;
    let startTime = Date.now();
    for (SEARCH_DEPTH = 1; SEARCH_DEPTH <= 3; SEARCH_DEPTH++) {
        score = alphaBeta(-INFINITY, +INFINITY, SEARCH_DEPTH);
        let time = Math.max(1, Date.now() - startTime);
        let infoString = 'info depth ' + SEARCH_DEPTH;
        if (Math.abs(score) >= MATE_VALUE) {
            let mate = Math.sign(score) * Math.ceil((SEARCH_DEPTH - Math.abs(score) + MATE_VALUE) / 2);
            infoString += ' score mate ' + mate;
        } else {
            infoString += ' score cp ' + score;
        }
        infoString += ' time ' + time + ' nodes ' + NODE_COUNT + ' nps ' + Math.round(1000 * NODE_COUNT / time) + ' pv ' + toMoveString(BEST_MOVE);
        console.log(infoString);
    }
    console.log('bestmove ' + toMoveString(BEST_MOVE));
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
            return createMove(moveFlags, fromSquare, toSquare, piece, targetPiece);
        case KING:
            if ((fromSquare - toSquare) == 2) moveFlags |= QUEENSIDE_CASTLING_BIT;
            if ((fromSquare - toSquare) == -2) moveFlags |= KINGSIDE_CASTLING_BIT;
            return createMove(moveFlags, fromSquare, toSquare, piece, targetPiece);
        default:
            return createMove(moveFlags, fromSquare, toSquare, piece, targetPiece);
    }
}

function toMoveString(encodedMove: number) {
    let move = decodeMove(encodedMove);

    let moveString = toSquareCoordinates(move.fromSquare) + toSquareCoordinates(move.toSquare);
    if (move.moveFlags & PROMOTION_MASK) {
        let promotedPiece = makePiece(getPieceColor(move.movingPiece), (move.moveFlags & PROMOTION_MASK) >> 5);
        moveString += PIECE_CODE_TO_PRINTABLE_CHAR.get(promotedPiece);
    }

    return moveString;
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
                // TODO
                search();
                break;
            case 'stop':
                // TODO
                break;
            case 'quit':
                process.exit();
        }
    });
}

////////////////////////////////////////////////////////////////
//  DISPLAYING AND DEBUGGING FUNCTIONS                        //
////////////////////////////////////////////////////////////////

function toSquareCoordinates(square: number) {
    let file = String.fromCharCode('a'.charCodeAt(0) + (square & FILE_MASK));
    let rank = 8 - ((square & RANK_MASK) >> 4);
    return file + rank;
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
//  MAIN                                                      //
////////////////////////////////////////////////////////////////

uci();

//bench();
//testPerft();
/*
for (let run = 1; run <= 3; run++) {
    initBoard(STARTING_FEN);
    console.time('Run ' + run);
    perft(6);
    console.timeEnd('Run ' + run);
}
*/
/*
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
*/
/*
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
*/