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
//  |   1 |   1 | 0001 | WHITE PAWN   |   | 0000 0010 | 0x02 | Q-SIDE CASTLING |
//  |   2 |   2 | 0010 | WHITE KING   |   | 0000 0100 | 0x04 | CAPTURE         |
//  |   3 |   3 | 0011 | WHITE KNIGHT |   | 0000 1000 | 0x08 | PAWN MOVE       |
//  |   4 |   4 | 0100 | WHITE BISHOP |   | 0001 0000 | 0x10 | PAWN SPECIAL    |
//  |   5 |   5 | 0101 | WHITE ROOK   |   | 1110 0000 | 0xE0 | PROMOTED PIECE  |
//  |   6 |   6 | 0110 | WHITE QUEEN  |   +-----------+------+-----------------+
//  |   7 |   7 | 0111 |              |
//  |   8 |   8 | 1000 |              |
//  |   9 |   9 | 1001 | BLACK PAWN   |
//  |  10 |   A | 1010 | BLACK KING   |
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
const KINGSIDE_CASTLING = new Uint8Array([KINGSIDE_CASTLING_BIT, KINGSIDE_CASTLING_BIT << 2]);
const QUEENSIDE_CASTLING = new Uint8Array([QUEENSIDE_CASTLING_BIT, QUEENSIDE_CASTLING_BIT << 2]);

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
let OCCUPIED_SQUARES = new Uint8Array(32);
let OCCUPIED_SQUARES_LENGTH = [1, 17];
let ACTIVE_COLOR = WHITE;
let EN_PASSANT_SQUARE = SQUARE_NULL;
let CASTLING_RIGHTS = NULL;
let PLY_CLOCK = 0;
let MOVE_NUMBER = 1;

////////////////////////////////////////////////////////////////
//  FUNCTIONS                                                 //
////////////////////////////////////////////////////////////////

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
    OCCUPIED_SQUARES[index] = toSquare;
    BOARD[toSquare + 8] = index;
}

function addPiece(piece: number, square: number) {
    BOARD[square] = piece;

    let length = OCCUPIED_SQUARES_LENGTH[getPieceColor(piece)]++;
    OCCUPIED_SQUARES[length] = square;
    BOARD[square + 8] = length;
}

function removePiece(square: number) {
    let piece = BOARD[square];
    BOARD[square] = NULL;

    let index = BOARD[square + 8];
    let lastIndex = --OCCUPIED_SQUARES_LENGTH[getPieceColor(piece)];
    let lastSquare = OCCUPIED_SQUARES[lastIndex];
    OCCUPIED_SQUARES[index] = lastSquare;
    BOARD[lastSquare + 8] = index;
}

function parseSquare(squareCoordinates: string): number {
    return (squareCoordinates.charCodeAt(0) - 'a'.charCodeAt(0))
        - 16 * (squareCoordinates.charCodeAt(1) - '8'.charCodeAt(0));
}

