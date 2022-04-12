import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"

function App() {

    const [viewSoldierData, setSoldierData] = useState("");

    async function createUser() { 
        var firstName = document.getElementById("firstName").value
        var lastName = document.getElementById("lastName").value
        var militaryId = document.getElementById("militaryId").value
        var rank = Number(document.getElementById("rank").value)
        var base = Number(document.getElementById("base").value)
        var id = "soldier$" + firstName.slice(0, 1) + lastName
        var query = [
            {
                "_id" : id,
                "firstName" : firstName,
                "lastName" : lastName,
                "militaryId" : militaryId,
                "rank" : rank,
                "base" : base,
                "completedCerts" : [],
                "certificationStats" : []
            }
        ]
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:8080/fdb/test/admin-accounts/transact" , query)
        .then(res => { console.log(res.data) })
    }
    
    function viewSoldier() {
        var milId = document.getElementById("searchSoldierID").value
        var query = {
            "select": [
                "*"
            ],
            "from": "soldier",
            "where" : `militaryId = "` + milId + `"`
            }
        if (milId.length <= 0) {
            query = {
                "select": [
                    "*"
                ],
                "from": "soldier"
                }
        }
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:8080/fdb/test/admin-accounts/query", query)
        .then((res) => {
            console.log(res.data)
            var str = JSON.stringify(res.data, null, 2); // spacing level = 2
            var rmvBrackets = str.slice(2, str.length-2)
            var words = rmvBrackets.split(",")
            setSoldierData(words)
        })
    }

    return (
        <div class="container justify-content-center">
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
            </head>
            <h2 class='row justify-content-center m-4'>Create a new soldier</h2>
            <p class='row'>
                <p class="col-9 m-2 mx-auto">
                    <input class='form-control' id="firstName" type="text" placeholder="first_name"></input>
                </p>
            </p>
            <p class='row'>
                <p class="col-9 m-2 mx-auto">   
                    <input class='form-control' id="lastName" type="text" placeholder=" last_name"></input>
                </p>
            </p>
            <p class='row'>
                <p class="col-9 m-2 mx-auto">
                    <input class='form-control' id="militaryId" type="text" placeholder="military_id"></input>
                </p>
            </p>
            <p class='row'>
                <p class="col-9 m-2 mx-auto">
                    <input class='form-control' id="rank" type="text" placeholder="rank"></input>
                </p>
            </p>
            <p class='row'>
                <p class="col-9 m-2 mx-auto">
                    <input class='form-control' id="base" type="text" placeholder="base"></input>
                </p>
            </p>
            <p class='row'>
                <button class="mx-auto col-4 m-4 btn btn-outline-dark" onClick={createUser}>submit</button>
            </p>
            
            <br />

            <h3>Input a new certification attempt TODO</h3>
            <br />

            <h3>View soldier with a given Military ID</h3>
            <input id="searchSoldierID" type="text" placeholder="Leave blank to view all soldiers"size="22"></input>
            <button onClick={viewSoldier}>submit</button>
            <br />
            <p>{data}</p>
        </div>
    )
}

export default App;
