function benchBoardLoop() {
    const OUT_OF_BOARD_MASK = 0x88;

    for (let run = 0; run < 5; run++) {
        console.time('bench 1');
        let count1 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let square = 0; square < 120; square++) {
                if (square & OUT_OF_BOARD_MASK) continue;
                if (square == 68) count1++;
            }
        }
        console.log(count1);
        console.timeEnd('bench 1');

        console.time('bench 2');
        let count2 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let square = 0; square < 64; square++) {
                let square88 = ((square << 1) & 0x70) | (square & 0x07);
                if (square88 == 68) count2++;
            }
        }
        console.log(count2);
        console.timeEnd('bench 2');

        console.time('bench 3');
        let count3 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let square = 0; square < 64; square++) {
                let square88 = square + (square & 0x38);
                if (square88 == 68) count3++;
            }
        }
        console.log(count3);
        console.timeEnd('bench 3');

        console.time('bench 4');
        let count4 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let square = 0; square < 64; square++) {
                let square88 = square + (square & ~7);
                if (square88 == 68) count4++;
            }
        }
        console.log(count4);
        console.timeEnd('bench 4');
    }
}

function benchPawnStartingRankDetection() {
    const OUT_OF_BOARD_MASK = 0x88;
    const RANK_MASK = 0x70;
    const PAWN_STARTING_RANK = [0x60, 0x10];
    let ACTIVE_COLOR = 0;

    for (let run = 0; run < 5; run++) {
        console.time('bench 1');
        ACTIVE_COLOR = 0;
        let count1 = 0;
        for (let i = 0; i < 10000000; i++) {
            for (let square = 0; square < 128; square++) {
                if (square & OUT_OF_BOARD_MASK) continue;
                if ((~square & RANK_MASK) == (96 - 80 * ACTIVE_COLOR)) {
                    count1++;
                }
            }
            ACTIVE_COLOR = 1 - ACTIVE_COLOR;
        }
        console.log(count1);
        console.timeEnd('bench 1');

        console.time('bench 2');
        ACTIVE_COLOR = 0;
        let count2 = 0;
        for (let i = 0; i < 10000000; i++) {
            for (let square = 0; square < 128; square++) {
                if (square & OUT_OF_BOARD_MASK) continue;
                if ((square & RANK_MASK) == PAWN_STARTING_RANK[ACTIVE_COLOR]) {
                    count2++;
                }
            }
            ACTIVE_COLOR = 1 - ACTIVE_COLOR;
        }
        console.log(count2);
        console.timeEnd('bench 2');
    }
}

function benchBoardArray() {
    const OUT_OF_BOARD_MASK = 0x88;
    let BOARD_1 = new Uint8Array(128);
    let BOARD_2 = [];

    for (let run = 0; run < 5; run++) {
        console.time('bench 1');
        let count1 = 0;
        for (let i = 0; i < 10000000; i++) {
            for (let square = 0; square < 128; square++) {
                BOARD_1[square] = 0;
            }
            for (let square = 0; square < 128; square++) {
                BOARD_1[square] = square;
            }
            for (let square = 0; square < 128; square++) {
                if (BOARD_1[square] % 3 == 0) {
                    count1++;
                }
            }
        }
        console.log(count1);
        console.timeEnd('bench 1');

        console.time('bench 2');
        let count2 = 0;
        for (let i = 0; i < 10000000; i++) {
            for (let square = 0; square < 128; square++) {
                BOARD_2[square] = 0;
            }
            for (let square = 0; square < 128; square++) {
                BOARD_2[square] = square;
            }
            for (let square = 0; square < 128; square++) {
                if (BOARD_2[square] % 3 == 0) {
                    count2++;
                }
            }
        }
        console.log(count2);
        console.timeEnd('bench 2');
    }
}

function benchMakePiece() {

    for (let run = 0; run < 5; run++) {
        console.time('bench 1');
        let count1 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let pieceType = 1; pieceType < 6; pieceType++) {
                for (let color = 0; color <= 1; color++) {
                    let piece = pieceType | (color << 3);
                    if (piece == 14) count1++;
                }
            }
        }
        console.log(count1);
        console.timeEnd('bench 1');

        console.time('bench 2');
        let count2 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let pieceType = 1; pieceType < 6; pieceType++) {
                for (let color = 0; color <= 1; color++) {
                    let piece = pieceType + color * 8;
                    if (piece == 14) count2++;
                }
            }
        }
        console.log(count2);
        console.timeEnd('bench 2');
    }
}

