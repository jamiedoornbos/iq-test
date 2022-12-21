import "./Board.css"
import Position from "./Position.js"
import {useState, useRef, useEffect} from "react"
import classNames from "classnames"

const SPACING = 30;

const getRating = (pegs) => {
    switch (pegs) {
        case 1: return "genius"
        case 2: return "pretty clever"
        case 3: return "so-so"
        default: return "dumb as a stump"
    }
};

const Board = ({
    positions,
    pegs,
    remainingPegs,
    discardedPegs,
    possibleJumps,
    removePeg,
    doJump,
}) => {
    const [flash, setFlash] = useState("");
    const flashTimeout = useRef(null);
    const firstMove = discardedPegs === 0;
    const gameOver = !firstMove && possibleJumps.length === 0;
    const [selectedPeg, setSelectedPeg] = useState(null);
    const jumpsFromSelected = possibleJumps.filter(({from}) => from === selectedPeg);
    const header = (
        flash ? flash :
        gameOver ? `Verdict: ${getRating(remainingPegs)}` : 
        firstMove ? "Click a peg to start" : 
        selectedPeg != null ? "Click an empty space to drop" :
        "Click a peg to pick up"
    );

    const setTransientFlash = (message) => {
        setFlash(message);
        clearTimeout(flashTimeout.current);
        flashTimeout.current = setTimeout(() => {
            setFlash("");
        }, 1500);
    };

    const onClickPosition = (index) => {
        if (firstMove) {
            removePeg(index);
            return;
        }

        if (gameOver) {
            return;
        }

        if (selectedPeg != null) {
            const jump = jumpsFromSelected.find(({to}) => to === index);
            if (!jump) {
                setTransientFlash("The peg can't be dropped there");
                return;
            }
            doJump(jump);
            setSelectedPeg(null);
            return;
        }

        if (!pegs[index]) {
            setTransientFlash("There's no peg there");
            return;
        }

        const jump = possibleJumps.find(({from}) => from === index);
        if (!jump) {
            setTransientFlash("That peg can't jump anywhere");
        } else {
            setSelectedPeg(index);
        }
    };

    useEffect(() => {
        clearTimeout(flashTimeout.current);
    }, []);

    return (
        <>
            <p className={classNames("Board__Instructions", {"Board__Instructions--flash": flash})}>
                {header}
            </p>
            <div className="Board">
                <div className="Board__Grid">
                    {positions.map(([x, y], index) => (
                        <Position key={index} index={index} top={y * SPACING} left={x * SPACING}
                            peg={pegs[index]} onClickPosition={onClickPosition}
                            jumpTarget={jumpsFromSelected.find(({to}) => to === index) != null}
                            pickedUp={index === selectedPeg}/>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Board;
