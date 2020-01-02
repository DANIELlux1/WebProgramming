const express = require("express")
const mysql   = require('mysql')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'twitter'
})

app.get("/test", (req, res) => {
    res.send("Hello I work fine.")
})

app.patch("/get")

app.post("/addUser", (req, res) => {

    var destination = ""
    var values = ""

    if(req.body.userName)
    {
        destination = destination + "userName, "
        values = values + "'" + req.body.userName + "', "
    }

    if(req.body.password)
    {
        destination = destination + "password, "
        values = values + "'" + req.body.password + "', "
    }

    if(req.body.name)
    {
        destination = destination + "name, "
        values = values + "'" + req.body.name + "', "
    }

    if(req.body.email)
    {
        destination = destination + "email"
        values = values + "'" + req.body.email
    }

    connection.query("INSERT INTO user (" + destination + ") VALUES (" + values +"');", 
                        (error, result, fields) => {
                            if(error)
                            {
                                err = error
                                res.send(error)
                            }
                            else
                            {
                                res.send(result)
                            }
    })
})

app.listen(port, () => {
    console.log("Comunication API up and running on: " + port)
})

connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
})