function benchMovePieceInPieceList() {
    let squareList1 = new Set<number>();
    squareList1.add(98);
    squareList1.add(99);
    squareList1.add(100);
    squareList1.add(101);
    let squareList2 = [98, 99, 100, 101];
    let squareList3 = new Uint8Array(10);
    squareList3.set([98, 99, 100, 101]);
    let squareList4 = [98, 99, 100, 101];

    function movePieceInList1(fromSquare: number, toSquare: number) {
        squareList1.delete(fromSquare);
        squareList1.add(toSquare);
    }

    function movePieceInList2(fromSquare: number, toSquare: number) {
        for (let i = 0; i < squareList2.length; i++) {
            if (squareList2[i] == fromSquare) {
                squareList2[i] == toSquare;
                break;
            }
        }
    }

    function movePieceInList3(fromSquare: number, toSquare: number) {
        for (let i = 0; i < squareList3.length; i++) {
            if (squareList3[i] == fromSquare) {
                squareList3[i] == toSquare;
                break;
            }
        }
    }

    function movePieceInList4(fromSquare: number, toSquare: number) {
        squareList4[squareList4.indexOf(fromSquare)] = toSquare;
    }

    for (let run = 0; run < 5; run++) {
        console.time('bench 1');
        let count1 = 0;
        for (let i = 0; i < 100000000; i++) {
            movePieceInList1(99, 67);
            movePieceInList1(100, 68);
            movePieceInList1(67, 99);
            movePieceInList1(68, 100);
        }
        console.log(count1);
        console.timeEnd('bench 1');

        console.time('bench 2');
        let count2 = 0;
        for (let i = 0; i < 100000000; i++) {
            movePieceInList2(99, 67);
            movePieceInList2(100, 68);
            movePieceInList2(67, 99);
            movePieceInList2(68, 100);
        }
        console.log(count2);
        console.timeEnd('bench 2');

        console.time('bench 3');
        let count3 = 0;
        for (let i = 0; i < 100000000; i++) {
            movePieceInList3(99, 67);
            movePieceInList3(100, 68);
            movePieceInList3(67, 99);
            movePieceInList3(68, 100);
        }
        console.log(count3);
        console.timeEnd('bench 3');

        console.time('bench 4');
        let count4 = 0;
        for (let i = 0; i < 100000000; i++) {
            movePieceInList4(99, 67);
            movePieceInList4(100, 68);
            movePieceInList4(67, 99);
            movePieceInList4(68, 100);
        }
        console.log(count4);
        console.timeEnd('bench 4');
    }
}

function benchRemovePieceInPieceList() {
    let squareList1 = new Set<number>();
    squareList1.add(98);
    squareList1.add(99);
    squareList1.add(100);
    squareList1.add(101);
    let squareList2 = [98, 99, 100, 101];
    let squareList3 = [98, 99, 100, 101];

    function removePieceInList1(square: number) {
        squareList1.delete(square);
    }

    function takebackRemovalInPieceList1(square: number) {
        squareList1.add(square);
    }

    function removePieceInList2(square: number) {
        let lastElement = squareList2.pop();
        for (let i = 0; i < squareList2.length; i++) {
            if (squareList2[i] == square) {
                squareList2[i] == lastElement;
                break;
            }
        }
    }

    function takebackRemovalInPieceList2(square: number) {
        squareList2.push(square);
    }

    function removePieceInList3(square: number) {
        let lastElement = squareList3.pop()!;
        if (lastElement != square) {
            squareList3[squareList3.indexOf(square)] = lastElement;
        }
    }

    function takebackRemovalInPieceList3(square: number) {
        squareList3.push(square);
    }

    for (let run = 0; run < 5; run++) {
        console.time('bench 1');
        let count1 = 0;

        for (let i = 0; i < 100000000; i++) {
            removePieceInList1(99);
            if (squareList1.size == 3) count1++;
            removePieceInList1(100);
            takebackRemovalInPieceList1(99);
            takebackRemovalInPieceList1(100);
        }
        console.log(count1);
        console.timeEnd('bench 1');

        console.time('bench 2');
        let count2 = 0;

        for (let i = 0; i < 100000000; i++) {
            removePieceInList2(99);
            if (squareList2.length == 3) count2++;
            removePieceInList2(100);
            takebackRemovalInPieceList2(99);
            takebackRemovalInPieceList2(100);
        }
        console.log(count2);
        console.timeEnd('bench 2');

        console.time('bench 3');
        let count3 = 0;

        for (let i = 0; i < 100000000; i++) {
            removePieceInList3(99);
            if (squareList3.length == 3) count3++;
            removePieceInList3(100);
            takebackRemovalInPieceList3(99);
            takebackRemovalInPieceList3(100);
        }
        console.log(count3);
        console.timeEnd('bench 3');
    }
}

function benchOutOfBoardDetection() {
    let BOARD = new Uint8Array(128);
    BOARD.fill(0);
    BOARD.fill(8, 64, 127);
    const OUT_OF_BOARD_MASK = 0x88;
    
    for (let run = 0; run < 5; run++) {
        console.time('bench 1');
        let count1 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let square = 0; square < 128; square++) {
                if (square & OUT_OF_BOARD_MASK) continue;
                if (square == 5) count1++;
            }
        }
        console.log(count1);
        console.timeEnd('bench 1');
    
        console.time('bench 2');
        let count2 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let square = 0; square < 128; square++) {
                if (BOARD[square] == 8) continue;
                if (square == 5) count2++;
            }
        }
        console.log(count2);
        console.timeEnd('bench 2');
    
        console.time('bench 3');
        let count3 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let square = 0; square < 128; square++) {
                if (BOARD[square] == 0) {
                    if (square == 5) count3++;
                }
            }
        }
        console.log(count3);
        console.timeEnd('bench 3');
    
        console.time('bench 4');
        let count4 = 0;
        for (let i = 0; i < 100000000; i++) {
            for (let square = 0; square < 128; square++) {
                if (square & OUT_OF_BOARD_MASK) continue;
                if (square == 5) count4++;
            }
        }
        console.log(count4);
        console.timeEnd('bench 4');
    }
}

//benchBoardLoop();
//benchPawnStartingRankDetection();
//benchBoardArray();
//benchMakePiece();
//benchMovePieceInPieceList();
//benchRemovePieceInPieceList();
benchOutOfBoardDetection();