import "./css/index.css"
import "./less/index.less"
import "./scss/index.scss"
import "bootstrap/dist/css/bootstrap.css"
import bb from "./b"


setTimeout(function(){
    console.log("我是普通函数");
},1000)
setTimeout(()=>{
    console.log("我是箭头函数");
},1000)
function* gen(){
    yield 1
    yield 2
   return 4
}
let g1=gen()
console.log(g1.next())