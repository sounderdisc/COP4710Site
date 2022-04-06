import { useNavigate } from "react-router-dom"
import "./App.css"
import axios from "axios"
const { createHash } = require("crypto")

function Login() {
    let navigate = useNavigate()

    function hash(string) {
        return createHash("sha256").update(string).digest("hex")
    }

    async function verifyLogin() {
        var user = document.getElementById("username").value
        var pw = document.getElementById("password").value
        axios.post("http://localhost:5432/mydb?schema=private" , {
            "select": [
             "userId","pwd"
            ],
            "from": "user",
            "where" : `username = "` + user + `"`
          })
          .then(res => {
                // console.log(res.data)
                if (res.data.length !== 0) {
                    // expects password to be stored in the database hashed
                    if (res.data[0].pwd === hash(pw)) navigate("/app", { state: true }) // UNCOMMENT AFTER FINISHING Admin.js
                    else console.log("failed")
                } else {
                    console.log("failed")
                }
          })
    }

    async function toAdminPage() {
        navigate("/admin", { state: true })
    }

    return (
        <div>
            <h1>Please Login Below</h1>
            <br />
            <input id="username" type="text"></input>
            <br />
            <input id="password" type="password"></input>
            <button onClick={verifyLogin}>Login</button>
            <br />
            <br />
            <button onClick={toAdminPage}>AdminPage</button>
        </div>
    )
}

export default Login