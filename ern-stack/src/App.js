import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState("");
    
    function changeState(e) {
        setData(() => e.target.value);
        console.log(data);
    }
    
    return (
        <div className="App">
            <p>
                Whatever you type in the form is updated to the data field in the paragraph tag in realtime!
            </p>
            <input type="text" onChange={changeState}></input>
            <p>{data}</p>
        </div>
    );
}

export default App;
