import "./Calculator.css";
import {useState,useEffect} from "react";
import moon from "./pics/moon.png";
import sun from "./pics/sun.png";
import Screen from "./Screen";
import Keypad from "./Keypad";
const usedKeyCodes=[48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,
101,102,103,104,105,8,13,190,187,189,191,56,111,106,107,109];
const numbers = ["0","1","2","3","4","5","6","7","8","9"];
const operators = ["-","+","*","/"];
function Calculator()
{
    const [state, setState] = useState(JSON.parse(localStorage.getItem("calculator-app-mode")) || false);
    const [expression, setExpression]=useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState(JSON.parse(localStorage.getItem("calculator-app-history")) || []);
    const onPress = (keyCode,key)=>{
        if(!keyCode) return;
        if(!usedKeyCodes.includes(keyCode)) return;
        if(numbers.includes(key)){
            if(key==="0"){
                if(expression.length===0)return;
            }
            calculateResult(expression+key);
            setExpression(expression+key);
        }
        else if(operators.includes(key)){
            if(!expression)return;
            const lastChar = expression.slice(-1);
            if(operators.includes(lastChar))return;
            if(lastChar===".")return;
            setExpression(expression+key);
        }
        else if(key==="."){
            if(!expression)return;
            const lastChar = expression.slice(-1);
            if(!numbers.includes(lastChar))return;
            setExpression(expression+key);
        }
        else if(keyCode===8){
            if(!expression)return;
            calculateResult(expression.slice(0,-1));
            setExpression(expression.slice(0,-1));
        }
        else if(keyCode===13){
            if(!expression)return;
            calculateResult(expression);
            const tempHistory = [...history]
            if(tempHistory.length>20)tempHistory = tempHistory.slice(0,1);
            tempHistory.push(expression);
            setHistory(tempHistory)
        }
    };
    const calculateResult=(exp)=>{
        if(!exp){
            setResult("");
            return
        };
        const lastChar = exp.slice(-1);
        if(!numbers.includes(lastChar)) exp=exp.slice(0,-1)
        const answer=eval(exp).toFixed(2)+"";
    setResult(answer);
    };
    useEffect(()=>{
        localStorage.setItem("calculator-app-mode",JSON.stringify(state))
    },[state]);
    useEffect(()=>{
        localStorage.setItem("calculator-app-history",JSON.stringify(history))
    },[history]);
    return(
        <div className="app" tabIndex="0" onKeyDown={(event)=>onPress(event.keyCode,event.key)} data-theme={state ? "dark":""}>
            <div className="c1">
                <div className="navbar">
                    <div className="toggle" onClick = {()=> setState(!state)}>
                        <div className={`circle ${state ? "circle_active" : ""}`}></div>
                    </div>
                    <img src={state ? moon : sun } alt="mode"></img>
                </div>
                <Screen expression={expression} result={result} history={history}/>
                <Keypad onPress={onPress}/>
            </div>
        </div>
    );
}

export default Calculator;