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

    async function hardcodedQuery() {
        // this works
        var query = {
            "select": [
                "*"
            ],
            "from": "user",
            }
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:5432/mydb?schema=private", query).then(res => { console.log(res.data) })
        // this works, completely hard coded
        // axios.post("http://localhost:5432/mydb?schema=private", {
        //     "select": [
        //      "*"
        //     ],
        //     "from": "user",
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
        axios.post("http://localhost:5432/mydb?schema=private" , query)
        .then(res => { console.log(res.data) })
    }

    async function createUser() {
        var firstName = document.getElementById("firstName").value
        var lastName = document.getElementById("lastName").value
        var userId = document.getElementById("militaryId").value
        var username = document.getElementById("username").value
        var pwd = hash(document.getElementById("pwd").value)
        var query = [
            {
                "firstName" : firstName,
                "lastName" : lastName,
                "userId" : userId,
                "username" : username,
                "pwd" : pwd
            }
        ]
        console.log("query: ")
        console.log(query)
        axios.post("http://localhost:5432/mydb?schema=private" , query)
        .then(res => { console.log(res.data) })
    }

    // this is also more trouble than its worth. it would require us to parse the input string because rank and base are ints
    async function sendQuery() {
        // JSON.parse did not work
        // const query = JSON.parse(document.getElementById("rawQuery").value)
        var query = document.getElementById("rawQuery").value
        var endpointTwo = document.getElementById("endpointTwoButton").checked
        var urlParam = (endpointTwo ? "http://localhost:5432/mydb?schema=private" : "http://localhost:5432/mydb?schema=private")
        console.log("endpointTwo: " + endpointTwo + "\nurlParam: " + urlParam + "\n" + query)
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
            <button onClick={hardcodedQuery}>hardcodedQuery</button> <button onClick={hardcodedTransact}>hardcodedTransact</button>
            <br />

            <h3>Create a user field by field. It will hash the password for you. See result of post in console.</h3>
            <input id="firstName" type="text" defaultValue="first_name"></input>
            <br />
            <input id="lastName" type="text" defaultValue=" last_name"></input>
            <br />
            <input id="userId" type="text" defaultValue="user_id"></input>
            <br />
            <input id="username" type="text" defaultValue="username"></input>
            <br />
            <input id="pwd" type="text" defaultValue="password"></input>
            <br />
            <button onClick={createUser}>submit</button>
            <br />

            <h3>Passes raw query to database. Very dangerous. See results in console.</h3>
            <form action="/action_page.php">
            <input type="radio" id="endpointOneButton" name="endpoint_select" value="endpoint_one"defaultChecked></input>
            <label htmlFor="endpointOneButton">Query</label> <br />
            <input type="radio" id="endpointTwoButton" name="endpoint_select" value="endpoint_two"></input>
            <label htmlFor="endpointTwoButton">Transact</label> <br />
            </form>
            <br />
            <textarea id="rawQuery" rows="15" cols="100" defaultValue="insert query here"></textarea>
            <button onClick={sendQuery}>submit</button>

        </div>
    );
}

export default Admin;
