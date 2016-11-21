import React from 'react';
import ToggleButton from 'react-bootstrap-toggle';

const ToggleComponent = ({ isToggled, onToggleButton }) => {
    return (
        <div>
            <span className={
                isToggled
                ? "singleton-span"
                : "singleton-span active"}>Singleton mode  </span>
            <ToggleButton
                on={" "}
                off={" "}
                size={"small"}
                width={"50px"}
                height={"22px"}
                onstyle={"default"}
                offstyle={"default"}
                active={isToggled}
                onChange={onToggleButton}/>
            <span className={
                isToggled
                ? "tei-span active"
                : "tei-span"}>  Tracked Entity Instance mode</span>
        </div>
    );
}

export default ToggleComponent;
