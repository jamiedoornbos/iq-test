import "./Game.css"
import useGameState from "./GameState.js"
import Board from "./Board.js"
import classNames from "classnames"

const Game = () => {
    const gameState = useGameState();
    const {discardedPegs, remainingPegs, possibleJumps, reset} = gameState;
    const gameOver = discardedPegs > 0 && possibleJumps.length === 0;
    return (
        <div className="Game">
            <Board {...gameState}/>
            <p className="Game__Status">
                {discardedPegs} pegs discarded<br/>
                {remainingPegs} pegs remaining<br/>
                {possibleJumps.length} moves available
            </p>
            <div className="Game__Buttons">
                <button className={classNames("Game__Button", {
                    "Game__Button--gameOver": gameOver
                })} onClick={reset}>Try Again</button>
            </div>
        </div>
    );
}

export default Game;
