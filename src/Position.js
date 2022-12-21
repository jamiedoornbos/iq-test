import "./Position.css"
import classNames from "classnames"

const Position = ({index, top, left, hasPegInHole, onClickPosition}) => {
    const onClick = (evt) => {
        onClickPosition(index, evt);
    };

    const position = {top: `${top}px`, left: `${left}px`};
    return (
        <div className="Position__Wrapper" style={position}>
            <div className={
                classNames("Position", {"Position--withPeg": hasPegInHole})} onClick={onClick}>
            </div>
        </div>
    );
};

export default Position;
