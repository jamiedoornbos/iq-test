import "./Board.css"
import Position from "./Position.js"

const SPACING = 30;

const Board = ({
    positions,
    filled,
    remainingPegs,
    discardedPegs,
    possibleJumps,
    removePeg,
    doJump,
}) => {
    const firstMove = discardedPegs === 0;
    const gameOver = !firstMove && possibleJumps.length === 0;
    const header = (
        firstMove ? "Choose a peg to remove" : 
        gameOver ? "Game over!" : 
        "Choose a peg to make jump"
    );

    const onClickPosition = (index) => {
        if (firstMove) {
            removePeg(index);
        }
    };

    return (
        <>
            <p className="Board__Instructions">
                {header}
            </p>
            <div className="Board">
                <div className="Board__Grid">
                    {positions.map(([x, y], index) => (
                        <Position key={index} index={index} top={y * SPACING} left={x * SPACING}
                            hasPegInHole={filled[index]} onClickPosition={onClickPosition}/>
                    ))}
                </div>
            </div>
            <p className="Board__Status">
                {discardedPegs} pegs discarded<br/>
                {remainingPegs} pegs remaining<br/>
                {possibleJumps.length} moves available
            </p>
        </>
    );
};

export default Board;
