import "./Keypad.css";
function Keypad(props)
{
    const keys = [
        {
            keycode: 55,
            label: "7",
        },
        {
            keycode: 56,
            label: "8",
        },
        {
            keycode: 57,
            label: "9",
        },
        {
            keycode: 52,
            label: "4",
        },
        {
            keycode: 53,
            label: "5",
        },
        {
            keycode: 54,
            label: "6",
        },
        {
            keycode: 49,
            label: "1",
        },
        {
            keycode: 50,
            label: "2",
        },
        {
            keycode: 51,
            label: "3",
        },
        {
            keycode: 48,
            label: "0",
        },
        {
            keycode: 190,
            label: ".",
        },
        {
            keycode: 13,
            label: "=",
        },
    ];
    const symbols = [
        {
            label: "⌫",
            keycode: 8,
            value: "backspace",
        },
        {
            label: "÷",
            keycode: 111,
            value: "/",
        },
        {
            label: "x",
            keycode: 56,
            value: "*",
        },
        {
            label: "﹣",
            keycode: 109,
            value: "-",
        },
        {
            label: "+",
            keycode: 107,
            value: "+",
        },
    ];
    return(
        <div className="k1">
            <div className="k1_keys">
                {keys.map((item,index)=>(
                    <p onClick = {() => props.onPress(item.keycode, item.label)} key={index}>{item.label}</p>
                ))}
            </div>
            <div className="k1_symbols">
                {symbols.map((item,index) => (
                    <p onClick = {() => props.onPress(item.keycode, item.value)} key={index}>{item.label}</p>
                ))}
            </div>
        </div>
    );
}
export default Keypad;