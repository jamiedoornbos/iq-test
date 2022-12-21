import "./Game.css"
import useGameState from "./GameState.js"
import Board from "./Board.js"
import classNames from "classnames"

const Game = () => {
    const gameState = useGameState();
    const {discardedPegs, discardedPegCount, remainingPegCount, possibleJumps, reset} = gameState;
    const gameOver = discardedPegCount > 0 && possibleJumps.length === 0;
    return (
        <div className="Game">
            <Board {...gameState}/>
            <p className="Game__Status">
                {discardedPegCount} pegs discarded<br/>
                {remainingPegCount} pegs remaining<br/>
                {possibleJumps.length} moves available
            </p>
            <p className="Game__Discards">
                {discardedPegCount ? null : (
                    <div className={classNames("Game__DiscardPeg", "Game__DiscardPeg--placeholder")}/>
                )}
                {discardedPegs.map((color) => (
                    <div className={classNames("Game__DiscardPeg", {
                        [`Game__DiscardPeg--color-${color}`]: Boolean(color)
                    })}/>
                ))}
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
