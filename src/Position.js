import "./Position.css"
import "./Peg.css"
import classNames from "classnames"

const Position = ({index, top, left, peg, onClickPosition, pickedUp, jumpTarget}) => {
    const onClick = (evt) => {
        onClickPosition(index, evt);
    };

    const position = {top: `${top}px`, left: `${left}px`};
    return (
        <>
            {pickedUp || jumpTarget ? <div className="Position__Wrapper" style={position}>
                <div className={classNames("Position__Select", {
                    "Position__Select--pickedUp": pickedUp,
                    "Position__Select--jumpTarget": jumpTarget
                })}/>
            </div> : null}
            <div className="Position__Wrapper" style={position}>
                <div className={classNames("Position", {
                    "Position--empty": !peg,
                    "Position--withPeg": Boolean(peg),
                    "Position--jumpTarget": jumpTarget,
                    [`Peg--color-${peg}`]: Boolean(peg),
                })} onClick={onClick}/>
            </div>
        </>
    );
};

export default Position;
