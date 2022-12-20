import "./Board.css"
import _ from "lodash"


const ROW_PEGS = {
    0: [4],
    2: [3, 5],
    4: [2, 4, 6],
    6: [1, 3, 5, 7],
    8: [0, 2, 4, 6, 8],
};

const BOARD = _.flatten(_.map(ROW_PEGS, (columns, row) => _.map(columns, col => [col, parseInt(row)])));


const SPACING = 30;

const Board = ({pegs}) => {
    const filled = {};
    pegs.forEach((number) => {
        filled[number] = 1;
    });
    return (
        <div className="Board">
            <div className="Board__Grid">
                {BOARD.map(([x, y], hole) => {
                    const [top, left] = [`${y * SPACING}px`, `${x * SPACING}px`];
                    return (
                        <div className="Peg__Wrapper" style={{top, left}}>
                            <div key={hole} className={`Peg ${filled[hole] ? "" : "Peg--Empty"}`}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Board;