function initBoard(fen: string = STARTING_FEN) {
    let fenParts = fen.split(' ');
    BOARD.fill(NULL);
    OCCUPIED_SQUARES.fill(NULL);
    OCCUPIED_SQUARES_LENGTH = [1, 17];

    let fenBoard = fenParts[0];
    let index = 0;
    for (let c of fenBoard) {
        if (c == '/') {
            index += 8;
        } else if (isNaN(parseInt(c, 10))) {
            let piece = FEN_CHAR_TO_PIECE_CODE.get(c)!;
            if (getPieceType(piece) != KING) {
                addPiece(piece, index);
            } else {
                BOARD[index] = piece;
                BOARD[index + 8] = 16 * getPieceColor(piece);
                OCCUPIED_SQUARES[16 * getPieceColor(piece)] = index;
            }
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

function createMove(moveFlags: number, fromSquare: number, toSquare: number, capturedPiece: number = NULL): number {
    return moveFlags | (fromSquare << 8) | (toSquare << 16) | (capturedPiece << 24);
}

function generateMoves(): number[] {
    let moveList: number[] = [];
    let piece;
    let fromSquare, toSquare;
    let toPiece;
    let forward = UP * (1 - 2 * ACTIVE_COLOR);

    for (let os = 16 * ACTIVE_COLOR; os < OCCUPIED_SQUARES_LENGTH[ACTIVE_COLOR]; os++) {
        fromSquare = OCCUPIED_SQUARES[os];
        piece = BOARD[fromSquare];
        let pieceType = getPieceType(piece);

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

    if (KINGSIDE_CASTLING[ACTIVE_COLOR] & CASTLING_RIGHTS) {
        let kingSquare = OCCUPIED_SQUARES[ACTIVE_COLOR * 16];
        if (BOARD[kingSquare + RIGHT] == NULL
            && BOARD[kingSquare + RIGHT + RIGHT] == NULL) {

            if (!isSquareAttacked(kingSquare, 1 - ACTIVE_COLOR)
                && !isSquareAttacked(kingSquare + RIGHT, 1 - ACTIVE_COLOR)) {
                moveList.push(createMove(MF_KINGSIDE_CASTLING, kingSquare, kingSquare + RIGHT + RIGHT));
            }
        }
    }

    if (QUEENSIDE_CASTLING[ACTIVE_COLOR] & CASTLING_RIGHTS) {
        let kingSquare = OCCUPIED_SQUARES[ACTIVE_COLOR * 16];
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

function makeMove(move: number): void {
    EN_PASSANT_SQUARE = SQUARE_NULL;
    PLY_CLOCK++;
    let moveFlags = move & 0xFF;
    let fromSquare = (move >> 8) & 0xFF;
    let toSquare = (move >> 16) & 0xFF;

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

    if (moveFlags & KINGSIDE_CASTLING_BIT) {
        movePiece(toSquare + RIGHT, toSquare + LEFT);
    } else if (moveFlags & QUEENSIDE_CASTLING_BIT) {
        movePiece(toSquare + LEFT + LEFT, toSquare + RIGHT);
    }

    CASTLING_RIGHTS &= UPDATE_CASTLING_RIGHTS[fromSquare];
    CASTLING_RIGHTS &= UPDATE_CASTLING_RIGHTS[toSquare];

    ACTIVE_COLOR = 1 - ACTIVE_COLOR;
}

function takeback(move: number): void {
    ACTIVE_COLOR = 1 - ACTIVE_COLOR;

    let moveFlags = move & 0xFF;
    let fromSquare = (move >> 8) & 0xFF;
    let toSquare = (move >> 16) & 0xFF;

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
            addPiece((move >> 24) & 0x0F, toSquare);
        }
    }

    if (moveFlags & KINGSIDE_CASTLING_BIT) {
        movePiece(toSquare + LEFT, toSquare + RIGHT);
    } else if (moveFlags & QUEENSIDE_CASTLING_BIT) {
        movePiece(toSquare + RIGHT, toSquare + LEFT + LEFT);
    }
}

function createGlobalState(): number {
    return EN_PASSANT_SQUARE | (CASTLING_RIGHTS << 8) | (PLY_CLOCK << 12);
}

function restoreGlobalState(state: number) {
    EN_PASSANT_SQUARE = state & 0xFF;
    CASTLING_RIGHTS = (state >> 8) & 0x0F;
    PLY_CLOCK = (state >> 12) & 0xFF;
}

function perft(depth: number) {
    if (depth == 0) return 1;
    let nodes = 0, m, move;
    let state = createGlobalState();
    let moveList = generateMoves();
    for (m = 0; m < moveList.length; m++) {
        move = moveList[m];
        makeMove(move);
        if (!isSquareAttacked(OCCUPIED_SQUARES[(1 - ACTIVE_COLOR) * 16], ACTIVE_COLOR)) {
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

////////////////////////////////////////////////////////////////
//  MAIN                                                      //
////////////////////////////////////////////////////////////////

bench();
//testPerft();
