function knightsTravails(start, end) {
    start = convertPoss(start);
    end = convertPoss(end);

    const board = {};
    const parents = {};
    board[JSON.stringify(start)] = 0;
    parents[JSON.stringify(start)] = null;
    const q = [start];

    while (q.length > 0) {
        const loc = q.shift();

        if (loc[0] === end[0] && loc[1] === end[1]) {
            return reconstructPath(parents, start, end);
        }

        const moves = checkMoves(getMoves(loc));

        moves.forEach(move => {
            const moveKey = JSON.stringify(move);
            if (!(moveKey in board)) { 
                q.push(move);
                board[moveKey] = board[JSON.stringify(loc)] + 1;
                parents[moveKey] = loc; 
            }
        });
    }

    return null;
}

function convertPoss(pos) {
    const col = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
    const letter = pos.charAt(0);
    const num = pos.charAt(1);
    return [Number(num), col[letter]];
}

function getMoves(loc) {
    return [
        [loc[0] + 2, loc[1] - 1], [loc[0] + 2, loc[1] + 1],
        [loc[0] - 2, loc[1] - 1], [loc[0] - 2, loc[1] + 1],
        [loc[0] + 1, loc[1] - 2], [loc[0] + 1, loc[1] + 2],
        [loc[0] - 1, loc[1] - 2], [loc[0] - 1, loc[1] + 2]
    ];
}

function checkMoves(moves) {
    return moves.filter(move => 
        move[0] >= 1 && move[0] <= 8 && move[1] >= 1 && move[1] <= 8
    );
}

function reconstructPath(parents, start, end) {
    const path = [];
    let current = end;

    while (current) {
        path.push(convertBack(current));
        current = parents[JSON.stringify(current)];
    }

    return path.reverse().join(" -> ");
}

function convertBack(pos) {
    const cols = { 1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h" };
    const [row, col] = pos;
    return `${cols[col]}${row}`;
}


console.log(knightsTravails("a1","d4"));
console.log("stop");