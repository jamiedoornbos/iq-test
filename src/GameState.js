import _ from "lodash"
import {useState} from "react"


const ROWS = {
    0: [4],
    2: [3, 5],
    4: [2, 4, 6],
    6: [1, 3, 5, 7],
    8: [0, 2, 4, 6, 8],
};

const COLORS = ["red", "green", "yellow", "orange", "blue", "purple", "white"];

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
    const [pegs, setPegs] = useState(randomPegs());
    const remainingPegs = pegs.filter(Boolean).length;
    const discardedPegs = pegs.length - remainingPegs;

    const possibleJumps = [];
    POSITIONS.forEach((_unused, index) => {
        if (!pegs[index]) {
            return;
        }
        NEIGHBOR_MAP[index].forEach(neighborIndex => {
            if (!pegs[neighborIndex]) {
                return;
            }
            const to = extrapolate(index, neighborIndex);
            if (to < 0 || pegs[to]) {
                return;
            }
            possibleJumps.push({from: index, to, jumped: neighborIndex});
        });
    });

    const removePeg = (position) => {
        setPegs(pegs.map((color, index) => index === position ? "" : color));
    };

    const doJump = ({from, to, jumped}) => {
        setPegs(pegs.map((color, index) => (
            (index === from || index === jumped) ? "" :
            index === to ? pegs[from] :
            color
        )));
    };

    const reset = () => {
        setPegs(randomPegs());
    };

    return {
        positions: POSITIONS,
        pegs,
        remainingPegs,
        discardedPegs,
        possibleJumps,
        removePeg,
        doJump,
        reset,
    }
};

export default useGameState;
