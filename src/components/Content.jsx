import { useState,useEffect } from "react"
import axios from 'axios';
function Content(){
    const [count,setCount ]=useState(0)
    const [Products,setProducts]=useState()
    const increment=()=>{
        setCount(count+1)

    };

    const decrement=()=>{
        setCount(count-1)
    };
    const fetchProducts=()=>{

    }
useEffect(fetchProducts,[])

    return (<div>
        <h3>Products Page</h3>
        <button onClick={decrement}>-</button> {count} <button onClick={increment}>+</button>
    </div>
    );
}
export default Content