//
//    +---------------------------------------------------------------+
//    |                   0x88 BOARD REPRESENTATION                   |
//    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
//  8 |  0|  1|  2|  3|  4|  5|  6|  7|  8|  9| 10| 11| 12| 13| 14| 15|
//  7 | 16| 17| 18| 19| 20| 21| 22| 23| 24| 25| 26| 27| 28| 29| 30| 31|
//  6 | 32| 33| 34| 35| 36| 37| 38| 39| 40| 41| 42| 43| 44| 45| 46| 47|
//  5 | 48| 49| 50| 51| 52| 53| 54| 55| 56| 57| 58| 59| 60| 61| 62| 63|
//  4 | 64| 65| 66| 67| 68| 69| 70| 71| 72| 73| 74| 75| 76| 77| 78| 79|
//  3 | 80| 81| 82| 83| 84| 85| 86| 87| 88| 89| 90| 91| 92| 93| 94| 95|
//  2 | 96| 97| 98| 99|100|101|102|103|104|105|106|107|108|109|110|111|
//  1 |112|113|114|115|116|117|118|119|120|121|122|123|124|125|126|127|
//    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
//      A   B   C   D   E   F   G   H
//
//  +---------------------------------+   +------------------------------------+
//  |          PIECE ENCODING         |   |             MOVE FLAGS             |
//  +-----+-----+------+--------------+   +-----------+------+-----------------+
//  | DEC | HEX | BIN  | DESCRIPTION  |   | BINARY    | HEX  | DESCRIPTION     |
//  +-----+-----+------+--------------+   +-----------+------+-----------------+
//  |   0 |   0 | 0000 | NONE         |   | 0000 0001 | 0x01 | CAPTURE         |
//  |   1 |   1 | 0001 | WHITE KING   |   | 0000 0010 | 0x02 | PAWN MOVE       |
//  |   2 |   2 | 0010 | WHITE PAWN   |   | 0000 0100 | 0x04 | PROMOTION       |
//  |   3 |   3 | 0011 | WHITE KNIGHT |   | 0000 1000 | 0x08 | EN PASSANT      |
//  |   4 |   4 | 0100 | WHITE BISHOP |   | 0001 0000 | 0x10 | PAWN 2 SQUARES  |
//  |   5 |   5 | 0101 | WHITE ROOK   |   | 0010 0000 | 0x20 |                 |
//  |   6 |   6 | 0110 | WHITE QUEEN  |   | 0100 0000 | 0x40 |                 |
//  |   7 |   7 | 0111 |              |   | 1000 0000 | 0x80 |                 |
//  |   8 |   8 | 1000 |              |   +-----------+------+-----------------+
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

const NONE = 0;
const KING = 1;
const PAWN = 2;
const KNIGHT = 3;
const BISHOP = 4;
const ROOK = 5;
const QUEEN = 6;

const WHITE = 0;
const BLACK = 8;

const WHITE_KING = WHITE + KING;
const WHITE_PAWN = WHITE + PAWN;
const WHITE_KNIGHT = WHITE + KNIGHT;
const WHITE_BISHOP = WHITE + BISHOP;
const WHITE_ROOK = WHITE + ROOK;
const WHITE_QUEEN = WHITE + QUEEN;

const BLACK_KING = BLACK + KING;
const BLACK_PAWN = BLACK + PAWN;
const BLACK_KNIGHT = BLACK + KNIGHT;
const BLACK_BISHOP = BLACK + BISHOP;
const BLACK_ROOK = BLACK + ROOK;
const BLACK_QUEEN = BLACK + QUEEN;

const UP = -16;
const RIGHT = +1;
const DOWN = +16;
const LEFT = -1;

const OUT_OF_BOARD_MASK = 0x88;
const SQUARE_NULL = 0x88;
const RANK_MASK = 0x70;
const FILE_MASK = 0x07;

