import React, {useState,useRef,useEffect} from "react";
import './App.css';
var symbol1="+-";
var symbol2="/*";
var dcount=0;

function App(){
    const[result, setResult]= useState("");
    const inputRef= useRef(null);

   function minusPlus() {
        if (result.charAt(0) === "-") {
          setResult(result.substring(1));
        } else {
          setResult("-" + result);
        }
      };

    function click(elem){
        if(result==="Error"){
            clear();
        }
        if(elem.target.name==="."){
            dcount+=1;
        }
        if(dcount===2){
            dcount=1;
            setResult(result);
        }
        else{
            if(symbol1.includes(elem.target.name,0) || symbol2.includes(elem.target.name,0)){
                dcount=0;
            }
            if(symbol1.includes(elem.target.name,0) && (symbol1.includes(result.charAt(result.length-1),0) || symbol2.includes(result.charAt(result.length-1,0))) && result.charAt(result.length-1)!==""){
                setResult(result);
            }
            else if(symbol2.includes(elem.target.name,0) && (symbol1.includes(result.charAt(result.length-1),0) || symbol2.includes(result.charAt(result.length-1),0) || result.charAt(result.length-1)==="")){
                setResult(result);
            }
            else{
                setResult(result+elem.target.name);
            }
        }
    }

    function backspace(){
        if(result==="Error"){
            clear(); 
        }
        else{
            if(result.charAt(result.length-1)==="."){
                dcount=0;
            }
            setResult(result.slice(0,-1));
        }
    }

    function clear(){
        dcount=0;
        setResult("");
    }

    function dcounter(){
        if(result.includes(".",0)){
            dcount=1;
        }
        else{
            dcount=0;
        }
    }

    function calculate(){
        if(result===""){
            clear();
        }
        else if(result==="Error"){
            clear();
        }
        else{
            try{
                setResult(eval(result).toString());
                dcounter();
            }
            catch(error){
                setResult("Error");
            }
        }
    }

    function percentage(){
        if((symbol1.includes(result.charAt(result.length-1),0) || symbol2.includes(result.charAt(result.length-1),0) || result.charAt(result.length-1)==="")){
            setResult(result);
        }
        else{
            setResult(String((parseFloat(result) / 100)));
            dcounter();
        }
    }
    return(
        <div class="container mt-10 p-4">    
            <div className="calc-app">
                <form>
                    <input type="text" value={result} ref={inputRef}/>
                </form>   

                <div className="keypad">
                    <button id="clear" class="btn-func" onClick={clear} >C</button>
                    <button id="backspace" class="btn-func" onClick={backspace} ><i class="glyphicon glyphicon-arrow-left"></i></button>
                    <button class="btn-func" onClick={minusPlus}>+/-</button>
                    <button name="/" class="btn-func" onClick={click}>/</button>
                    <button name="7" class="btn-numbers" onClick={click}>7</button>
                    <button name="8" class="btn-numbers" onClick={click}>8</button>
                    <button name="9" class="btn-numbers" onClick={click}>9</button>
                    <button name="*" class="btn-func" onClick={click}>x</button>
                    <button name="4" class="btn-numbers" onClick={click}>4</button>
                    <button name="5" class="btn-numbers" onClick={click}>5</button>
                    <button name="6" class="btn-numbers" onClick={click}>6</button>
                    <button name="+" class="btn-func" onClick={click}>+</button>
                    <button name="1" class="btn-numbers" onClick={click}>1</button>
                    <button name="2" class="btn-numbers" onClick={click}>2</button>
                    <button name="3" class="btn-numbers" onClick={click}>3</button>
                    <button name="-" class="btn-func" onClick={click}>-</button>
                    <button name="%" class="btn-func" onClick={percentage}>%</button>
                    <button name="0" class="btn-numbers " onClick={click}>0</button>
                    <button name="." class="btn-func" onClick={click}>.</button>
                    <button id="result" class="btn-func" onClick={calculate}>=</button>
                </div>         
            </div>
        </div>
    );
    }
export default App;