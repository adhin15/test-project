import { useEffect, useState } from "react";
import { SwitcherProps } from "./type";

const Switcher = ({
    labelLeft = "Left",
    labelRight = "Right",
    callBack = (value) => { return value },
}: SwitcherProps) => {
    const [switchState, setSwitchState] = useState(false);

    const switchToggle = () => {
        setSwitchState(!switchState)
    }
    useEffect(() => {
        callBack(switchState);
        console.log('current switch', switchState)
    }, [switchState])

    return (
        <div id="switch-toggle">
            <label className="toggleSwitch nolabel" >
                <input type="checkbox" checked={switchState} onChange={switchToggle} />
                <a></a>
                <span>
                    <span className="left-span">{labelLeft}</span>
                    <span className="right-span">{labelRight}</span>
                </span>
            </label>
        </div>
    );
};

export default Switcher;