const RANK_1 = 0x70;
const RANK_2 = 0x60;
const RANK_7 = 0x10;
const RANK_8 = 0x00;
const PAWN_STARTING_RANK = [RANK_2, RANK_7];
const PAWN_PROMOTING_RANK = [RANK_8, RANK_1];

const PIECE_COLOR_MASK = 0x08;
const PIECE_TYPE_MASK = 0x07;
const PIECE_SLIDER_MASK = 0x04;

const CAPTURE_BIT = 0x01;
const PAWN_MOVE_BIT = 0x02;
const PROMOTION_BIT = 0x04;
const EN_PASSANT_BIT = 0x08;
const PAWN_PUSH_2_SQUARES_BIT = 0x10;

const WHITE_KINGSIDE_CASTLING_BIT = 0x01;
const WHITE_QUEENSIDE_CASTLING_BIT = 0x02;
const BLACK_KINGSIDE_CASTLING_BIT = 0x04;
const BLACK_QUEENSIDE_CASTLING_BIT = 0x08;

const MF_PAWN_PUSH_1_SQUARE = PAWN_MOVE_BIT;
const MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE = PAWN_MOVE_BIT + PROMOTION_BIT;
const MF_PAWN_PUSH_2_SQUARES = PAWN_MOVE_BIT + PAWN_PUSH_2_SQUARES_BIT;
const MF_PAWN_CAPTURE = PAWN_MOVE_BIT + CAPTURE_BIT;
const MF_PAWN_CAPTURE_AND_PROMOTE = PAWN_MOVE_BIT + CAPTURE_BIT + PROMOTION_BIT;
const MF_PAWN_CAPTURE_EN_PASSANT = PAWN_MOVE_BIT + CAPTURE_BIT + EN_PASSANT_BIT;
const MF_PIECE_NORMAL_MOVE = 0;
const MF_PIECE_CAPTURE_MOVE = CAPTURE_BIT;

const FEN_CHAR_TO_PIECE_CODE = new Map([
    ['P', WHITE_PAWN], ['N', WHITE_KNIGHT], ['B', WHITE_BISHOP], ['R', WHITE_ROOK], ['Q', WHITE_QUEEN], ['K', WHITE_KING],
    ['p', BLACK_PAWN], ['n', BLACK_KNIGHT], ['b', BLACK_BISHOP], ['r', BLACK_ROOK], ['q', BLACK_QUEEN], ['k', BLACK_KING]
]);

const PIECE_CODE_TO_PRINTABLE_CHAR = new Map([
    [WHITE_PAWN, '\u2659'], [WHITE_KNIGHT, '\u2658'], [WHITE_BISHOP, '\u2657'], [WHITE_ROOK, '\u2656'], [WHITE_QUEEN, '\u2655'], [WHITE_KING, '\u2654'],
    [BLACK_PAWN, '\u265F'], [BLACK_KNIGHT, '\u265E'], [BLACK_BISHOP, '\u265D'], [BLACK_ROOK, '\u265C'], [BLACK_QUEEN, '\u265B'], [BLACK_KING, '\u265A'],
    [NONE, '.']
]);

const MOVE_DIRECTIONS = new Map([
    [KNIGHT, [UP + UP + LEFT, UP + UP + RIGHT, DOWN + DOWN + LEFT, DOWN + DOWN + RIGHT, LEFT + LEFT + UP, LEFT + LEFT + DOWN, RIGHT + RIGHT + UP, RIGHT + RIGHT + DOWN]],
    [BISHOP, [UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT]],
    [ROOK, [UP, RIGHT, DOWN, LEFT]],
    [QUEEN, [UP, RIGHT, DOWN, LEFT, UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT]],
    [KING, [UP, RIGHT, DOWN, LEFT, UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT]]
]);

////////////////////////////////////////////////////////////////
//  GLOBAL VARIABLES                                          //
////////////////////////////////////////////////////////////////

