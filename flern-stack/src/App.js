import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"

function App() {

    const [viewUserData, setUserData] = useState("");

    async function createUser() { 
        var username = document.getElementById("username").value
        var password = document.getElementById("password").value
        var id = "users$newUser"
        var query = [
            {
                "_id" : id,
                "username" : username,
                "password" : password
            }
        ]
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:8080/fdb/project/backend/transact" , query)
        .then(res => { console.log(res.data) })
    }
    
    function viewUser() {
        var targetUser = document.getElementById("searchUserID").value
        var query = {
            "select": [
                "*"
            ],
            "from": "users",
            "where" : `username = "` + targetUser + `"`
            }
        if (targetUser.length <= 0) {
            query = {
                "select": [
                    "*"
                ],
                "from": "users"
                }
        }
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:8080/fdb/project/backend/query", query)
        .then((res) => {
            console.log(res.data)
            var str = JSON.stringify(res.data, null, 2); // spacing level = 2
            str = str.slice(2, str.length-2)
            str = str.replaceAll("{", "")
            str = str.replaceAll("}", "")
            str = str.replaceAll(":", ",")
            var words = str.split(",")
            var finalString = words[0]
            for (let i = 1; i < words.length; i++) {
                if (i % 2 == 0)
                    finalString += "\n"
                finalString += " " + words[i]
            }
            setUserData(finalString)
        })
    }

    return (
        <div class="container justify-content-center">
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
            </head>
            <h2 class='row justify-content-center m-4'>Create a new user</h2>
            <p class='row'>
                <p class="col-9 m-2 mx-auto">
                    <input class='form-control' id="username" type="text" placeholder="username"></input>
                </p>
            </p>
            <p class='row'>
                <p class="col-9 m-2 mx-auto">   
                    <input class='form-control' id="password" type="text" placeholder=" password"></input>
                </p>
            </p>
            <p class='row'>
                <button class="mx-auto col-4 m-4 btn btn-outline-dark" onClick={createUser}>submit</button>
            </p>
            
            <br />

            <h3>View user with a given username</h3>
            <input id="searchUserID" type="text" placeholder="Leave blank to view all users"size="22"></input>
            <button onClick={viewUser}>submit</button>
            <br />
            {viewUserData}
            {/* {Object.entries(viewUserData).map(
                    (value) => {
                        return(
                            <div>
                                <h3>value {value}</h3>
                            </div>
                        )
                    }
                )} */}
        </div>
    )
}

export default App;
