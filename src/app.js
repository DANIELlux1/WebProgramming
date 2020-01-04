const express = require("express")
const mysql   = require('mysql')
const cors    = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

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

app.patch("/disableUser", (req, res) => {

    user = req.body.userName
    status = req.body.deactivated

    connection.query("UPDATE user SET deactivated = '" + status + "' WHERE userName = '"+ user +"';",
     (error, result, field) => {
        if(error)
        {
            res.send(error)
        }else
        {
            res.send("Success!")
        }
    })
})

app.post("/join", (req, res) => {

    const table = req.body.table
    const user = req.body.userName
    const intern = req.body.internship

    connection.query("INSERT INTO " + table + " (userName, internship) VALUES ('" + user + "', '" + intern +"');", 
    (error,result,field) => {
        if(error)
        {
            res.send(error)
        }else
        {
            res.send("Success!")
        }
    })

})

app.post("/addInternship", (req, res) => {

    const title = req.body.title
    const des = req.body.description
    const supervisor = req.body.supervisor

    const values = "'" + title + "'," + "'" + des + "'," + "'" + supervisor + "'"

    connection.query("INSERT INTO internship (title,description,academicSupervisor) VALUES (" +values+");",
    (error,result,field) => {
        if(error)
        {
            res.send(error)
        }else
        {
            res.send("Success!")
        }
    })
})

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



//TO DO

app.get("/tweet", (req, res) => {

    let cond

    user = req.query.user
    intern = req.query.intern

    if(user || intern)
    {
        cond = "WHERE ";
    }

    if(user)
    {
        cond = cond + "owner = '" + user + "'"   
    }

    if(intern)
    {
        if(user)
        {
            cond = cond + " AND "
        }

        cond = cond + "internshipID = '" + intern + "'"
    }

    fetch("tweet", cond, req, res)

})

app.get("/users", (req, res) => {

    const user = req.query.user
    let cond
    if(user)
    {
        cond="WHERE userName = '" + user + "'"
    }
    
    fetch("user", cond , req, res)
})

app.get("/student", (req, res) => {
    fetch("student" ,"", req, res)
})

app.get("/supervisor", (req, res) => {
    fetch("localsupervisor" ,"", req, res)
})

app.get("/internship", (req, res) => {
    fetch("internship" ,"", req, res)
})

fetch = (table, cond, req, res) => {

    connection.query("SELECT * FROM " + table + " " + cond + ";",
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
}

app.post("/tweet", (req, res) => {
    
    user = req.body.userName
    intern = req.body.internship
    message = req.body.message
    ts = Date.now()
    _date  = new Date(ts)

    date = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate()

    destination = "owner, internshipID, message, postDate "
    values =  "'" + user + "','" + intern + "','" + message + "','" + date

    connection.query("INSERT INTO tweet (" + destination + ") VALUES (" + values +"');",
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