let BOARD = new Uint8Array(128);
let ACTIVE_COLOR = WHITE;
let MOVE_STACK: number[] = [];
let HISTORY_STACK: number[] = []; // Used in takeback() to restore the previous board state
let EN_PASSANT_SQUARE = SQUARE_NULL;
let CASTLING_RIGHTS = 0;
let KING_SQUARE = [0, 0];
let FIFTY_PLY = 0;

////////////////////////////////////////////////////////////////
//  FUNCTIONS                                                 //
////////////////////////////////////////////////////////////////

function toSquareCoordinates(square: number) {
    let file = String.fromCharCode('a'.charCodeAt(0) + square % 16);
    let rank = 8 - Math.floor(square / 16);
    return file + rank;
}

function toSquare(squareCoordinates: string): number {
    return (squareCoordinates.charCodeAt(0) - 'a'.charCodeAt(0))
        - 16 * (squareCoordinates.charCodeAt(1) - '8'.charCodeAt(0));
}

function clearBoard() {
    for (let square = 0; square < BOARD.length; square++) {
        BOARD[square] = NONE;
    }
    ACTIVE_COLOR = WHITE;
    MOVE_STACK = [];
    HISTORY_STACK = [];
    EN_PASSANT_SQUARE = SQUARE_NULL;
    CASTLING_RIGHTS = 0;
    KING_SQUARE = [0, 0];
    FIFTY_PLY = 0;
}

function initBoardFromFen(fen: string) {
    let fenParts = fen.split(' ');

    let fenBoard = fenParts[0];
    let fenActiveColor = fenParts[1];
    let fenCastlingRights = fenParts[2];
    let fenEnPassantSquare = fenParts[3];
    let fenFiftyMoveClock = fenParts[4];
    let fenFullMoveCount = fenParts[5];

    clearBoard();
    let index = 0;
    for (let c of fenBoard) {
        if (c == '/') {
            index += 8;
        } else if (isNaN(parseInt(c))) {
            let piece = FEN_CHAR_TO_PIECE_CODE.get(c)!;
            if ((piece & PIECE_TYPE_MASK) == KING) {
                KING_SQUARE[(piece & PIECE_COLOR_MASK) / BLACK] = index;
            }
            BOARD[index] = piece;
            index += 1;
        } else {
            index += parseInt(c);
        }
    }

    if (fenActiveColor == 'b') ACTIVE_COLOR = BLACK;

    if (fenCastlingRights.includes('K')) CASTLING_RIGHTS = CASTLING_RIGHTS | WHITE_KINGSIDE_CASTLING_BIT;
    if (fenCastlingRights.includes('Q')) CASTLING_RIGHTS = CASTLING_RIGHTS | WHITE_QUEENSIDE_CASTLING_BIT;
    if (fenCastlingRights.includes('k')) CASTLING_RIGHTS = CASTLING_RIGHTS | BLACK_KINGSIDE_CASTLING_BIT;
    if (fenCastlingRights.includes('q')) CASTLING_RIGHTS = CASTLING_RIGHTS | BLACK_QUEENSIDE_CASTLING_BIT;

    if (fenEnPassantSquare != '-') {
        EN_PASSANT_SQUARE = toSquare(fenEnPassantSquare);
    }

    FIFTY_PLY = parseInt(fenFiftyMoveClock, 10);
}

