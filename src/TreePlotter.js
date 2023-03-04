import {useRef} from "react";
import {useEffect} from "react";

function TreePlotter(props={}){

    const ref = useRef(null)
    let width = 1050, height = 500
    let {simpleArray, maxDepth} = props
    useEffect(()=>{
        const ctx = ref.current.getContext('2d');

        ctx.clearRect(0, 0, width, height)
        ctx.beginPath()
        ctx.font = "10px";
        ctx.strokeStyle = "#000000"
        let step = (width - 50)/ ((2 ** maxDepth) - 1)

        simpleArray.forEach((num, index)=>{
            let st = 0
            if(maxDepth - num.y > 0){
                st = step * (2 ** ((maxDepth - num.y)) - 1)
            }
            if (index === 0){
                ctx.strokeText(num.num, (width - 50) / 2, num.y * 20 + 20)

            }else {
                ctx.strokeText(num.num, (st / 2) + (num.x * step * (2 ** (maxDepth - num.y))), num.y * 20 + 20)
            }
        })
        for (let i = 0; i < maxDepth; i++) {
            for (let j = 0; j < 2**i; j++) {
                ctx.beginPath();
                let st = 0
                if(maxDepth - i > 0){
                    st = step * (2 ** ((maxDepth - i)) - 1)
                }
                // console.log("x: ", (st / 2) + (j * step * (2 ** (maxDepth - i))))
                // ctx.moveTo((st / 2) + ((j - 1) * step * (2 ** (maxDepth - i))), (i - 1) * 20 + 20)
                ctx.moveTo((st / 2) + (j * step * (2 ** (maxDepth - i))), i * 20 + 25)
                let st2 = 0
                if(maxDepth - i + 1 > 0){
                    st2 = step * (2 ** ((maxDepth - (i + 1))) - 1)
                }
                ctx.lineTo((st2 / 2) + ((j * 2) * step * (2 ** (maxDepth - (i + 1)))), (i + 1) * 20 + 25)
                ctx.moveTo((st / 2) + (j * step * (2 ** (maxDepth - i))), i * 20 + 25)
                let st3 = 0
                if(maxDepth - i + 1 > 0){
                    st3 = step * (2 ** ((maxDepth - (i + 1))) - 1)
                }
                ctx.lineTo((st3 / 2) + ((j * 2 + 1) * step * (2 ** (maxDepth - (i + 1)))), (i + 1) * 20 + 25)
                ctx.stroke()
                // ctx.lineTo(x1, y1 - child.radius)
            }
        }

    },[simpleArray, maxDepth, width, height])

    return(
            <div style={{margin: 20}}>
                <canvas width={width} height={height} ref={ref}/>
            </div>
        )
    }
export default TreePlotter