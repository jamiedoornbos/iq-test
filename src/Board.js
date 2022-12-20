import "./Board.css"
import _ from "lodash"
import classNames from "classnames"

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
    const positionsWithPegs = _.keyBy(pegs);
    return (
        <div className="Board">
            <div className="Board__Grid">
                {BOARD.map(([x, y], position) => {
                    const [top, left] = [`${y * SPACING}px`, `${x * SPACING}px`];
                    const hasPeg = positionsWithPegs[position];
                    return (
                        <div className="Position__Wrapper" style={{top, left}}>
                            <div key={position} className={
                                classNames("Position", {["Position--withPeg"]: hasPeg})}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Board;