function generateMoves(): number[] {
    let moveList: number[] = [];

    for (let square = 0; square < BOARD.length; square++) {
        if (square & OUT_OF_BOARD_MASK) continue;

        let piece = BOARD[square];
        if (piece == NONE) continue;

        let pieceColor = piece & PIECE_COLOR_MASK;
        if (pieceColor != ACTIVE_COLOR) continue;

        let pieceType = piece & PIECE_TYPE_MASK;
        if (pieceType == PAWN) {
            let direction = UP * (1 - ACTIVE_COLOR / 4);

            // Pawn moves forward
            let targetSquare = square + direction;
            let targetPiece = BOARD[targetSquare];
            if (targetPiece == NONE) {
                if ((targetSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR / BLACK]) {
                    // Pawn moves one square forward and promotes
                    moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE, square, targetSquare, NONE, (ACTIVE_COLOR + QUEEN)));
                    moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE, square, targetSquare, NONE, (ACTIVE_COLOR + ROOK)));
                    moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE, square, targetSquare, NONE, (ACTIVE_COLOR + BISHOP)));
                    moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE_AND_PROMOTE, square, targetSquare, NONE, (ACTIVE_COLOR + KNIGHT)));
                } else {
                    // Pawn moves one square forward
                    moveList.push(createMove(MF_PAWN_PUSH_1_SQUARE, square, targetSquare));

                    if ((square & RANK_MASK) == PAWN_STARTING_RANK[ACTIVE_COLOR / BLACK]) {
                        targetSquare += direction;
                        let targetPiece = BOARD[targetSquare];
                        if (targetPiece == NONE) {
                            // Pawn moves two squares forward
                            moveList.push(createMove(MF_PAWN_PUSH_2_SQUARES, square, targetSquare));
                        }
                    }
                }
            }

            // Pawn captures diagonally
            for (let lr = LEFT; lr <= RIGHT; lr += 2) {
                targetSquare = square + direction + lr;
                if (targetSquare & OUT_OF_BOARD_MASK) continue;

                targetPiece = BOARD[targetSquare];
                if (targetPiece != NONE && (targetPiece & PIECE_COLOR_MASK) != ACTIVE_COLOR) {
                    if ((targetSquare & RANK_MASK) == PAWN_PROMOTING_RANK[ACTIVE_COLOR / BLACK]) {
                        // Pawn capture and promotes
                        moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE, square, targetSquare, targetPiece, (ACTIVE_COLOR + QUEEN)));
                        moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE, square, targetSquare, targetPiece, (ACTIVE_COLOR + ROOK)));
                        moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE, square, targetSquare, targetPiece, (ACTIVE_COLOR + BISHOP)));
                        moveList.push(createMove(MF_PAWN_CAPTURE_AND_PROMOTE, square, targetSquare, targetPiece, (ACTIVE_COLOR + KNIGHT)));
                    } else {
                        // Pawn capture
                        moveList.push(createMove(MF_PAWN_CAPTURE, square, targetSquare, targetPiece));
                    }
                }
                if (targetSquare == EN_PASSANT_SQUARE) {
                    // Pawn capture "en passant"
                    moveList.push(createMove(MF_PAWN_CAPTURE_EN_PASSANT, square, targetSquare));
                }
            }

        } else {
            let slide = pieceType & PIECE_SLIDER_MASK;
            let directions = MOVE_DIRECTIONS.get(pieceType)!;
            for (let d = 0; d < directions.length; d++) {
                let targetSquare = square;
                do {
                    targetSquare += directions[d];
                    if (targetSquare & OUT_OF_BOARD_MASK) break;

                    let targetPiece = BOARD[targetSquare];
                    if (targetPiece != NONE && (targetPiece & PIECE_COLOR_MASK) == ACTIVE_COLOR) break;

                    if (targetPiece != NONE) {
                        moveList.push(createMove(MF_PIECE_CAPTURE_MOVE, square, targetSquare, targetPiece));
                        break;
                    }

                    moveList.push(createMove(MF_PIECE_NORMAL_MOVE, square, targetSquare));
                } while (slide);
            }
        }
    }

    // Generate castle moves
    let kingSquare = KING_SQUARE[ACTIVE_COLOR / BLACK];
    // TODO

    return moveList;
}

function createMove(moveFlags: number, fromSquare: number, toSquare: number, capturedPiece: number = NONE, promotedPiece: number = NONE): number {
    return moveFlags | (fromSquare << 8) | (toSquare << 15) | (capturedPiece << 22) | (promotedPiece << 26);
}

