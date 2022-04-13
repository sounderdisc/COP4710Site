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
        axios.post("http://localhost:8080/fdb/project/backend/query" , {
            "select": [
             "username","password"
            ],
            "from": "users",
            "where" : `username = "` + user + `"`
          })
          .then(res => {
                console.log(res.data)
                if (res.data.length !== 0) {
                    // if (res.data[0].pwd === hash(pw)) navigate("/app", { state: true }) // use if password is stored hashed in the database
                    if (res.data[0].password === pw) navigate("/app", { state: true }) // use if password is stored as plaintext in the database
                    else console.log("failed")
                } else {
                    console.log("failed")
                }
          })
    }

    return (
        <div>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
            </head>
            <div class="container justify-content-center">
                <h1 class='row justify-content-center'>Please Login Below</h1>
                <br />
                <div class='row p-1 m-1'>
                    <p class="col-4 mx-auto p4">
                        <input class='form-control' id="username" type="text" placeholder="username"></input>
                    </p>
                </div>
                <div class='row p-1 m-1'>
                    <p class="col-4 mx-auto p4">
                        <input class='form-control' id="password" type="password" placeholder="password"></input>
                    </p>
                </div>
                <div class='row justify-content-center'>
                    <button class="col-1 m-4 btn btn-outline-dark" onClick={verifyLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login