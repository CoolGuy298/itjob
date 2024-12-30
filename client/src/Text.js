import React from "react";
import { useState, useEffect } from "react";


export const Text = () => {
    const [text, setText] = useState("");


    
    return (
        <div>
            <input
            onChange={(event)=>setText(event.target.value)}
            >

            </input>

            <h1> {text}</h1>
        </div>
    );
}