function createHistory(enPassantSquare: number, castlingRights: number, fiftyMoveClock: number): number {
    return enPassantSquare | (castlingRights << 7) | (fiftyMoveClock << 11);
}

function makeMove(move: number): void {
    MOVE_STACK.push(move);
    HISTORY_STACK.push(createHistory(EN_PASSANT_SQUARE, CASTLING_RIGHTS, FIFTY_PLY));
    ACTIVE_COLOR = BLACK - ACTIVE_COLOR;

    let moveFlags = move & 0xFF;
    let fromSquare = (move >> 8) & 0x7F;
    let toSquare = (move >> 15) & 0x7F;

    let piece = BOARD[fromSquare];
    BOARD[fromSquare] = NONE;
    BOARD[toSquare] = piece;

    // Update EN_PASSANT_SQUARE
    if (moveFlags & PAWN_PUSH_2_SQUARES_BIT) {
        EN_PASSANT_SQUARE = (fromSquare + toSquare) / 2;
    } else {
        EN_PASSANT_SQUARE = SQUARE_NULL;
    }

    // Update FIFTY_PLY
    if ((moveFlags & PAWN_MOVE_BIT) || (moveFlags & CAPTURE_BIT)) {
        FIFTY_PLY = 0;
    } else {
        FIFTY_PLY++;
    }

    // Pawn promotion
    if (moveFlags & PROMOTION_BIT) {
        let promotedPiece = (move >> 26) & 0x0F;
        BOARD[toSquare] = promotedPiece;
    }

    // Pawn captures en passant 
    if (moveFlags & EN_PASSANT_BIT) {
        // Captured pawn should be removed
        let square = (fromSquare & RANK_MASK) + (toSquare & FILE_MASK);
        BOARD[square] = NONE;
    }

    // King move
    if ((piece & PIECE_TYPE_MASK) == KING) {
        KING_SQUARE[(piece & PIECE_COLOR_MASK) / BLACK] = toSquare;
    }

}

function takeback(): void {
    // Restore game state from history
    let history = HISTORY_STACK.pop()!;
    EN_PASSANT_SQUARE = history & 0x7F;
    CASTLING_RIGHTS = (history >> 7) & 0x0F;
    FIFTY_PLY = (history >> 11) & 0x7F;
    ACTIVE_COLOR = BLACK - ACTIVE_COLOR;

    let move = MOVE_STACK.pop()!;
    let moveFlags = move & 0x0F;
    let fromSquare = (move >> 8) & 0x7F;
    let toSquare = (move >> 15) & 0x7F;
    let capturedPiece = (move >> 22) & 0x0F;

    let piece = BOARD[toSquare];

    // If last move was a promotion, restore the promoting pawn
    if (moveFlags & PROMOTION_BIT) piece = ACTIVE_COLOR + PAWN;

    BOARD[fromSquare] = piece;
    BOARD[toSquare] = capturedPiece;

    if ((piece & PIECE_TYPE_MASK) == KING) {
        KING_SQUARE[ACTIVE_COLOR / BLACK] = fromSquare;
    }

    // If last move was an en passant capture, restore the captured pawn
    if (moveFlags & EN_PASSANT_BIT) {
        let square = (fromSquare & RANK_MASK) + (toSquare & FILE_MASK);
        BOARD[square] = (BLACK - ACTIVE_COLOR) + PAWN;
    }

}

function isSquareAttacked(square: number, color: number): boolean {
    for (let pieceType = QUEEN; pieceType >= KING; pieceType--) {
        let piece = color + pieceType;
        if (pieceType == PAWN) {
            let direction = DOWN * (1 - color / 4);
            for (let lr = LEFT; lr <= RIGHT; lr += 2) {
                let targetSquare = square + direction + lr;
                if (targetSquare & OUT_OF_BOARD_MASK) continue;
                if (BOARD[targetSquare] == piece) return true;
            }
        } else {
            let slide = pieceType & PIECE_SLIDER_MASK;
            let directions = MOVE_DIRECTIONS.get(pieceType)!;
            for (let d = 0; d < directions.length; d++) {
                let targetSquare = square;
                do {
                    targetSquare += directions[d];
                    if (targetSquare & OUT_OF_BOARD_MASK) break;
                    let targetPiece = BOARD[targetSquare];
                    if (targetPiece != NONE) {
                        if (targetPiece == piece) return true;
                        break;
                    }
                } while (slide);
            }
        }
    }
    return false;
}

