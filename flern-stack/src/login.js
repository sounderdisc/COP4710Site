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
        axios.post("http://localhost:8080/fdb/test/admin-accounts/query" , {
            "select": [
             "militaryId","pwd"
            ],
            "from": "admin",
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
                    <button class='col-1 m-4 btn btn-outline-dark' onClick={toAdminPage}>AdminPage</button> 
                </div>
            </div>
        </div>
    )
}

export default Login