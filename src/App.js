
import './App.css';
import {useCallback, useEffect, useState} from "react";
import TreePlotter from "./TreePlotter";

function App() {
    const [simpleArray, setSimpleArray] = useState([])
    const [maxDepth, setMaxDepth] = useState(0)

    // console.log(simpleArray)
    const listener = useCallback((event)=>{
        if (event.code === "Space"){
            event.preventDefault()
            let newArray = Object.assign([], simpleArray)
            let newRand = Number(Math.random() * 200).toFixed(0) - 100;
            let check = true
            if(newArray.length > 200){
                return
            }
            while (check) {
                let hasNum = false
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].num === newRand) {
                        hasNum = true
                        break
                    }
                }
                if (hasNum){
                    newRand = Number(Math.random() * 200).toFixed(0) - 100;
                }else {
                    check = false
                }
            }
            if (newArray.length === 0){
                newArray.push({num: newRand, x: 0, y: 0})
            }else {
                let x = 0, y = 0
                for (let i = 0; i < newArray.length; i++) {
                    if(newArray[i].x === x && newArray[i].y === y){
                        if(newRand > newArray[i].num){
                            x = x * 2 + 1
                        }else {
                            x = x * 2
                        }
                        y++
                        i = 0
                    }
                }
                newArray.push({num: newRand, x: x, y: y})
                if(y > maxDepth){
                    setMaxDepth(y)
                }
                // newArray.push({num: newRand - 100})
            }
            setSimpleArray(newArray)
        }
    }, [maxDepth, simpleArray])

    useEffect(()=>{
        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [listener])
    return (
        <div
            // style={{height: "100%", width: "100%", position: "absolute"}}
            >
            <div>
                [
                {simpleArray.map(num =>{
                    return num.num + ", "
                })}
                ]
            </div>
            <TreePlotter simpleArray={simpleArray} maxDepth={maxDepth}/>
        </div>
  );
}

export default App;
