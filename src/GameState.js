import _ from "lodash"
import {useState} from "react"


const ROWS = {
    0: [4],
    2: [3, 5],
    4: [2, 4, 6],
    6: [1, 3, 5, 7],
    8: [0, 2, 4, 6, 8],
};

const COLORS = ["A", "B", "C", "D", "E", "F"];

// Maps the hole number to it's coordinate in the board, 0..14 -> [x, y]
const POSITIONS = _.flatten(_.map(
    ROWS, (columns, row) => _.map(columns, col => [col, parseInt(row)])
));

const randomPegs = () => {
    return POSITIONS.map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
};

const ADJACENCY_RADIUS_SQUARED = 2.5 * 2.5;

const getVector = (hole1, hole2) => {
    const [p1, p2] = [POSITIONS[hole1], POSITIONS[hole2]];
    return [p2[0] - p1[0], p2[1] - p1[1]];
};

const isAdjacent = (vector) => {
    const [dx, dy] = vector;
    return (dx * dx + dy * dy) < ADJACENCY_RADIUS_SQUARED;
};

const NEIGHBOR_MAP = (() => {
    const map = POSITIONS.map(() => []);
    for (let home = 0; home < POSITIONS.length; ++home) {
        for (let neighbor = home + 1; neighbor < POSITIONS.length; ++neighbor) {
            if (isAdjacent(getVector(home, neighbor))) {
                map[home].push(neighbor);
                map[neighbor].push(home);
            }
        }
    }
    return map;
})();

const findHole = (x, y) => {
    return POSITIONS.findIndex(([px, py]) => {
        return px === x && py === y;
    });
};

const extrapolate = (from, to) => {
    const vector = getVector(from, to);
    if (!isAdjacent(vector)) {
        return -1;
    }
    return findHole(
        POSITIONS[from][0] + vector[0] * 2,
        POSITIONS[from][1] + vector[1] * 2,
    );
};


const useGameState = () => {
    const [board, setBoard] = useState(randomPegs());
    const [discardedPegs, setDiscardedPegs] = useState([]);
    const discardedPegCount = discardedPegs.length;
    const remainingPegCount = board.length - discardedPegCount;

    const possibleJumps = [];
    POSITIONS.forEach((_unused, index) => {
        if (!board[index]) {
            return;
        }
        NEIGHBOR_MAP[index].forEach(neighborIndex => {
            if (!board[neighborIndex]) {
                return;
            }
            const to = extrapolate(index, neighborIndex);
            if (to < 0 || board[to]) {
                return;
            }
            possibleJumps.push({from: index, to, jumped: neighborIndex});
        });
    });

    const removePeg = (position) => {
        if (board[position]) {
            setBoard(board.map((color, index) => index === position ? "" : color));
            setDiscardedPegs([...discardedPegs, board[position]]);
        }
    };

    const doJump = ({from, to, jumped}) => {
        if (board[from] && !board[to] && board[jumped]) {
            setBoard(board.map((color, index) => (
                (index === from || index === jumped) ? "" :
                index === to ? board[from] :
                color
            )));
            setDiscardedPegs([...discardedPegs, board[jumped]]);
        }
    };

    const reset = () => {
        setBoard(randomPegs());
        setDiscardedPegs([]);
    };

    return {
        positions: POSITIONS,
        board,
        discardedPegs,
        remainingPegCount,
        discardedPegCount,
        possibleJumps,
        removePeg,
        doJump,
        reset,
    }
};

export default useGameState;
