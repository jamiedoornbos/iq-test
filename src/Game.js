import "./Game.css"
import useGameState from "./GameState.js"
import Board from "./Board.js"

const Game = () => {
    const gameState = useGameState();
    return (
        <div className="Game">
            <Board {...gameState}/>
        </div>
    );
}

export default Game;