function isMoveLegal(move: number): boolean {
    makeMove(move);
    let isLegal = !isSquareAttacked(KING_SQUARE[1 - ACTIVE_COLOR / BLACK], ACTIVE_COLOR);
    takeback();
    return isLegal;
}

function perft(depth: number): number {
    if (depth == 0) return 1;
    let nodes = 0;
    let moveList = generateMoves();
    for (let moveIndex = 0; moveIndex < moveList.length; moveIndex++) {
        let move = moveList[moveIndex];
        if (isMoveLegal(move)) {
            makeMove(move);
            nodes += perft(depth - 1);
            takeback();
        }
    }
    return nodes;
}

////////////////////////////////////////////////////////////////
//  DISPLAYING AND DEBUGGING FUNCTIONS                        //
////////////////////////////////////////////////////////////////

function printBoard() {
    let printableBoard = '';
    for (let square = 0; square < BOARD.length; square++) {
        if (!(square & OUT_OF_BOARD_MASK)) {
            printableBoard += PIECE_CODE_TO_PRINTABLE_CHAR.get(BOARD[square]) + " ";
            if ((square + RIGHT) & 0x08) printableBoard += '\n';
        }
    }
    console.log(printableBoard);
}

function printIsAttackedBoard(color: number) {
    let printableBoard = '';
    for (let square = 0; square < BOARD.length; square++) {
        if (!(square & OUT_OF_BOARD_MASK)) {
            printableBoard += (isSquareAttacked(square, color) ? 'A' : '.') + " ";
            if ((square + RIGHT) & 0x08) printableBoard += '\n';
        }
    }
    console.log(printableBoard);
}

function printMove(move: number) {
    let moveFlags = move & 0x0F;
    let fromSquare = (move >> 8) & 0x7F;
    let toSquare = (move >> 15) & 0x7F;
    let capturedPiece = (move >> 22) & 0x0F;
    let promotedPiece = (move >> 26) & 0x0F;
    console.log(PIECE_CODE_TO_PRINTABLE_CHAR.get(BOARD[fromSquare]) + '  moves from ' + toSquareCoordinates(fromSquare) + ' to ' + toSquareCoordinates(toSquare) + ' (capture=' + capturedPiece + '; promote=' + promotedPiece + ')');
}

function testPerft() {
    let perftTests = new Map<string, number[]>();
    perftTests.set('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', [1, 20, 400, 8902, 197281, 4865609, 119060324]); // Starting position
    perftTests.set('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 0', [1, 14, 191, 2812, 43238, 674624, 11030083, 178633661]); // Position 3
    perftTests.set('r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10', [1, 46, 2079, 89890, 3894594, 164075551]); // Position 6

    console.log('========================================');
    perftTests.forEach((perftCounts, fenString) => {
        initBoardFromFen(fenString);
        printBoard();
        for (let depth = 0; depth < perftCounts.length; depth++) {
            let perftCount = perft(depth);
            console.log('Depth = ' + depth + ' ; Perft = ' + perftCount + ' ; ' + (perftCount == perftCounts[depth]));
        }
        console.log('========================================');
    });
}

////////////////////////////////////////////////////////////////
//  MAIN                                                      //
////////////////////////////////////////////////////////////////

testPerft();

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
initBoardFromFen(STARTING_FEN);
for (let run = 0; run < 5; run++) {
    console.time('perft');
    console.log(perft(6));
    console.timeEnd('perft');
}
