# PrimeChess, a NodeJS Chess Engine

PrimeChess UCI Engine, heavily inspired by Code Monkey King tutorial videos.

## 0x88 BOARD REPRESENTATION

|     | A| B| C| D| E| F| G| H| X| X| X| X| X| X| X| X|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|**1**|00|01|02|03|04|05|06|07|08|09|0A|0B|0C|0D|0E|0F|
|**2**|10|11|12|13|14|15|16|17|18|19|1A|1B|1C|1D|1E|1F|
|**3**|20|21|22|23|24|25|26|27|28|29|2A|2B|2C|2D|2E|2F|
|**4**|30|31|32|33|34|35|36|37|38|39|3A|3B|3C|3D|3E|3F|
|**5**|40|41|42|43|44|45|46|47|48|49|4A|4B|4C|4D|4E|4F|
|**6**|50|51|52|53|54|55|56|57|58|59|5A|5B|5C|5D|5E|5F|
|**7**|60|61|62|63|64|65|66|67|68|69|6A|6B|6C|6D|6E|6F|
|**8**|70|71|72|73|74|75|76|77|78|79|7A|7B|7C|7D|7E|7F|

## PIECE ENCODING

| DEC | HEX | BIN  | DESCRIPTION  |
|:---:|:---:|:---:|:---:|
|   0 |   0 | 0000 | NONE         |
|   1 |   1 | 0001 | WHITE PAWN   |
|   2 |   2 | 0010 | WHITE KING   |
|   3 |   3 | 0011 | WHITE KNIGHT |
|   4 |   4 | 0100 | WHITE BISHOP |
|   5 |   5 | 0101 | WHITE ROOK   |
|   6 |   6 | 0110 | WHITE QUEEN  |
|   7 |   7 | 0111 |              |
|   8 |   8 | 1000 |              |
|   9 |   9 | 1001 | BLACK KING   |
|  10 |   A | 1010 | BLACK PAWN   |
|  11 |   B | 1011 | BLACK KNIGHT |
|  12 |   C | 1100 | BLACK BISHOP |
|  13 |   D | 1101 | BLACK ROOK   |
|  14 |   E | 1110 | BLACK QUEEN  |
|  15 |   F | 1111 |              |

    PIECE_COLOR_MASK  = 1000 = 0x08
    PIECE_TYPE_MASK   = 0111 = 0x07
    PIECE_SLIDER_MASK = 0100 = 0x04

## MOVE FLAGS

| BINARY    | HEX  | DESCRIPTION         |
|:---:|:---:|:---:|
| 0000 0111 | 0x07 | PROMOTED PIECE      |
| 0000 1000 | 0x08 | CASTLING FLAG       |
| 0001 0000 | 0x10 | EN PASSANT CAPTURE  |
| 0010 0000 | 0x20 | PAWN PUSH 2 SQUARES |
| 0100 0000 | 0x40 | CAPTURE MOVE        |
| 1000 0000 | 0x80 | RESET PLY CLOCK     |