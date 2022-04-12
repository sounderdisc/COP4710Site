import "./App.css";
import axios from "axios"
const { createHash } = require("crypto")

function Admin() {
    
    function hash(string) {
        return createHash("sha256").update(string).digest("hex")
    }

    // this would take more time to implement than its worth. while very possible because sha256 spits out what looks like hexadecimal,
    // we should just re input the user data into a fresh backend with hashing
    async function hashAllPass() {
        console.log("loop through all users and update the predicate of their password to be the same thing but hashed. skip if already hashed")
    }

    // I am confident that I am getting the syntax on what axios wants wrong, and thats why im getting 400 bad request
    // copyJames works. user1 and user2 are identical if you type 123 into the field, no quotes
    async function copyJames() {
        var user1 = document.getElementById("id").value
        var user2 = "123"
        console.log(user1 + " " + user2)
        axios.post("http://localhost:8080/fdb/test/admin-accounts/query" , {
            "select": [
             "militaryId","pwd"
            ],
            "from": "admin",
            "where" : `username = "` + user2 + `"`
          })
        .then(res => { console.log(res.data) })
    }
    async function hardcodedQuery() {
        // this works
        var query = {
            "select": [
                "*"
            ],
            "from": "admin",
            }
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:8080/fdb/test/admin-accounts/query", query).then(res => { console.log(res.data) })
        // this works, completely hard coded
        // axios.post("http://localhost:8080/fdb/test/admin-accounts/query", {
        //     "select": [
        //      "*"
        //     ],
        //     "from": "admin",
        //   })
        // .then(res => { console.log(res.data) })
    }

    async function hardcodedTransact() {
        var query = [
            {
                "_id" : "admin$testUser",
                "firstName" : "testHardCoded",
                "lastName" : "testHardCoded",
                "militaryId" : "7",
                "rank" : 3,
                "base" : 2,
                "username" : "369",
                "pwd" : "258"
            }
        ]
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:8080/fdb/test/admin-accounts/transact" , query)
        .then(res => { console.log(res.data) })
    }

    async function createUser() {
        var id = document.getElementById("id").value
        var firstName = document.getElementById("firstName").value
        var lastName = document.getElementById("lastName").value
        var militaryId = document.getElementById("militaryId").value
        var rank = Number(document.getElementById("rank").value)
        var base = Number(document.getElementById("base").value)
        var username = document.getElementById("username").value
        var pwd = hash(document.getElementById("pwd").value)
        var query = [
            {
                "_id" : id,
                "firstName" : firstName,
                "lastName" : lastName,
                "militaryId" : militaryId,
                "rank" : rank,
                "base" : base,
                "username" : username,
                "pwd" : pwd
            }
        ]
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:8080/fdb/test/admin-accounts/transact" , query)
        .then(res => { console.log(res.data) })
    }

    // this is also more trouble than its worth. it would require us to parse the input string because rank and base are ints.
    async function sendQuery() {
        // JSON.parse did not work
        // const query = JSON.parse(document.getElementById("rawQuery").value)
        var query = document.getElementById("rawQuery").value
        var isTransact = document.getElementById("TransactButton").checked
        var urlParam = (isTransact ? "http://localhost:8080/fdb/test/admin-accounts/transact" : "http://localhost:8080/fdb/test/admin-accounts/query")
        console.log("isTransact: " + isTransact + "\nurlParam: " + urlParam + "\n" + query)
        axios.post(urlParam, query)
        .then(res => { console.log(res.data) })
    }

    return (
        <div className="Admin">
            <h1>Admin Page</h1>
            <br />
            <h3>click button to hash all passwords that are not already hashed.</h3>
            <button onClick={hashAllPass}>HashAllPasswords</button>
            <br />
            <p>buttons for debugging...</p>
            <button onClick={hardcodedQuery}>hardcodedQuery</button> <button onClick={hardcodedTransact}>hardcodedTransact</button> <button onClick={copyJames}>copyJames</button>
            <br />

            <h3>Create a user field by field. It will hash the password for you. See result of post in console.</h3>
            <input id="id" type="text" placeholder="admin$User"></input>
            <br />
            <input id="firstName" type="text" placeholder="first_name"></input>
            <br />
            <input id="lastName" type="text" placeholder=" last_name"></input>
            <br />
            <input id="militaryId" type="text" placeholder="military_id"></input>
            <br />
            <input id="rank" type="text" placeholder="rank"></input>
            <br />
            <input id="base" type="text" placeholder="base"></input>
            <br />
            <input id="username" type="text" placeholder="username"></input>
            <br />
            <input id="pwd" type="password" placeholder="password"></input>
            <br />
            <button onClick={createUser}>submit</button>
            <br />

            <h3>Passes raw query to database. Very dangerous. See results in console.</h3>
            <form action="/action_page.php">
            <input type="radio" id="queryButton" name="query_or_transact" value="query"defaultChecked></input>
            <label htmlFor="queryButton">Query</label> <br />
            <input type="radio" id="TransactButton" name="query_or_transact" value="transact"></input>
            <label htmlFor="TransactButton">Transact</label> <br />
            </form>
            <br />
            <textarea id="rawQuery" rows="15" cols="100" defaultValue="insert query here"></textarea>
            <button onClick={sendQuery}>submit</button>

        </div>
    );
}

export default Admin;
